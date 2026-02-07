from fastapi import FastAPI
from app import models
from app.database import engine
from app.routers.reminder import router as reminder_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="REMINDER API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    models.Base.metadata.create_all(bind=engine)

app.include_router(reminder_router)

@app.get("/check")
def check():
    return {"status": "Backend OK"}
