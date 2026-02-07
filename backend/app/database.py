import json
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Load DB config
BASE_DIR = Path(__file__).resolve().parent
CONFIG_PATH = BASE_DIR / "config.json"
print(CONFIG_PATH)

with open(CONFIG_PATH) as f:
    config = json.load(f)

db = config["database_connection"]

DATABASE_URL = (
    f"{db['driver']}://{db['username']}:{db['password']}"
    f"@{db['server']}:{db['port']}/{db['database_name']}"
)

# Create engine
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

# Create session
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base model
Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
