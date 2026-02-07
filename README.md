# Smart Reminder App

A simple reminder application that allows users to create reminders using
natural language text or voice input. The system extracts time from the input
and schedules the reminder.

## Features
- Text and voice-based reminder creation
- Natural language time parsing
- FastAPI backend
- React + Material UI frontend
- Global success/error notifications

## Tech Stack
**Backend:** Python, FastAPI, SQLAlchemy, PostgreSQL, dateparser  
**Frontend:** React (Vite), Material UI, Axios, React-Toastify

## API
**POST /api/reminders/**

Request:
```json
{
  "raw_text": "Call Sai Kiran tomorrow evening",
  "user_id": 1
}

Response:

{
  "id": 1,
  "original_text": "Call Sai Kiran tomorrow evening",
  "scheduled_time": "2026-02-08T19:00:00",
  "status": "scheduled"
}

Run Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

Run Frontend
cd frontend
npm install
npm run dev

Notes

Voice input is handled on the frontend

Time parsing supports direct and indirect phrases

Authentication is out of scope

Author

Sai Kiran