"""Pure Python 3.11 skill-gap analysis engine with zero external dependencies."""
from dataclasses import asdict, dataclass
from datetime import datetime, timezone
from typing import Any


@dataclass(frozen=True)
class RoleProfile:
    id: str
    title: str
    focus: str
    core_skills: tuple[str, ...]
    recommended_skills: tuple[str, ...]


SKILL_CATEGORIES: dict[str, str] = {
    "Python": "Programming Languages",
    "Java": "Programming Languages",
    "C": "Programming Languages",
    "JavaScript": "Web & Frontend",
    "TypeScript": "Web & Frontend",
    "HTML": "Web & Frontend",
    "CSS": "Web & Frontend",
    "Tailwind CSS": "Web & Frontend",
    "React": "Web & Frontend",
    "FastAPI": "Backend & Databases",
    "SQL": "Backend & Databases",
    "SQLAlchemy": "Backend & Databases",
    "SQLite": "Backend & Databases",
    "REST APIs": "Backend & Databases",
    "Pydantic": "Backend & Databases",
    "Machine Learning": "AI & Machine Learning",
    "NumPy & Pandas": "AI & Machine Learning",
    "PyMuPDF": "AI & Machine Learning",
    "Google Gemini API": "AI & Machine Learning",
    "Data Structures": "CS Foundations & Tooling",
    "Algorithms": "CS Foundations & Tooling",
    "Git": "CS Foundations & Tooling",
    "Docker": "CS Foundations & Tooling",
    "Automated Testing": "CS Foundations & Tooling",
}

SKILL_ALIASES: dict[str, str] = {
    "py": "Python",
    "python3": "Python",
    "js": "JavaScript",
    "ts": "TypeScript",
    "tailwind": "Tailwind CSS",
    "tailwindcss": "Tailwind CSS",
    "ml": "Machine Learning",
    "dsa": "Data Structures",
    "data structures & algorithms": "Data Structures",
    "testing": "Automated Testing",
    "pytest": "Automated Testing",
    "gemini": "Google Gemini API",
}

SKILL_LEARNING_GUIDANCE: dict[str, str] = {
    "Python": "Master Pythonic idioms, type annotations, async/await, and modular package design.",
    "Java": "Strengthen object-oriented architecture, collections, and clean class hierarchies.",
    "C": "Deepen systems understanding of memory management, pointers, and low-level execution.",
    "HTML": "Write accessible semantic HTML5 landmarks, forms, and SEO-friendly document structures.",
    "CSS": "Build responsive layouts with CSS Grid, Flexbox, and clean visual hierarchy.",
    "Tailwind CSS": "Rapidly compose consistent utility-first design systems and responsive breakpoints.",
    "JavaScript": "Solidify asynchronous JavaScript (Promises, fetch, DOM state) and ES6+ patterns.",
    "TypeScript": "Add compile-time type safety across API contracts, UI props, and shared models.",
    "React": "Architect reusable hooks, clean state boundaries, and accessible interactive interfaces.",
    "FastAPI": "Build typed REST endpoints, dependency injection, OpenAPI docs, and async request handlers.",
    "Pydantic": "Enforce strict schema validation, custom field validators, and clean serialization.",
    "SQL": "Write normalized schemas, relational joins, aggregations, and indexed queries.",
    "SQLite": "Use lightweight file-backed relational storage for fast prototyping and deterministic tests.",
    "SQLAlchemy": "Design declarative ORM models, session lifecycles, and clean repository queries.",
    "REST APIs": "Follow HTTP semantics, resource modeling, status codes, and structured error envelopes.",
    "Machine Learning": "Implement supervised/unsupervised pipelines, train-validation splits, and metric evaluation.",
    "NumPy & Pandas": "Perform vectorized numerical operations and structured tabular feature engineering.",
    "PyMuPDF": "Extract structured text, layout blocks, and metadata reliably from PDF documents.",
    "Google Gemini API": "Integrate structured model outputs with deterministic fallbacks and server-side key safety.",
    "Data Structures": "Practice arrays, hash maps, trees, graphs, and time-space complexity analysis.",
    "Algorithms": "Strengthen recursion, dynamic programming, sorting, and graph traversal problem-solving.",
    "Git": "Maintain clean commit histories, branching workflows, and collaborative pull requests.",
    "Docker": "Containerize Python services and web frontends for reproducible local and cloud deploys.",
    "Automated Testing": "Write deterministic unit and integration test suites using pytest and HTTP test clients.",
}

ROLE_PROFILES: dict[str, RoleProfile] = {
    "python_developer": RoleProfile(
        id="python_developer",
        title="Python Developer",
        focus="Designing reliable Python applications, typed APIs, automated test suites, and data workflows.",
        core_skills=("Python", "FastAPI", "SQL", "Data Structures", "Git", "Automated Testing"),
        recommended_skills=("Pydantic", "SQLAlchemy", "SQLite", "Docker", "REST APIs"),
    ),
    "ai_ml_engineer": RoleProfile(
        id="ai_ml_engineer",
        title="AI/ML Engineer",
        focus="Building intelligent analytical pipelines, NLP extraction systems, and production-ready ML services.",
        core_skills=("Python", "Machine Learning", "Data Structures", "SQL", "FastAPI", "NumPy & Pandas"),
        recommended_skills=("Google Gemini API", "PyMuPDF", "Git", "Docker", "Automated Testing"),
    ),
    "fullstack_developer": RoleProfile(
        id="fullstack_developer",
        title="Full-Stack Developer",
        focus="Delivering end-to-end web products uniting responsive interfaces with typed backend APIs.",
        core_skills=("HTML", "CSS", "JavaScript", "React", "Python", "FastAPI", "SQL", "Git"),
        recommended_skills=("TypeScript", "Tailwind CSS", "SQLAlchemy", "REST APIs", "Docker"),
    ),
    "backend_developer": RoleProfile(
        id="backend_developer",
        title="Backend Developer",
        focus="Architecting secure REST APIs, relational data models, validation layers, and containerized services.",
        core_skills=("Python", "FastAPI", "SQL", "SQLAlchemy", "REST APIs", "Data Structures", "Git"),
        recommended_skills=("Pydantic", "SQLite", "Docker", "Automated Testing", "Java"),
    ),
}

DEFAULT_UI_SKILLS: tuple[str, ...] = (
    "Python",
    "Java",
    "C",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "FastAPI",
    "SQL",
    "Machine Learning",
    "Data Structures",
    "Git",
    "Tailwind CSS",
    "SQLAlchemy",
    "Docker",
    "TypeScript",
)


def normalize_skill_name(raw: str) -> str:
    stripped = raw.strip()
    lower = stripped.lower()
    if lower in SKILL_ALIASES:
        return SKILL_ALIASES[lower]
    for canonical in SKILL_CATEGORIES:
        if canonical.lower() == lower:
            return canonical
    return stripped


def categorize_skill(skill: str) -> str:
    return SKILL_CATEGORIES.get(skill, "Additional Skills")


def list_roles_and_skills_dicts() -> dict[str, Any]:
    roles = [
        {
            "id": profile.id,
            "title": profile.title,
            "focus": profile.focus,
            "core_skills": list(profile.core_skills),
            "recommended_skills": list(profile.recommended_skills),
            "total_benchmarks": len(profile.core_skills) + len(profile.recommended_skills),
        }
        for profile in ROLE_PROFILES.values()
    ]
    available_skills = [
        {"name": skill, "category": categorize_skill(skill)}
        for skill in DEFAULT_UI_SKILLS
    ]
    return {"roles": roles, "available_skills": available_skills}


def determine_readiness_tier(weighted_pct: float) -> str:
    if weighted_pct >= 85:
        return "Strong Alignment"
    if weighted_pct >= 60:
        return "Solid Foundation"
    if weighted_pct >= 35:
        return "Emerging Readiness"
    return "Early Exploration"


def build_learning_roadmap_dicts(
    missing_core: list[str],
    missing_recommended: list[str],
    role_title: str,
) -> list[dict[str, Any]]:
    phases: list[dict[str, Any]] = []
    phase_num = 1

    foundation_set = {"Python", "Java", "C", "Data Structures", "Algorithms", "HTML", "CSS", "JavaScript", "Git"}
    phase1_skills = [s for s in missing_core if s in foundation_set]
    if phase1_skills:
        phases.append(
            {
                "phase_number": phase_num,
                "phase_title": "Core Language & CS Foundations",
                "priority": "High Priority",
                "target_skills": phase1_skills,
                "rationale": f"Essential building blocks required before scaling production {role_title} systems.",
            }
        )
        phase_num += 1

    phase2_skills = [s for s in missing_core if s not in foundation_set]
    if phase2_skills:
        phases.append(
            {
                "phase_number": phase_num,
                "phase_title": "Core Framework, Data & Domain Architecture",
                "priority": "High Priority",
                "target_skills": phase2_skills,
                "rationale": f"Directly unlocks the primary engineering responsibilities of a {role_title}.",
            }
        )
        phase_num += 1

    if missing_recommended:
        phases.append(
            {
                "phase_number": phase_num,
                "phase_title": "Ecosystem Tooling & Production Polish",
                "priority": "Recommended",
                "target_skills": missing_recommended,
                "rationale": "Elevates code quality, type safety, testability, and deployment reliability.",
            }
        )

    if not phases:
        phases.append(
            {
                "phase_number": 1,
                "phase_title": "System Design & Portfolio Depth",
                "priority": "Advancement",
                "target_skills": ["End-to-End Capstone Architecture", "Benchmarking & Code Reviews"],
                "rationale": f"You already cover every benchmark skill for {role_title}. Focus on deeper architecture and real-world projects.",
            }
        )

    return phases


def build_next_steps(
    role: RoleProfile,
    missing_core: list[str],
    missing_recommended: list[str],
    matched_skills: list[str],
) -> list[str]:
    steps: list[str] = []
    for skill in missing_core[:3]:
        guidance = SKILL_LEARNING_GUIDANCE.get(
            skill, f"Build a focused mini-project applying {skill} to a realistic problem."
        )
        steps.append(f"Prioritize {skill}: {guidance}")

    if not missing_core and missing_recommended:
        for skill in missing_recommended[:2]:
            guidance = SKILL_LEARNING_GUIDANCE.get(
                skill, f"Integrate {skill} into your existing workflow."
            )
            steps.append(f"Level up with {skill}: {guidance}")

    if matched_skills:
        anchor = ", ".join(matched_skills[:3])
        steps.append(
            f"Combine your existing strengths ({anchor}) into a documented end-to-end {role.title} project with clean README and tests."
        )
    else:
        steps.append(
            f"Select your current skills above or start with Phase 1 to generate a targeted {role.title} action plan."
        )

    return steps


def analyze_skill_gap_dict(role_id: str, raw_selected_skills: list[str]) -> dict[str, Any]:
    normalized_role = role_id.strip().lower()
    profile = ROLE_PROFILES.get(normalized_role)
    if profile is None:
        raise KeyError(f"Unknown role_id '{role_id}'. Valid roles: {', '.join(ROLE_PROFILES.keys())}")

    normalized_selected: list[str] = []
    seen_lower: set[str] = set()
    for raw in raw_selected_skills:
        if not isinstance(raw, str):
            continue
        norm = normalize_skill_name(raw)
        if norm and norm.lower() not in seen_lower:
            seen_lower.add(norm.lower())
            normalized_selected.append(norm)

    selected_lookup = {s.lower() for s in normalized_selected}

    matched_core = [s for s in profile.core_skills if s.lower() in selected_lookup]
    missing_core = [s for s in profile.core_skills if s.lower() not in selected_lookup]

    matched_recommended = [s for s in profile.recommended_skills if s.lower() in selected_lookup]
    missing_recommended = [s for s in profile.recommended_skills if s.lower() not in selected_lookup]

    matched_all = matched_core + matched_recommended
    missing_all = missing_core + missing_recommended

    total_benchmarks = len(profile.core_skills) + len(profile.recommended_skills)
    coverage_pct = round((len(matched_all) / total_benchmarks) * 100, 1) if total_benchmarks else 0.0

    total_weight = (len(profile.core_skills) * 2.0) + (len(profile.recommended_skills) * 1.0)
    earned_weight = (len(matched_core) * 2.0) + (len(matched_recommended) * 1.0)
    weighted_pct = round((earned_weight / total_weight) * 100, 1) if total_weight else 0.0

    category_order = [
        "Programming Languages",
        "Backend & Databases",
        "Web & Frontend",
        "AI & Machine Learning",
        "CS Foundations & Tooling",
    ]
    grouped: dict[str, dict[str, list[str]]] = {
        cat: {"matched": [], "missing": []} for cat in category_order
    }
    for skill in matched_all:
        cat = categorize_skill(skill)
        grouped.setdefault(cat, {"matched": [], "missing": []})["matched"].append(skill)
    for skill in missing_all:
        cat = categorize_skill(skill)
        grouped.setdefault(cat, {"matched": [], "missing": []})["missing"].append(skill)

    category_breakdown = [
        {"category": cat, "matched": lists["matched"], "missing": lists["missing"]}
        for cat, lists in grouped.items()
        if lists["matched"] or lists["missing"]
    ]

    roadmap = build_learning_roadmap_dicts(missing_core, missing_recommended, profile.title)
    next_steps = build_next_steps(profile, missing_core, missing_recommended, matched_all)

    return {
        "analysis_id": None,
        "role_id": profile.id,
        "role_title": profile.title,
        "role_focus": profile.focus,
        "selected_skills": normalized_selected,
        "matched_skills": matched_all,
        "matched_core_skills": matched_core,
        "matched_recommended_skills": matched_recommended,
        "missing_skills": missing_all,
        "missing_core_skills": missing_core,
        "missing_recommended_skills": missing_recommended,
        "skill_coverage_percentage": coverage_pct,
        "weighted_readiness_percentage": weighted_pct,
        "readiness_tier": determine_readiness_tier(weighted_pct),
        "category_breakdown": category_breakdown,
        "learning_roadmap": roadmap,
        "suggested_next_steps": next_steps,
        "analyzed_at": datetime.now(timezone.utc).isoformat(),
    }
