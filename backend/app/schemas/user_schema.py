from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class HistoryItem(BaseModel):
    id: int
    symptoms: str
    predicted_disease: str
    severity: str
    recommendation: str
    specialist: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class HistoryResponse(BaseModel):
    history: List[HistoryItem]
