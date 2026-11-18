"""ORM model for persisted skill gap analyses."""
from datetime import datetime, timezone
from sqlalchemy import DateTime, Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class SkillAnalysisRecord(Base):
    __tablename__ = "skill_analyses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    role_id: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    role_title: Mapped[str] = mapped_column(String(120), nullable=False)
    selected_skills_json: Mapped[str] = mapped_column(Text, nullable=False)
    matched_skills_json: Mapped[str] = mapped_column(Text, nullable=False)
    missing_skills_json: Mapped[str] = mapped_column(Text, nullable=False)
    coverage_percentage: Mapped[float] = mapped_column(Float, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
