"""Skill Gap Analyzer REST API routes."""
import json
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.analysis import SkillAnalysisRecord
from app.schemas.analyzer import (
    AnalysisHistoryItem,
    AnalyzeSkillsRequest,
    AnalyzeSkillsResponse,
    RolesCatalogResponse,
)
from app.services.skill_analyzer import analyze_skill_gap, list_roles_and_skills

router = APIRouter(tags=["analyzer"])


@router.get("/roles", response_model=RolesCatalogResponse)
def get_roles_catalog() -> RolesCatalogResponse:
    roles, available_skills = list_roles_and_skills()
    return RolesCatalogResponse(roles=roles, available_skills=available_skills)


@router.post("/analyze-skills", response_model=AnalyzeSkillsResponse)
def analyze_skills(
    payload: AnalyzeSkillsRequest,
    db: Session = Depends(get_db),
) -> AnalyzeSkillsResponse:
    try:
        result = analyze_skill_gap(payload.role_id, payload.selected_skills)
    except KeyError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc

    record = SkillAnalysisRecord(
        role_id=result.role_id,
        role_title=result.role_title,
        selected_skills_json=json.dumps(result.selected_skills),
        matched_skills_json=json.dumps(result.matched_skills),
        missing_skills_json=json.dumps(result.missing_skills),
        coverage_percentage=result.skill_coverage_percentage,
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    result.analysis_id = record.id
    return result


@router.get("/analyses", response_model=list[AnalysisHistoryItem])
def get_recent_analyses(
    limit: int = Query(default=5, ge=1, le=20),
    db: Session = Depends(get_db),
) -> list[AnalysisHistoryItem]:
    rows = (
        db.query(SkillAnalysisRecord)
        .order_by(desc(SkillAnalysisRecord.created_at), desc(SkillAnalysisRecord.id))
        .limit(limit)
        .all()
    )
    items: list[AnalysisHistoryItem] = []
    for row in rows:
        selected = json.loads(row.selected_skills_json)
        matched = json.loads(row.matched_skills_json)
        missing = json.loads(row.missing_skills_json)
        items.append(
            AnalysisHistoryItem(
                id=row.id,
                role_id=row.role_id,
                role_title=row.role_title,
                selected_skills=selected,
                matched_count=len(matched),
                missing_count=len(missing),
                coverage_percentage=row.coverage_percentage,
                created_at=row.created_at,
            )
        )
    return items
