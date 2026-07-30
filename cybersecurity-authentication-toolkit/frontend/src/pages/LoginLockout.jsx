import React, { useState } from 'react';
import { Lock, ShieldAlert, CheckCircle, RotateCcw, User, Key } from 'lucide-react';

const LoginLockout = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authResponse, setAuthResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) return;

    setLoading(true);
    fetch('http://127.0.0.1:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(data => {
        setAuthResponse(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Login request failed:", err);
        setLoading(false);
      });
  };

  const handleReset = () => {
    fetch('http://127.0.0.1:8000/api/reset-lockout', { method: 'POST' })
      .then(res => res.json())
      .then(() => {
        setAuthResponse(null);
        setUsername('');
        setPassword('');
      })
      .catch(err => console.error("Reset failed:", err));
  };

  const isLocked = authResponse?.locked;

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div className="cyber-card">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '0.65rem', borderRadius: '12px', color: '#3b82f6' }}>
            <Lock size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc' }}>
              Login Lockout Simulator
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Simulates rate-limiting defenses and 3-strike account lockout rules against brute-force attacks.
            </p>
          </div>
        </div>

        {/* Demo Account Credentials Notice */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(56, 189, 248, 0.2)',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          fontSize: '0.9rem'
        }}>
          <div style={{ fontWeight: 600, color: '#38bdf8', marginBottom: '0.3rem' }}>
            📌 Demonstration Account Credentials:
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', color: '#cbd5e1' }}>
            <span>Username: <strong style={{ color: '#f8fafc' }}>admin</strong></span>
            <span>Password: <strong style={{ color: '#f8fafc' }}>Cyber@123</strong></span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username..."
                className="cyber-input"
                disabled={isLocked || loading}
                style={{ paddingLeft: '2.5rem' }}
              />
              <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="cyber-input"
                disabled={isLocked || loading}
                style={{ paddingLeft: '2.5rem' }}
              />
              <Key size={18} color="#94a3b8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={isLocked || loading || !username || !password}
              style={{ flex: 1 }}
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>

            {authResponse && (
              <button
                type="button"
                onClick={handleReset}
                className="btn-secondary"
                title="Reset Lockout Session"
              >
                <RotateCcw size={18} /> Reset Simulator
              </button>
            )}
          </div>
        </form>

        {/* Authentication Feedback / Alerts */}
        {authResponse && (
          <div style={{ marginTop: '1.5rem' }}>
            {authResponse.success ? (
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: '#6ee7b7'
              }}>
                <CheckCircle size={24} color="#10b981" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>Login Successful!</div>
                  <div style={{ fontSize: '0.9rem' }}>Welcome back, admin. Session authenticated.</div>
                </div>
              </div>
            ) : isLocked ? (
              <div className="alert-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fda4af', marginBottom: '0.5rem' }}>
                  <ShieldAlert size={26} color="#f43f5e" />
                  <span style={{ fontWeight: 800, fontSize: '1.15rem' }}>🔒 ACCOUNT LOCKED</span>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  Your account has been locked because of multiple failed login attempts.
                  Further login attempts are blocked.
                </p>
                <button
                  onClick={handleReset}
                  className="btn-primary"
                  style={{ marginTop: '1rem', background: 'linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)' }}
                >
                  <RotateCcw size={18} /> Unlock & Reset Simulator
                </button>
              </div>
            ) : (
              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                color: '#fde047'
              }}>
                <div style={{ fontWeight: 600 }}>{authResponse.message}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginLockout;
