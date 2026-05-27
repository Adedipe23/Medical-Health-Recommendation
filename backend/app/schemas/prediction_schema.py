from pydantic import BaseModel
from typing import List


class PredictionRequest(BaseModel):
    symptoms: List[str]


class PredictionResponse(BaseModel):
    disease: str
    severity: str
    recommendation: str
    specialist: str
