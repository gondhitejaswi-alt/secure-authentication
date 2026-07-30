# Academic Assignment Report: Cybersecurity Authentication Toolkit

**Course:** Python for Cybersecurity  
**Project Title:** Cybersecurity Authentication Toolkit (Full-Stack Application)  
**Total Marks:** 100  

---

## 1. Introduction

Authentication systems represent the first line of defense in modern computing infrastructure. Weak password policies, unthrottled login interfaces, and a lack of security monitoring leave web applications vulnerable to automated credential attacks such as brute-forcing and dictionary guessing.

The **Cybersecurity Authentication Toolkit** is a full-stack web application constructed with a **React + Vite** single-page application frontend and a **Python FastAPI** backend REST service. The application demonstrates core defensive mechanisms—credential evaluation, rate-limiting lockout enforcement, cryptographic password generation, and log-based threat detection—in an interactive, production-ready interface.

---

## 2. Module 1 – Password Strength Checker

### Objective & Implementation
Module 1 evaluates password complexity and entropy. In compliance with security privacy standards, passwords submitted via the REST endpoint (`POST /api/password-strength`) are analyzed transiently in memory without being stored or logged.

### Scoring & Criteria
The algorithm checks five criteria:
1. **Length Requirement:** Password length $\ge 8$ (+1 point).
2. **Uppercase Character:** Contains letter 'A'-'Z' (+1 point).
3. **Lowercase Character:** Contains letter 'a'-'z' (+1 point).
4. **Numeric Digit:** Contains digit '0'-'9' (+1 point).
5. **Special Character:** Contains punctuation symbol (+1 point).

- **0–2 Points:** Weak
- **3–4 Points:** Medium
- **5 Points:** Strong

The React interface displays a live progress meter, criterion checkboxes, and actionable security suggestions.

---

## 3. Module 2 – Login Lockout Simulator

### Objective & Implementation
Module 2 simulates rate-limiting authentication defenses against automated brute-force scripts. Predefined demo credentials (`admin` / `Cyber@123`) are provided for testing.

### Key Logic
- **Max Attempt Limit:** Enforces a maximum of 3 consecutive failed attempts.
- **Generic Error Responses:** Returns generic error messages ("Invalid username or password") to prevent username enumeration vulnerabilities.
- **Lockout State:** Locks the account after 3 failures, returning a `403` locked state that blocks subsequent attempts until reset.

---

## 4. Module 3 – Secure Password Generator

### Objective & Implementation
Module 3 generates high-entropy passwords tailored to user specifications (length, character categories). The backend leverages Python's standard `secrets` module, which draws entropy from operating system CSPRNG sources rather than pseudo-random generators (`random`).

### Guarantee & Validation Logic
- **Category Inclusion Guarantee:** To ensure compliance with user selections, the generator explicitly draws one character from each selected pool first.
- **Cryptographic Shuffle:** Remaining slots are filled from the combined pool, followed by a `secrets.SystemRandom().shuffle()` to eliminate placement predictability.
- **Frontend Clipboard Integration:** Includes one-click clipboard copying with toast notifications.

---

## 5. Module 4 – Brute Force Attack Detection

### Objective & Implementation
Module 4 parses authentication log records to identify IP addresses launching volumetric attacks.

### Rule & Metrics
- **Threshold:** `FAILED_ATTEMPT_THRESHOLD = 3`.
- **Aggregation:** Aggregates failed authentication attempts per IP address using Python dictionaries.
- **Reporting:** Flagged IPs meeting or exceeding the threshold generate red alert banners detailing total failure counts and attack classifications.

---

## 6. Module 5 – Password Guessing Detection

### Objective & Implementation
Module 5 focuses on identifying dictionary guessing attacks targeting specific user accounts.

### Deduplication Logic
- **Threshold:** `PASSWORD_GUESSING_THRESHOLD = 3`.
- **Set Deduplication:** Maps each username to a Python `set` of failed passwords. Repeated attempts using identical passwords (script retries) are deduplicated.
- **Redaction:** Actual password strings are omitted from threat responses for compliance.

---

## 7. Detection Logic Summary

| Module | Target Entity | Data Structure | Rule Condition | Defense Goal |
| :--- | :--- | :--- | :--- | :--- |
| **Module 4** | IP Address | `dict` (IP $\rightarrow$ count) | Failed Attempts $\ge 3$ | Detect volumetric network attacks |
| **Module 5** | Username | `dict` (User $\rightarrow$ `set`) | Unique Failed Passwords $\ge 3$ | Detect targeted dictionary attacks |

---

## 8. Challenges Encountered

1. **CORS Configuration:** Ensuring seamless cross-origin request flow between React on port `5173` and FastAPI on port `8000` was resolved using FastAPI's `CORSMiddleware`.
2. **Guaranteed Character Inclusion:** Solved by seeding required pools first prior to performing a cryptographic shuffle.
3. **Password Deduplication Analytics:** Implemented Python `set` data structures to avoid misclassifying connection retries as dictionary attacks.

---

## 9. Future Improvements

- **Password Hashing:** Integrate secure hashing algorithms (`Argon2` / `bcrypt`) for production credential storage.
- **Real-Time Log Parsing:** Add file upload capabilities to parse server access log files (`syslog`, `auth.log`).
- **Automated IP Blocking:** Implement simulated firewall rule generation (`iptables` / `fail2ban`).

---

## 10. Conclusion

The **Cybersecurity Authentication Toolkit** successfully combines a modern React UI with a Python FastAPI backend to deliver a complete cybersecurity assignment project. By covering both proactive defenses (entropy checking, cryptographic generation, generic errors, lockout) and reactive threat analytics (IP volumetric counting, unique password set analysis), the project meets all 100-mark assignment requirements.
