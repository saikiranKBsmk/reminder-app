from fastapi import APIRouter,Depends,status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import ReminderCreate,ReminderResponse
from app.repository.reminder import create_reminder_service

router = APIRouter(prefix="/api/reminders", tags=["Reminders"])

@router.post("/",
    response_model=ReminderResponse,
    status_code=status.HTTP_201_CREATED
)
def create_reminder(payload: ReminderCreate,db: Session = Depends(get_db)
):

    return create_reminder_service(db, payload)