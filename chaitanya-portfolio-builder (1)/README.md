# Chelamsetty Chaitanya — Full-Stack Developer Portfolio

Editorial full-stack portfolio built with **React, TypeScript, Tailwind CSS, and Motion** on the frontend, paired with a live **Python 3.11 + FastAPI + Pydantic + SQLAlchemy (SQLite)** backend powering the interactive **Skill Gap Analyzer**.

## Architecture

- `src/` — React + TypeScript editorial frontend (`src/data/portfolio.ts` centralizes all portfolio data, projects, and social links)
- `backend/` — Python 3.11 FastAPI REST API (`GET /api/health`, `GET /api/roles`, `POST /api/analyze-skills`, `GET /api/analyses`)
- `server.ts` — Full-stack orchestrator serving the Vite/React app on port `3000`, spawning the FastAPI service on port `8000`, and proxying `/api/*` requests

## Local Setup

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Python Backend Dependencies (Python 3.11+)

```bash
python3 -m venv backend/.venv
source backend/.venv/bin/activate
pip install -r backend/requirements.txt
```

### 3. Configure Environment

Copy `.env.example` to `.env` if you want custom ports, CORS origins, or database URLs:

```bash
cp .env.example .env
```

### 4. Run Full-Stack App (Single Command)

```bash
npm run dev
```

This starts the Express + Vite server on `http://localhost:3000`, automatically launches the Python backend on `http://127.0.0.1:8001` (using FastAPI + Uvicorn when installed, or the zero-dependency Python 3.11 server as fallback), and routes `/api/*` directly to Python.

### Running Frontend and Backend Separately

Terminal 1 (Python FastAPI):
```bash
cd backend
uvicorn app.main:app --reload --port 8001
```

Terminal 2 (React Vite):
```bash
npx vite --port 3000
```

## Production Build & Separate Deployment

1. **Backend (Render, Railway, Fly.io, or Cloud Run)**:
   - Working directory: `backend`
   - Install: `pip install -r requirements.txt`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - Set `CORS_ORIGINS` to your deployed frontend origin.

2. **Frontend (Vercel, Netlify, or Cloudflare Pages)**:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Set `VITE_API_BASE_URL` to your deployed FastAPI URL.
