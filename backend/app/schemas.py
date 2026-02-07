from pydantic import BaseModel
from datetime import datetime

class ReminderCreate(BaseModel):
    raw_text : str
    user_id : int
    
class ReminderResponse(BaseModel):
    id : int
    original_text : str
    scheduled_time : datetime
    status : str 
    
    class Config:
        from_attributes = True