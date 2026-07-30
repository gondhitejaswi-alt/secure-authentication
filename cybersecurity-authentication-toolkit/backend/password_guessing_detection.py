"""
Backend Module 5: Password Guessing Detection
Analyzes authentication records to detect targeted dictionary/password guessing attacks
by tracking UNIQUE failed passwords attempted per user account.
"""

PASSWORD_GUESSING_THRESHOLD = 3

SAMPLE_LOGIN_RECORDS = [
    # Targeted user 'admin' - 3 UNIQUE failed passwords (SUSPICIOUS)
    {"username": "admin", "password": "123456",   "status": "failed"},
    {"username": "admin", "password": "123456",   "status": "failed"},  # Duplicate password - ignored for unique count
    {"username": "admin", "password": "password", "status": "failed"},
    {"username": "admin", "password": "admin123", "status": "failed"},

    # Normal user 'john' - 1 unique failed password repeated twice (NORMAL)
    {"username": "john",  "password": "hello",    "status": "failed"},
    {"username": "john",  "password": "hello",    "status": "failed"},

    # Targeted user 'alice' - 4 UNIQUE failed passwords (SUSPICIOUS)
    {"username": "alice", "password": "letmein",   "status": "failed"},
    {"username": "alice", "password": "alice2026", "status": "failed"},
    {"username": "alice", "password": "qwerty",    "status": "failed"},
    {"username": "alice", "password": "welcome",   "status": "failed"},

    # User 'bob' - 2 unique failed passwords (NORMAL)
    {"username": "bob",   "password": "pass1",     "status": "failed"},
    {"username": "bob",   "password": "pass2",     "status": "failed"},
    {"username": "bob",   "password": "pass1",     "status": "failed"}
]


def analyze_password_guessing(records=None) -> dict:
    """
    Analyzes failed login attempts and counts unique passwords per user.
    Note: Actual password strings are never returned in threat reports for security compliance.
    """
    if records is None:
        records = SAMPLE_LOGIN_RECORDS

    user_passwords_map = {}

    for record in records:
        username = record.get("username")
        password = record.get("password")
        status = record.get("status")

        if status == "failed":
            if username not in user_passwords_map:
                user_passwords_map[username] = set()
            user_passwords_map[username].add(password)

    results_table = []
    suspicious_users = []

    for username, pwd_set in user_passwords_map.items():
        unique_count = len(pwd_set)
        is_suspicious = unique_count >= PASSWORD_GUESSING_THRESHOLD
        status_label = "SUSPICIOUS" if is_suspicious else "NORMAL"

        item = {
            "username": username,
            "different_passwords": unique_count,
            "status": status_label,
            "is_suspicious": is_suspicious
        }
        results_table.append(item)

        if is_suspicious:
            suspicious_users.append(item)

    return {
        "threshold": PASSWORD_GUESSING_THRESHOLD,
        "total_records_analyzed": len(records),
        "suspicious_user_count": len(suspicious_users),
        "table_data": results_table,
        "alerts": suspicious_users
    }
