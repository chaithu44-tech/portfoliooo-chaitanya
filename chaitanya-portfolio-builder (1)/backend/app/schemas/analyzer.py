"""Pydantic schemas for Skill Gap Analyzer API."""
from datetime import datetime
from pydantic import BaseModel, Field, field_validator


class SkillCatalogItem(BaseModel):
    name: str
    category: str


class RoleSummary(BaseModel):
    id: str
    title: str
    focus: str
    core_skills: list[str]
    recommended_skills: list[str]
    total_benchmarks: int


class RolesCatalogResponse(BaseModel):
    roles: list[RoleSummary]
    available_skills: list[SkillCatalogItem]


class AnalyzeSkillsRequest(BaseModel):
    role_id: str = Field(..., min_length=2, max_length=64, description="Target career role identifier")
    selected_skills: list[str] = Field(
        default_factory=list,
        max_length=40,
        description="List of skills currently known by the candidate",
    )

    @field_validator("role_id")
    @classmethod
    def normalize_role_id(cls, value: str) -> str:
        cleaned = value.strip().lower()
        if not cleaned:
            raise ValueError("role_id cannot be empty.")
        return cleaned

    @field_validator("selected_skills")
    @classmethod
    def clean_skills(cls, values: list[str]) -> list[str]:
        seen: set[str] = set()
        cleaned: list[str] = []
        for item in values:
            trimmed = item.strip()
            if trimmed and trimmed.lower() not in seen:
                seen.add(trimmed.lower())
                cleaned.append(trimmed)
        return cleaned


class CategorizedSkillGroup(BaseModel):
    category: str
    matched: list[str]
    missing: list[str]


class RoadmapPhase(BaseModel):
    phase_number: int
    phase_title: str
    priority: str
    target_skills: list[str]
    rationale: str


class AnalyzeSkillsResponse(BaseModel):
    analysis_id: int | None = None
    role_id: str
    role_title: str
    role_focus: str
    selected_skills: list[str]
    matched_skills: list[str]
    matched_core_skills: list[str]
    matched_recommended_skills: list[str]
    missing_skills: list[str]
    missing_core_skills: list[str]
    missing_recommended_skills: list[str]
    skill_coverage_percentage: float
    weighted_readiness_percentage: float
    readiness_tier: str
    category_breakdown: list[CategorizedSkillGroup]
    learning_roadmap: list[RoadmapPhase]
    suggested_next_steps: list[str]
    analyzed_at: datetime


class AnalysisHistoryItem(BaseModel):
    id: int
    role_id: str
    role_title: str
    selected_skills: list[str]
    matched_count: int
    missing_count: int
    coverage_percentage: float
    created_at: datetime


class HealthResponse(BaseModel):
    status: str
    service: str
    python_version: str
    roles_loaded: int
    database_connected: bool
