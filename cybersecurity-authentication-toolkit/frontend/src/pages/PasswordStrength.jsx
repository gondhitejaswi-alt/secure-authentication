import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X, Shield, AlertCircle } from 'lucide-react';

const PasswordStrength = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [analysis, setAnalysis] = useState({
    score: 0,
    rating: 'Weak',
    checks: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      special: false
    },
    suggestions: [
      'Make the password at least 8 characters long.',
      'Add uppercase letters (A-Z).',
      'Add lowercase letters (a-z).',
      'Add numbers (0-9).',
      'Add special characters (!@#$%^&* etc.).'
    ]
  });

  useEffect(() => {
    if (!password) {
      setAnalysis({
        score: 0,
        rating: 'Weak',
        checks: { length: false, uppercase: false, lowercase: false, number: false, special: false },
        suggestions: ['Type a password to evaluate its strength in real-time.']
      });
      return;
    }

    fetch('http://127.0.0.1:8000/api/password-strength', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
      .then(res => res.json())
      .then(data => setAnalysis(data))
      .catch(err => console.error("Error analyzing password:", err));
  }, [password]);

  const getProgressColor = () => {
    if (analysis.score <= 2) return '#f43f5e'; // Weak (red)
    if (analysis.score <= 4) return '#f59e0b'; // Medium (amber)
    return '#10b981';                          // Strong (green)
  };

  const getBadgeClass = () => {
    if (analysis.score <= 2) return 'badge-weak';
    if (analysis.score <= 4) return 'badge-medium';
    return 'badge-strong';
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div className="cyber-card">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '0.65rem', borderRadius: '12px', color: '#06b6d4' }}>
            <Shield size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc' }}>
              Password Strength Checker
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Evaluates password entropy based on length, letter case, digits, and special characters.
            </p>
          </div>
        </div>

        {/* Input Field with Show/Hide Toggle */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            Enter Password to Evaluate:
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your password here..."
              className="cyber-input"
              style={{ paddingRight: '3rem' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '0.25rem'
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Strength Rating & Meter */}
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.6)', 
          border: '1px solid rgba(56, 189, 248, 0.1)', 
          borderRadius: '12px', 
          padding: '1.25rem',
          marginBottom: '1.5rem' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: 600, color: '#cbd5e1' }}>Overall Strength Score:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
                {analysis.score} / 5
              </span>
              <span className={getBadgeClass()}>
                {analysis.rating}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '10px',
            background: 'rgba(30, 41, 59, 0.8)',
            borderRadius: '5px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(analysis.score / 5) * 100}%`,
              height: '100%',
              background: getProgressColor(),
              transition: 'all 0.3s ease'
            }} />
          </div>
        </div>

        {/* Password Analysis Checklist */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#f8fafc', marginBottom: '0.85rem' }}>
            Password Criteria Breakdown
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {[
              { key: 'length', label: 'Length >= 8 Characters' },
              { key: 'uppercase', label: 'Uppercase Letter (A-Z)' },
              { key: 'lowercase', label: 'Lowercase Letter (a-z)' },
              { key: 'number', label: 'Numeric Digit (0-9)' },
              { key: 'special', label: 'Special Character (!@#$)' }
            ].map((criterion) => {
              const isPassed = analysis.checks[criterion.key];
              return (
                <div
                  key={criterion.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: isPassed ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)',
                    border: `1px solid ${isPassed ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.25)'}`,
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    color: isPassed ? '#6ee7b7' : '#fda4af'
                  }}
                >
                  {isPassed ? <Check size={18} color="#10b981" /> : <X size={18} color="#f43f5e" />}
                  <span>{criterion.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Suggestions List */}
        {analysis.suggestions && analysis.suggestions.length > 0 && (
          <div style={{
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: '12px',
            padding: '1rem 1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fde047', fontWeight: 600, fontSize: '0.92rem', marginBottom: '0.5rem' }}>
              <AlertCircle size={18} />
              <span>Security Suggestions to Improve Strength:</span>
            </div>
            <ul style={{ paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.88rem', lineHeight: '1.6' }}>
              {analysis.suggestions.map((sugg, idx) => (
                <li key={idx}>{sugg}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordStrength;
