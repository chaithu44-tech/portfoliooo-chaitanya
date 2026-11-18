"""Zero-dependency Python 3.11 stdlib HTTP + SQLite server for Skill Gap Analyzer.

Used automatically by server.ts if FastAPI/Uvicorn packages are not installed in the
container image, ensuring all /api/* requests are still executed by real Python 3.11.
"""
import argparse
import json
import sqlite3
import sys
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from app.services.analyzer_core import (
    ROLE_PROFILES,
    analyze_skill_gap_dict,
    list_roles_and_skills_dicts,
)

BACKEND_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BACKEND_DIR / "portfolio_analyzer.db"


def init_db() -> None:
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS skill_analyses (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                role_id TEXT NOT NULL,
                role_title TEXT NOT NULL,
                selected_skills_json TEXT NOT NULL,
                matched_skills_json TEXT NOT NULL,
                missing_skills_json TEXT NOT NULL,
                coverage_percentage REAL NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        conn.commit()


class AnalyzerRequestHandler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, format: str, *args: object) -> None:
        sys.stdout.write(f"[python-stdlib] {self.address_string()} - {format % args}\n")
        sys.stdout.flush()

    def _send_json(self, status_code: int, payload: object) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Content-Length", "0")
        self.end_headers()

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/") or "/"

        if path == "/api/health":
            db_ok = True
            try:
                with sqlite3.connect(DB_PATH) as conn:
                    conn.execute("SELECT 1")
            except Exception:
                db_ok = False
            self._send_json(
                200,
                {
                    "status": "ok",
                    "service": "python-skill-analyzer",
                    "python_version": f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}",
                    "roles_loaded": len(ROLE_PROFILES),
                    "database_connected": db_ok,
                },
            )
            return

        if path == "/api/roles":
            self._send_json(200, list_roles_and_skills_dicts())
            return

        if path == "/api/analyses":
            query = parse_qs(parsed.query)
            try:
                limit = max(1, min(20, int(query.get("limit", ["5"])[0])))
            except ValueError:
                limit = 5
            with sqlite3.connect(DB_PATH) as conn:
                rows = conn.execute(
                    """
                    SELECT id, role_id, role_title, selected_skills_json,
                           matched_skills_json, missing_skills_json,
                           coverage_percentage, created_at
                    FROM skill_analyses
                    ORDER BY created_at DESC, id DESC
                    LIMIT ?
                    """,
                    (limit,),
                ).fetchall()
            items = [
                {
                    "id": row[0],
                    "role_id": row[1],
                    "role_title": row[2],
                    "selected_skills": json.loads(row[3]),
                    "matched_count": len(json.loads(row[4])),
                    "missing_count": len(json.loads(row[5])),
                    "coverage_percentage": row[6],
                    "created_at": row[7],
                }
                for row in rows
            ]
            self._send_json(200, items)
            return

        self._send_json(404, {"detail": f"Endpoint '{path}' not found."})

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        path = parsed.path.rstrip("/") or "/"

        if path != "/api/analyze-skills":
            self._send_json(404, {"detail": f"Endpoint '{path}' not found."})
            return

        content_length = int(self.headers.get("Content-Length", "0") or 0)
        raw_body = self.rfile.read(content_length) if content_length > 0 else b"{}"
        try:
            payload = json.loads(raw_body.decode("utf-8"))
        except json.JSONDecodeError:
            self._send_json(422, {"detail": "Request body must be valid JSON."})
            return

        if not isinstance(payload, dict):
            self._send_json(422, {"detail": "JSON object expected."})
            return

        role_id = payload.get("role_id")
        selected_skills = payload.get("selected_skills", [])

        if not isinstance(role_id, str) or len(role_id.strip()) < 2:
            self._send_json(422, {"detail": "role_id must be a non-empty string."})
            return
        if not isinstance(selected_skills, list):
            self._send_json(422, {"detail": "selected_skills must be a list of strings."})
            return

        try:
            result = analyze_skill_gap_dict(role_id, selected_skills)
        except KeyError as exc:
            self._send_json(404, {"detail": str(exc)})
            return

        created_at = datetime.now(timezone.utc).isoformat()
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.execute(
                """
                INSERT INTO skill_analyses (
                    role_id, role_title, selected_skills_json,
                    matched_skills_json, missing_skills_json,
                    coverage_percentage, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    result["role_id"],
                    result["role_title"],
                    json.dumps(result["selected_skills"]),
                    json.dumps(result["matched_skills"]),
                    json.dumps(result["missing_skills"]),
                    result["skill_coverage_percentage"],
                    created_at,
                ),
            )
            conn.commit()
            result["analysis_id"] = cursor.lastrowid

        self._send_json(200, result)


def main() -> None:
    parser = argparse.ArgumentParser(description="Python 3.11 Skill Gap Analyzer Server")
    parser.add_argument("--host", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8001)
    args = parser.parse_args()

    init_db()
    server = ThreadingHTTPServer((args.host, args.port), AnalyzerRequestHandler)
    sys.stdout.write(f"[python-stdlib] Serving Skill Gap Analyzer on http://{args.host}:{args.port}\n")
    sys.stdout.flush()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
