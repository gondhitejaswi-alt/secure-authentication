# SecureAuth Toolkit

### Secure Authentication & Cybersecurity Toolkit

SecureAuth Toolkit is a full-stack web application designed to demonstrate secure authentication practices and essential cybersecurity controls. The project focuses on password security, authentication, session management, authorization, and security monitoring.

## Features

* User Registration & Login
* Password Validation
* Password Strength Checker
* Secure Password Authentication
* Session Management
* Protected Routes
* Role-Based Access Control
* Login Rate Limiting
* Security Event Logging
* Password Change
* Security Dashboard
* Admin Monitoring

## Tech Stack

| Technology   | Purpose                  |
| ------------ | ------------------------ |
| React        | Frontend                 |
| TypeScript   | Programming Language     |
| Vite         | Build Tool               |
| Tailwind CSS | UI Styling               |
| Supabase     | Backend & Authentication |
| PostgreSQL   | Database                 |
| Netlify      | Deployment               |

## Getting Started

### Prerequisites

* Node.js
* npm
* Supabase account

### Installation

```bash
git clone https://github.com/gautami1407/secure-authentication.git
cd secure-authentication
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Do not commit `.env` or any secret credentials to GitHub.

### Run Locally

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## Security Controls

The project demonstrates:

* Strong password validation
* Secure authentication
* Session management
* Role-based authorization
* Row Level Security
* Input validation
* Login rate limiting
* Security event logging
* Protected routes

## Architecture

```text
User
  ↓
React Frontend
  ↓
Authentication Layer
  ↓
Supabase
  ↓
PostgreSQL
```

## Deployment

The project can be deployed using Netlify.

**Build Command**

```bash
npm run build
```

**Publish Directory**

```text
dist
```

## Project Purpose

This project is developed as an academic cybersecurity prototype to demonstrate practical concepts related to secure authentication and web application security.

## Future Enhancements

* Multi-Factor Authentication
* Passkeys / WebAuthn
* Secure Password Recovery
* Email Verification
* Advanced Security Analytics
* Suspicious Login Detection

## License

This project is intended for educational purposes.
