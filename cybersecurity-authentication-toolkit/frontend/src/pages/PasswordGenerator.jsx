import React, { useState } from 'react';
import { Zap, Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSpecial, setUseSpecial] = useState(true);

  const [generatedPassword, setGeneratedPassword] = useState('');
  const [strengthInfo, setStrengthInfo] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setErrorMsg('');
    setCopied(false);

    // Client side quick validation
    const selectedCount = [useUpper, useLower, useDigits, useSpecial].filter(Boolean).length;
    if (selectedCount === 0) {
      setErrorMsg('You must select at least one character category.');
      return;
    }
    if (length < selectedCount) {
      setErrorMsg(`Password length (${length}) is too short for ${selectedCount} selected categories. Minimum required is ${selectedCount}.`);
      return;
    }

    setLoading(true);

    fetch('http://127.0.0.1:8000/api/generate-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        length: parseInt(length, 10),
        use_upper: useUpper,
        use_lower: useLower,
        use_digits: useDigits,
        use_special: useSpecial
      })
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.success) {
          setGeneratedPassword(data.password);
          setStrengthInfo({
            strength: data.strength,
            score: data.score
          });
        } else {
          setErrorMsg(data.error);
        }
      })
      .catch(err => {
        setLoading(false);
        console.error("Password generation failed:", err);
        setErrorMsg("Failed to connect to backend server.");
      });
  };

  const handleCopy = () => {
    if (!generatedPassword) return;
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getBadgeClass = (rating) => {
    if (rating === 'Weak') return 'badge-weak';
    if (rating === 'Medium') return 'badge-medium';
    return 'badge-strong';
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div className="cyber-card">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.65rem', borderRadius: '12px', color: '#10b981' }}>
            <Zap size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc' }}>
              Secure Password Generator
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Uses Python's cryptographically secure <code style={{ color: '#38bdf8' }}>secrets</code> module to build high-entropy passwords.
            </p>
          </div>
        </div>

        {/* Options Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {/* Length Input */}
          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              <span>Password Length:</span>
              <strong style={{ color: '#38bdf8', fontSize: '1.05rem' }}>{length}</strong>
            </label>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              style={{ width: '100%', accentColor: '#06b6d4', cursor: 'pointer', marginBottom: '0.5rem' }}
            />
            <input
              type="number"
              min="1"
              max="128"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cyber-input"
            />
          </div>

          {/* Character Options */}
          <div>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Include Character Categories:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {[
                { state: useUpper, setter: setUseUpper, label: 'Uppercase Letters (A-Z)' },
                { state: useLower, setter: setUseLower, label: 'Lowercase Letters (a-z)' },
                { state: useDigits, setter: setUseDigits, label: 'Numbers (0-9)' },
                { state: useSpecial, setter: setUseSpecial, label: 'Special Characters (!@#$%^&*)' }
              ].map((opt, i) => (
                <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#cbd5e1', cursor: 'pointer', fontSize: '0.9rem' }}>
                  <input
                    type="checkbox"
                    checked={opt.state}
                    onChange={(e) => opt.setter(e.target.checked)}
                    style={{ width: '18px', height: '18px', accentColor: '#06b6d4' }}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="btn-primary"
          style={{ width: '100%', marginBottom: '1.5rem' }}
          disabled={loading}
        >
          <Zap size={18} /> {loading ? 'Generating...' : 'Generate Password'}
        </button>

        {/* Error Alert */}
        {errorMsg && (
          <div style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.4)',
            borderRadius: '12px',
            padding: '1rem',
            color: '#fda4af',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '1.5rem'
          }}>
            <AlertCircle size={20} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Generated Password Card */}
        {generatedPassword && (
          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '12px',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>GENERATED SECURE PASSWORD</span>
              {strengthInfo && (
                <span className={getBadgeClass(strengthInfo.strength)}>
                  {strengthInfo.strength} ({strengthInfo.score}/5)
                </span>
              )}
            </div>

            <div style={{
              background: '#090d16',
              border: '1px dashed rgba(56, 189, 248, 0.3)',
              borderRadius: '10px',
              padding: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '1.25rem',
              color: '#38bdf8',
              wordBreak: 'break-all',
              textAlign: 'center',
              letterSpacing: '0.05em',
              marginBottom: '1.25rem'
            }}>
              {generatedPassword}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleCopy}
                className="btn-primary"
                style={{ flex: 1, background: copied ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '' }}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Password'}</span>
              </button>

              <button
                onClick={handleGenerate}
                className="btn-secondary"
              >
                <RefreshCw size={18} /> Generate Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;
