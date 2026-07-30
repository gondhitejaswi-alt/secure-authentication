"""
Backend Module 4: Brute Force Attack Detection
Analyzes authentication log datasets to detect volumetric IP-based brute-force attacks.
"""

FAILED_ATTEMPT_THRESHOLD = 3

SAMPLE_LOGIN_ATTEMPTS = [
    # IP 192.168.1.10 - 4 failed attempts (SUSPICIOUS)
    {"ip": "192.168.1.10", "username": "admin", "status": "failed"},
    {"ip": "192.168.1.10", "username": "admin", "status": "failed"},
    {"ip": "192.168.1.10", "username": "admin", "status": "failed"},
    {"ip": "192.168.1.10", "username": "root",  "status": "failed"},

    # IP 192.168.1.20 - Successful login (NORMAL)
    {"ip": "192.168.1.20", "username": "user1", "status": "success"},

    # IP 192.168.1.30 - 1 failed attempt (NORMAL)
    {"ip": "192.168.1.30", "username": "user2", "status": "failed"},

    # IP 192.168.1.40 - Exactly 3 failed attempts (SUSPICIOUS)
    {"ip": "192.168.1.40", "username": "administrator", "status": "failed"},
    {"ip": "192.168.1.40", "username": "administrator", "status": "failed"},
    {"ip": "192.168.1.40", "username": "administrator", "status": "failed"},

    # IP 192.168.1.50 - 2 failed attempts, 1 success (NORMAL)
    {"ip": "192.168.1.50", "username": "alice", "status": "failed"},
    {"ip": "192.168.1.50", "username": "alice", "status": "failed"},
    {"ip": "192.168.1.50", "username": "alice", "status": "success"}
]


def analyze_brute_force_attempts(attempts=None) -> dict:
    """
    Analyzes login attempts and returns per-IP failure counts and threat alerts.
    """
    if attempts is None:
        attempts = SAMPLE_LOGIN_ATTEMPTS

    total_attempts = len(attempts)
    total_failed_attempts = 0
    ip_failed_counts = {}

    for record in attempts:
        ip = record.get("ip")
        status = record.get("status")

        if status == "failed":
            total_failed_attempts += 1
            ip_failed_counts[ip] = ip_failed_counts.get(ip, 0) + 1
        else:
            if ip not in ip_failed_counts:
                ip_failed_counts[ip] = 0

    results_table = []
    suspicious_ips = []

    for ip, count in ip_failed_counts.items():
        is_suspicious = count >= FAILED_ATTEMPT_THRESHOLD
        status_label = "SUSPICIOUS" if is_suspicious else "NORMAL"

        item = {
            "ip": ip,
            "failed_attempts": count,
            "status": status_label,
            "is_suspicious": is_suspicious
        }
        results_table.append(item)

        if is_suspicious:
            suspicious_ips.append(item)

    return {
        "threshold": FAILED_ATTEMPT_THRESHOLD,
        "total_attempts": total_attempts,
        "total_failed_attempts": total_failed_attempts,
        "suspicious_ip_count": len(suspicious_ips),
        "table_data": results_table,
        "alerts": suspicious_ips
    }
