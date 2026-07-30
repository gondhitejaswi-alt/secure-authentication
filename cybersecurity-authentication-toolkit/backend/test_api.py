"""
API Endpoint Test Suite
Verifies all FastAPI REST endpoints.
"""

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_api_endpoints():
    print("=" * 60)
    print("TESTING FASTAPI BACKEND REST ENDPOINTS")
    print("=" * 60)

    # 1. Health Check
    res = client.get("/api/health")
    assert res.status_code == 200
    assert res.json()["status"] == "ok"
    print("[PASS] GET /api/health")

    # 2. Dashboard Stats
    res = client.get("/api/dashboard-stats")
    assert res.status_code == 200
    data = res.json()
    assert data["security_modules_count"] == 5
    assert data["failed_attempt_threshold"] == 3
    print("[PASS] GET /api/dashboard-stats")

    # 3. Password Strength
    res = client.post("/api/password-strength", json={"password": "Cyber@2026!"})
    assert res.status_code == 200
    data = res.json()
    assert data["rating"] == "Strong"
    assert data["score"] == 5
    print("[PASS] POST /api/password-strength")

    # 4. Login Lockout
    res1 = client.post("/api/login", json={"username": "admin", "password": "Cyber@123"})
    assert res1.json()["success"] is True
    
    res2 = client.post("/api/login", json={"username": "admin", "password": "wrong"})
    assert res2.json()["success"] is False
    assert "Invalid username or password" in res2.json()["message"]
    print("[PASS] POST /api/login")

    # 5. Reset Lockout
    res = client.post("/api/reset-lockout")
    assert res.json()["success"] is True
    print("[PASS] POST /api/reset-lockout")

    # 6. Password Generator
    res = client.post("/api/generate-password", json={
        "length": 16,
        "use_upper": True,
        "use_lower": True,
        "use_digits": True,
        "use_special": True
    })
    assert res.status_code == 200
    data = res.json()
    assert data["success"] is True
    assert len(data["password"]) == 16
    print("[PASS] POST /api/generate-password")

    # 7. Brute Force Detection
    res = client.get("/api/brute-force")
    assert res.status_code == 200
    data = res.json()
    assert data["suspicious_ip_count"] == 2
    print("[PASS] GET /api/brute-force")

    # 8. Password Guessing Detection
    res = client.get("/api/password-guessing")
    assert res.status_code == 200
    data = res.json()
    assert data["suspicious_user_count"] == 2
    print("[PASS] GET /api/password-guessing")

    print("=" * 60)
    print("ALL API ENDPOINTS TESTED AND PASSED SUCCESSFULLY!")
    print("=" * 60)


if __name__ == "__main__":
    test_api_endpoints()
