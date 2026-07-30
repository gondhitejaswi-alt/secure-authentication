# Cybersecurity Authentication Toolkit (Full-Stack Web Application)

A complete full-stack cybersecurity web application built for the **Python for Cybersecurity** course assignment. Featuring a **React + Vite** dark-themed security dashboard and a **Python FastAPI** backend REST service.

---

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
  - [1. Backend Setup (FastAPI)](#1-backend-setup-fastapi)
  - [2. Frontend Setup (React + Vite)](#2-frontend-setup-react--vite)
- [API Endpoints](#api-endpoints)
- [Module Descriptions](#module-descriptions)
- [Security Concepts Demonstrated](#security-concepts-demonstrated)
- [Future Improvements](#future-improvements)

---

## Overview

The **Cybersecurity Authentication Toolkit** is an interactive web application designed to demonstrate fundamental security mechanisms and attack detection principles in authentication systems. It features 5 core cybersecurity modules, ranging from evaluating password strength and generating cryptographically secure credentials to simulating brute-force and password-guessing defenses.

---

## Key Features

- **Professional Cybersecurity Dashboard:** Glassmorphic dark UI with live security counters and status indicators.
- **Real-Time Password Evaluation:** Dynamic analysis of password entropy, scoring (0–5), and actionable security tips.
- **3-Strike Login Lockout Simulator:** Session-based authentication rate-limiting with generic error responses to prevent user enumeration.
- **Cryptographic Password Generator:** High-entropy password generation powered by Python's `secrets` standard library module.
- **Volumetric Brute-Force Detection:** Log processing engine identifying IP origins with 3 or more failed login attempts.
- **Targeted Password Guessing Detection:** Deduplicated log analysis tracking unique failed password variations per user account using sets.

---

## Technologies Used

### Backend
- **Language:** Python 3
- **Framework:** FastAPI
- **ASGI Server:** Uvicorn
- **Validation:** Pydantic
- **Security Standard Modules:** `secrets`, `string`, `typing`

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite 5
- **Icons:** Lucide React
- **Styling:** Custom CSS (Dark Cyber Aesthetic, Glassmorphism, HSL tailwinds)

---

## System Architecture

```text
React Frontend (Port 5173)  <===>  REST API (CORS)  <===>  FastAPI Backend (Port 8000)
       │                                                          │
   Components                                               Security Modules
  (Dashboard, Forms,                                    (PasswordStrength, Generator,
   Data Tables, Alerts)                                  Lockout, Attack Analyzers)
```

---

## Project Structure

```text
cybersecurity-authentication-toolkit/
│
├── backend/
│   ├── main.py                         # FastAPI REST application & routing
│   ├── password_strength.py            # Module 1: Password Strength Checker logic
│   ├── login_lockout.py                # Module 2: Login Lockout Simulator state manager
│   ├── password_generator.py           # Module 3: Secure Password Generator logic
│   ├── brute_force_detection.py        # Module 4: Brute Force Attack Detection logic
│   ├── password_guessing_detection.py  # Module 5: Password Guessing Detection logic
│   └── requirements.txt                # Backend Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx              # Navigation header with active indicators
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx           # Home dashboard with statistics and cards
│   │   │   ├── PasswordStrength.jsx    # Module 1 UI page
│   │   │   ├── LoginLockout.jsx        # Module 2 UI page
│   │   │   ├── PasswordGenerator.jsx   # Module 3 UI page
│   │   │   ├── BruteForceDetection.jsx # Module 4 UI page
│   │   │   └── PasswordGuessingDetection.jsx # Module 5 UI page
│   │   ├── App.jsx                     # Root application component
│   │   ├── main.jsx                    # React entry point
│   │   └── index.css                   # Modern dark cyber CSS design system
│   ├── package.json                    # Frontend Node dependencies
│   ├── index.html                      # HTML document template
│   └── vite.config.js                  # Vite dev server configuration
│
├── README.md                           # Documentation & setup guide
├── REPORT.md                           # Academic project report
└── .gitignore                          # Git ignore rules
```

---

## Installation & Setup

### 1. Backend Setup (FastAPI)

1. Open terminal and navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the backend server:
   ```bash
   uvicorn main:app --reload
   ```
   *Backend running at: `http://127.0.0.1:8000`*

---

### 2. Frontend Setup (React + Vite)

1. Open another terminal and navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install frontend packages:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *Frontend running at: `http://localhost:5173`*

---

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint |
| `GET` | `/api/dashboard-stats` | Summary statistics for home cards |
| `POST` | `/api/password-strength` | Password entropy & score evaluation |
| `POST` | `/api/login` | Authentication attempt simulation & lockout check |
| `POST` | `/api/reset-lockout` | Resets lockout session counter |
| `POST` | `/api/generate-password` | Cryptographic password generation |
| `GET` | `/api/brute-force` | IP brute-force attack log analysis |
| `GET` | `/api/password-guessing` | User dictionary attack log analysis |

---

## Security Concepts Demonstrated

1. **Cryptographic Randomness:** Using `secrets` for security-sensitive operations rather than pseudo-random generators (`random`).
2. **User Enumeration Prevention:** Suppressing specific error details (e.g., "User does not exist") in login failure responses.
3. **Rate Limiting & Account Lockout:** Preventing online automated brute-force attacks by limiting attempt frequencies.
4. **Log Analysis & Anomaly Detection:** Parsing logs to detect volumetric (IP-based) and targeted (User-based) threats.
5. **Deduplicated Analytics:** Using mathematical sets to track unique password attempts rather than raw connection counts.

> **Production Security Note:** Real-world production systems should store password hashes generated via algorithms like Argon2 or bcrypt rather than plaintext passwords.
