import { spawn, spawnSync, type ChildProcess } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const PYTHON_PORT = Number(process.env.PYTHON_PORT || 8001);
const PYTHON_API_URL = process.env.PYTHON_API_URL || `http://127.0.0.1:${PYTHON_PORT}`;
const IS_PRODUCTION =
  process.env.NODE_ENV === 'production' || process.env.npm_lifecycle_event === 'start';

let pythonProcess: ChildProcess | null = null;
let pythonBootPromise: Promise<boolean> | null = null;
let pythonUnavailableReason: string | null = null;

async function isPythonBackendHealthy(): Promise<boolean> {
  try {
    const res = await fetch(`${PYTHON_API_URL}/api/health`, {
      signal: AbortSignal.timeout(1000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function resolvePythonCommand(): { bin: string; args: string[]; label: string } | null {
  const candidates = [process.env.PYTHON_BIN, 'python3', 'python'].filter(
    (item): item is string => Boolean(item && item.trim()),
  );

  for (const bin of candidates) {
    const versionCheck = spawnSync(bin, ['--version'], { stdio: 'ignore', timeout: 2000 });
    if (versionCheck.status !== 0) {
      continue;
    }

    const fastapiCheck = spawnSync(bin, ['-c', 'import fastapi, uvicorn'], {
      stdio: 'ignore',
      timeout: 3000,
    });
    if (fastapiCheck.status === 0) {
      return {
        bin,
        args: ['-m', 'uvicorn', 'app.main:app', '--host', '127.0.0.1', '--port', String(PYTHON_PORT)],
        label: 'FastAPI + Uvicorn',
      };
    }

    return {
      bin,
      args: ['-m', 'app.stdlib_server', '--host', '127.0.0.1', '--port', String(PYTHON_PORT)],
      label: 'Python 3.11 stdlib server',
    };
  }

  return null;
}

async function ensurePythonBackend(): Promise<boolean> {
  if (await isPythonBackendHealthy()) {
    return true;
  }

  if (pythonBootPromise) {
    return pythonBootPromise;
  }

  pythonBootPromise = (async () => {
    const command = resolvePythonCommand();
    if (!command) {
      pythonUnavailableReason = 'Python 3.11 runtime is not installed in this container.';
      console.warn(`[python-api] ${pythonUnavailableReason}`);
      return false;
    }

    const backendDir = path.resolve(__dirname, 'backend');
    console.log(`[python-api] Launching ${command.label} on 127.0.0.1:${PYTHON_PORT}...`);

    try {
      const child = spawn(command.bin, command.args, {
        cwd: backendDir,
        env: { ...process.env, PYTHONUNBUFFERED: '1' },
        stdio: ['ignore', 'pipe', 'pipe'],
      });
      pythonProcess = child;

      child.on('error', (err) => {
        pythonUnavailableReason = err.message;
        console.error(`[python-api] Failed to start Python process: ${err.message}`);
        pythonProcess = null;
      });
      child.stdout?.on('data', (chunk: Buffer) => {
        process.stdout.write(`[python] ${chunk.toString()}`);
      });
      child.stderr?.on('data', (chunk: Buffer) => {
        process.stderr.write(`[python] ${chunk.toString()}`);
      });
      child.on('exit', (code, signal) => {
        console.log(`[python-api] Python service exited (code=${code}, signal=${signal})`);
        pythonProcess = null;
      });

      for (let attempt = 0; attempt < 25; attempt += 1) {
        if (!pythonProcess) {
          return false;
        }
        if (await isPythonBackendHealthy()) {
          pythonUnavailableReason = null;
          console.log(`[python-api] Ready (${command.label}) at ${PYTHON_API_URL}`);
          return true;
        }
        await new Promise((resolve) => setTimeout(resolve, 150));
      }

      pythonUnavailableReason = 'Python backend did not respond before startup timeout.';
      return false;
    } catch (err) {
      pythonUnavailableReason = err instanceof Error ? err.message : 'Unknown spawn error';
      console.error(`[python-api] Spawn exception: ${pythonUnavailableReason}`);
      return false;
    } finally {
      pythonBootPromise = null;
    }
  })();

  return pythonBootPromise;
}

function shutdownPythonBackend(): void {
  if (pythonProcess && !pythonProcess.killed) {
    pythonProcess.kill('SIGTERM');
    pythonProcess = null;
  }
}

process.on('SIGINT', () => {
  shutdownPythonBackend();
  process.exit(0);
});
process.on('SIGTERM', () => {
  shutdownPythonBackend();
  process.exit(0);
});

async function bootstrap(): Promise<void> {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // Proxy /api/* requests directly to the Python backend
  app.use('/api', async (req: Request, res: Response) => {
    const ready = await ensurePythonBackend();
    if (!ready) {
      res.status(503).json({
        detail: pythonUnavailableReason || 'Python Skill Gap Analyzer backend is unavailable.',
      });
      return;
    }

    const targetUrl = `${PYTHON_API_URL}/api${req.url === '/' ? '' : req.url}`;
    try {
      const headers: Record<string, string> = {
        Accept: 'application/json',
      };
      if (req.headers['content-type']) {
        headers['Content-Type'] = String(req.headers['content-type']);
      }

      const init: RequestInit = {
        method: req.method,
        headers,
        signal: AbortSignal.timeout(10000),
      };

      if (req.method !== 'GET' && req.method !== 'HEAD' && req.body !== undefined) {
        init.body = JSON.stringify(req.body);
        if (!headers['Content-Type']) {
          headers['Content-Type'] = 'application/json';
        }
      }

      const upstream = await fetch(targetUrl, init);
      const text = await upstream.text();
      const contentType = upstream.headers.get('content-type') || 'application/json';

      res.status(upstream.status).setHeader('Content-Type', contentType).send(text);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upstream Python service unavailable';
      res.status(502).json({
        detail: `Python backend request failed (${message}).`,
      });
    }
  });

  if (IS_PRODUCTION) {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.use((_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    app.use(async (req: Request, res: Response, next) => {
      try {
        const indexPath = path.resolve(__dirname, 'index.html');
        const rawHtml = fs.readFileSync(indexPath, 'utf-8');
        const transformed = await vite.transformIndexHtml(req.originalUrl, rawHtml);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(transformed);
      } catch (err) {
        vite.ssrFixStacktrace(err as Error);
        next(err);
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[server] Portfolio listening on http://0.0.0.0:${PORT} (Python API -> ${PYTHON_API_URL})`);
    // Start Python backend non-blockingly after Express port is bound
    void ensurePythonBackend();
  });
}

bootstrap().catch((err) => {
  console.error('[server] Failed to bootstrap server:', err);
  shutdownPythonBackend();
  process.exit(1);
});
