from dateparser.search import search_dates
from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.models import Reminder
from app.schemas import ReminderCreate
from datetime import datetime, time, timedelta

TIME_KEYWORDS = {
    "morning": time(9, 0),
    "afternoon": time(14, 0),
    "evening": time(19, 0),
    "night": time(21, 0),
}


def apply_indirect_time(raw_text: str) -> datetime | None:
    text = raw_text.lower()
    today = datetime.now().date()

    for keyword, default_time in TIME_KEYWORDS.items():
        if keyword in text:
            scheduled = datetime.combine(today, default_time)

            # If time already passed, move to next day
            if scheduled < datetime.now():
                scheduled += timedelta(days=1)

            return scheduled

    return None


def create_reminder_service(db: Session, payload: ReminderCreate) -> Reminder:
    parsed_time = None

    results = search_dates(
        payload.raw_text,
        languages=["en"],
        settings={
            "PREFER_DATES_FROM": "future",
            "RELATIVE_BASE": datetime.now(),
        },
    )

    if results:
        parsed_time = results[0][1]

    # indirect phrases
    if not parsed_time:
        parsed_time = apply_indirect_time(payload.raw_text)

    #  Still nothing → fail 
    if not parsed_time:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Please specify a clearer time (e.g. 'at 3 PM tomorrow')",
        )

    reminder = Reminder(
        user_id=payload.user_id,
        original_text=payload.raw_text,
        scheduled_time=parsed_time,
        status="scheduled",
    )

    db.add(reminder)
    db.commit()
    db.refresh(reminder)

    return reminder
