"""
Backend Module 2: Login Lockout Simulator
Manages authentication attempt tracking and account lockout security state.
"""

DEMO_USERNAME = "admin"
DEMO_PASSWORD = "Cyber@123"
MAX_ATTEMPTS = 3

# In-memory login attempt session state
login_state = {
    "attempts_failed": 0,
    "is_locked": False,
    "locked_user": None
}


def authenticate_user(username: str, password: str) -> dict:
    """
    Validates login credentials, updates remaining attempt count, and handles lockout state.
    """
    global login_state

    # Check if account is already locked
    if login_state["is_locked"]:
        return {
            "success": False,
            "locked": True,
            "message": "🔒 ACCOUNT LOCKED: Your account has been locked because of multiple failed login attempts. Further login attempts are blocked.",
            "remaining_attempts": 0,
            "attempts_used": login_state["attempts_failed"]
        }

    # Verify credentials
    if username == DEMO_USERNAME and password == DEMO_PASSWORD:
        # Reset attempt counter on success
        login_state["attempts_failed"] = 0
        return {
            "success": True,
            "locked": False,
            "message": "SUCCESS: Authentication successful! Welcome, admin.",
            "remaining_attempts": MAX_ATTEMPTS,
            "attempts_used": 0
        }
    else:
        login_state["attempts_failed"] += 1
        attempts_used = login_state["attempts_failed"]
        remaining = max(0, MAX_ATTEMPTS - attempts_used)

        if remaining == 0:
            login_state["is_locked"] = True
            login_state["locked_user"] = DEMO_USERNAME
            return {
                "success": False,
                "locked": True,
                "message": "🔒 ACCOUNT LOCKED: Your account has been locked because of multiple failed login attempts. Further login attempts are blocked.",
                "remaining_attempts": 0,
                "attempts_used": MAX_ATTEMPTS
            }
        else:
            return {
                "success": False,
                "locked": False,
                "message": f"Invalid username or password. Remaining attempts: {remaining}",
                "remaining_attempts": remaining,
                "attempts_used": attempts_used
            }


def reset_lockout_state() -> dict:
    """Resets the in-memory lockout simulator state for re-testing."""
    global login_state
    login_state["attempts_failed"] = 0
    login_state["is_locked"] = False
    login_state["locked_user"] = None
    return {
        "success": True,
        "message": "Login simulator state has been reset successfully.",
        "remaining_attempts": MAX_ATTEMPTS,
        "is_locked": False
    }
