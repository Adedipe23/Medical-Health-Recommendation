from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.core.database import Base


class SymptomHistory(Base):
    __tablename__ = "symptom_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    symptoms = Column(Text, nullable=False)
    predicted_disease = Column(String(200), nullable=False)
    severity = Column(String(50), nullable=False)
    recommendation = Column(Text, nullable=False)
    specialist = Column(String(200), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
