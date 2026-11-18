"""FastAPI-facing skill analyzer wrapper using shared analyzer_core engine."""
from app.schemas.analyzer import (
    AnalyzeSkillsResponse,
    CategorizedSkillGroup,
    RoadmapPhase,
    RoleSummary,
    SkillCatalogItem,
)
from app.services.analyzer_core import (
    ROLE_PROFILES,
    analyze_skill_gap_dict,
    categorize_skill,
    list_roles_and_skills_dicts,
    normalize_skill_name,
)

__all__ = [
    "ROLE_PROFILES",
    "analyze_skill_gap",
    "categorize_skill",
    "list_roles_and_skills",
    "normalize_skill_name",
]


def list_roles_and_skills() -> tuple[list[RoleSummary], list[SkillCatalogItem]]:
    data = list_roles_and_skills_dicts()
    roles = [RoleSummary(**item) for item in data["roles"]]
    catalog = [SkillCatalogItem(**item) for item in data["available_skills"]]
    return roles, catalog


def analyze_skill_gap(role_id: str, raw_selected_skills: list[str]) -> AnalyzeSkillsResponse:
    result = analyze_skill_gap_dict(role_id, raw_selected_skills)
    return AnalyzeSkillsResponse(
        analysis_id=result["analysis_id"],
        role_id=result["role_id"],
        role_title=result["role_title"],
        role_focus=result["role_focus"],
        selected_skills=result["selected_skills"],
        matched_skills=result["matched_skills"],
        matched_core_skills=result["matched_core_skills"],
        matched_recommended_skills=result["matched_recommended_skills"],
        missing_skills=result["missing_skills"],
        missing_core_skills=result["missing_core_skills"],
        missing_recommended_skills=result["missing_recommended_skills"],
        skill_coverage_percentage=result["skill_coverage_percentage"],
        weighted_readiness_percentage=result["weighted_readiness_percentage"],
        readiness_tier=result["readiness_tier"],
        category_breakdown=[CategorizedSkillGroup(**g) for g in result["category_breakdown"]],
        learning_roadmap=[RoadmapPhase(**p) for p in result["learning_roadmap"]],
        suggested_next_steps=result["suggested_next_steps"],
        analyzed_at=result["analyzed_at"],
    )
