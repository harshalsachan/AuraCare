from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

# 1. Initialize the FastAPI App
app = FastAPI()

# Allow your React frontend (running on port 5173) to talk to this Python backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Database Setup (SQLite)
def get_db():
    conn = sqlite3.connect("vitaltrack.db")
    conn.row_factory = sqlite3.Row # Allows us to access columns by name
    return conn

# Create the caretakers table if it doesn't exist
def init_db():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS caretakers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

init_db() # Run this when the server starts

# 3. Pydantic Models (For receiving data from React)
class CaretakerRegister(BaseModel):
    name: str
    email: str
    password: str

class CaretakerLogin(BaseModel):
    email: str
    password: str

# ==========================================
# AUTHENTICATION ENDPOINTS
# ==========================================

@app.post("/api/register")
def register_caretaker(caretaker: CaretakerRegister):
    conn = get_db()
    cursor = conn.cursor()
    
    try:
        # In a production app, we would hash this password! For now, we store plain text to test.
        cursor.execute(
            "INSERT INTO caretakers (email, password, name) VALUES (?, ?, ?)", 
            (caretaker.email, caretaker.password, caretaker.name)
        )
        conn.commit()
        return {"message": "Account created successfully!"}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Email already registered")
    finally:
        conn.close()

@app.post("/api/login")
def login_caretaker(caretaker: CaretakerLogin):
    conn = get_db()
    cursor = conn.cursor()
    
    cursor.execute(
        "SELECT * FROM caretakers WHERE email = ? AND password = ?", 
        (caretaker.email, caretaker.password)
    )
    user = cursor.fetchone()
    conn.close()
    
    if user:
        return {
            "message": "Login successful", 
            "user": {"id": user["id"], "name": user["name"], "email": user["email"]}
        }
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password")

# A simple test route
@app.get("/")
def read_root():
    return {"status": "VitalTrack API is running!"}