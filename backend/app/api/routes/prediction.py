from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.prediction_schema import PredictionRequest, PredictionResponse
from app.services.recommendation_engine import analyze_symptoms
from app.services.auth_service import get_current_user
from app.models.symptom import SymptomHistory

router = APIRouter(prefix="/predict", tags=["Prediction"])


@router.post("", response_model=PredictionResponse)
def predict(
    req: PredictionRequest,
    authorization: str = Header(...),
    db: Session = Depends(get_db),
):
    try:
        token = authorization.replace("Bearer ", "")
        user = get_current_user(token, db)
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))

    result = analyze_symptoms(req.symptoms)

    history = SymptomHistory(
        user_id=user.id,
        symptoms=", ".join(req.symptoms),
        predicted_disease=result["disease"],
        severity=result["severity"],
        recommendation=result["recommendation"],
        specialist=result["specialist"],
    )
    db.add(history)
    db.commit()

    return PredictionResponse(**result)
