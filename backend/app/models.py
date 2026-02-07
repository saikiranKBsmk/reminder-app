from app.database import Base
from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

class Reminder(Base):
    __tablename__ = "reminders"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    original_text = Column(String,nullable=False)
    scheduled_time = Column(DateTime, nullable=False)
    status = Column(String, default="scheduled",nullable=False)
    create_at = Column(DateTime, default=datetime.utcnow)