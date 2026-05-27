from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.user_schema import HistoryResponse, HistoryItem
from app.services.auth_service import get_current_user
from app.models.symptom import SymptomHistory

router = APIRouter(prefix="/history", tags=["History"])


@router.get("", response_model=HistoryResponse)
def get_history(
    authorization: str = Header(...),
    db: Session = Depends(get_db),
):
    try:
        token = authorization.replace("Bearer ", "")
        user = get_current_user(token, db)
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))

    records = (
        db.query(SymptomHistory)
        .filter(SymptomHistory.user_id == user.id)
        .order_by(SymptomHistory.created_at.desc())
        .all()
    )
    items = [HistoryItem.model_validate(r) for r in records]
    return HistoryResponse(history=items)
