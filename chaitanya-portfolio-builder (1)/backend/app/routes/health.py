"""Health check endpoints."""
import sys
from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.analyzer import HealthResponse
from app.services.skill_analyzer import ROLE_PROFILES

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse)
def health_check(db: Session = Depends(get_db)) -> HealthResponse:
    db_ok = True
    try:
        db.execute(text("SELECT 1"))
    except Exception:
        db_ok = False

    return HealthResponse(
        status="ok",
        service="python-fastapi-skill-analyzer",
        python_version=f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}",
        roles_loaded=len(ROLE_PROFILES),
        database_connected=db_ok,
    )
