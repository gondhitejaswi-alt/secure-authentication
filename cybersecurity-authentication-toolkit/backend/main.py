"""
FastAPI Main Application Backend
Provides REST API endpoints for all 5 Cybersecurity Authentication Toolkit modules.
"""

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional

# Import backend module logic
from password_strength import check_password_strength
from login_lockout import authenticate_user, reset_lockout_state, login_state
from password_generator import generate_secure_password
from brute_force_detection import analyze_brute_force_attempts, FAILED_ATTEMPT_THRESHOLD
from password_guessing_detection import analyze_password_guessing, PASSWORD_GUESSING_THRESHOLD

app = FastAPI(
    title="Cybersecurity Authentication Toolkit API",
    description="REST API backend for authentication security evaluation, simulation, and attack detection.",
    version="1.0.0"
)

# Enable CORS for React frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic Request Schemas
class PasswordStrengthRequest(BaseModel):
    password: str = Field(..., description="Password to evaluate")


class LoginRequest(BaseModel):
    username: str = Field(..., description="Username for login attempt")
    password: str = Field(..., description="Password for login attempt")


class PasswordGeneratorRequest(BaseModel):
    length: int = Field(12, description="Desired password length")
    use_upper: bool = Field(True, description="Include uppercase letters")
    use_lower: bool = Field(True, description="Include lowercase letters")
    use_digits: bool = Field(True, description="Include digits")
    use_special: bool = Field(True, description="Include special characters")


# API Endpoints
@app.get("/api/health")
def health_check():
    """Returns API health status."""
    return {"status": "ok", "message": "Cybersecurity Authentication Toolkit API is running cleanly."}


@app.get("/api/dashboard-stats")
def get_dashboard_stats():
    """Returns live summary metrics for the home dashboard cards."""
    bf_data = analyze_brute_force_attempts()
    pg_data = analyze_password_guessing()

    return {
        "security_modules_count": 5,
        "failed_attempt_threshold": FAILED_ATTEMPT_THRESHOLD,
        "detected_suspicious_ips": bf_data["suspicious_ip_count"],
        "possible_password_guessing_attacks": pg_data["suspicious_user_count"]
    }


@app.post("/api/password-strength")
def evaluate_password_strength(req: PasswordStrengthRequest):
    """Evaluates password entropy, score (0-5), rating, and suggestions."""
    if req.password is None:
        raise HTTPException(status_code=400, detail="Password input cannot be empty.")
    
    result = check_password_strength(req.password)
    return {
        "success": True,
        "score": result["score"],
        "rating": result["rating"],
        "checks": result["checks"],
        "suggestions": result["suggestions"]
    }


@app.post("/api/login")
def login_attempt(req: LoginRequest):
    """Simulates an authentication attempt and manages account lockout logic."""
    result = authenticate_user(req.username.strip(), req.password.strip())
    return result


@app.post("/api/reset-lockout")
def reset_lockout():
    """Resets the login simulator state for testing."""
    return reset_lockout_state()


@app.post("/api/generate-password")
def generate_password(req: PasswordGeneratorRequest):
    """Generates a cryptographically secure password using Python secrets."""
    password, error, strength_info = generate_secure_password(
        length=req.length,
        use_upper=req.use_upper,
        use_lower=req.use_lower,
        use_digits=req.use_digits,
        use_special=req.use_special
    )

    if error:
        return {
            "success": False,
            "error": error
        }

    return {
        "success": True,
        "password": password,
        "strength": strength_info["rating"],
        "score": strength_info["score"],
        "suggestions": strength_info["suggestions"]
    }


@app.get("/api/brute-force")
def get_brute_force_detection():
    """Runs brute-force detection analysis on sample authentication logs."""
    return analyze_brute_force_attempts()


@app.get("/api/password-guessing")
def get_password_guessing_detection():
    """Runs password guessing detection analysis on sample authentication logs."""
    return analyze_password_guessing()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
