import React, { useState } from 'react';
import { Target, AlertTriangle, Search, CheckCircle2, UserCheck } from 'lucide-react';

const PasswordGuessingDetection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/api/password-guessing')
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Password guessing analysis failed:", err);
        setLoading(false);
      });
  };

  return (
    <div style={{ maxWidth: '950px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div className="cyber-card">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', padding: '0.65rem', borderRadius: '12px', color: '#f43f5e' }}>
            <Target size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc' }}>
              Password Guessing Detection
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Detect targeted user accounts subject to dictionary guessing by tracking unique failed password variations.
            </p>
          </div>
        </div>

        {/* Trigger Button */}
        <button
          onClick={handleAnalyze}
          className="btn-primary"
          style={{ width: '100%', marginBottom: '1.75rem' }}
          disabled={loading}
        >
          <Search size={18} /> {loading ? 'Analyzing User Authentication Log Records...' : 'Analyze Login Attempts'}
        </button>

        {data && (
          <div>
            {/* Summary Row */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
              gap: '1rem', 
              marginBottom: '1.75rem' 
            }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.15)' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>Total Records Analyzed</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.2rem' }}>
                  {data.total_records_analyzed}
                </div>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.15)' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>Detection Threshold</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginTop: '0.2rem' }}>
                  &ge; {data.threshold} unique pwds
                </div>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>Flagged Target Accounts</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f43f5e', marginTop: '0.2rem' }}>
                  {data.suspicious_user_count}
                </div>
              </div>
            </div>

            {/* Deduplication Method Note */}
            <div style={{ 
              background: 'rgba(6, 182, 212, 0.08)', 
              border: '1px solid rgba(6, 182, 212, 0.2)', 
              borderRadius: '10px', 
              padding: '0.85rem 1rem', 
              marginBottom: '1.5rem',
              fontSize: '0.88rem',
              color: '#38bdf8'
            }}>
              ℹ️ <strong>Deduplication Policy:</strong> Duplicate failed password attempts are filtered out using Python sets. Only <em>distinct</em> password variations count toward the threshold. Actual passwords are redacted for compliance.
            </div>

            {/* Results Table */}
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.75rem' }}>
              Authentication Analysis per Username
            </h3>
            <div style={{ overflowX: 'auto', marginBottom: '1.75rem' }}>
              <table className="cyber-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Different Passwords Attempted</th>
                    <th>Threshold Rule</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.table_data.map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 700, color: '#f8fafc' }}>
                        {row.username}
                      </td>
                      <td style={{ fontWeight: 700 }}>{row.different_passwords}</td>
                      <td style={{ color: '#94a3b8', fontSize: '0.85rem' }}>&ge; {data.threshold} unique passwords</td>
                      <td>
                        {row.is_suspicious ? (
                          <span className="badge-weak" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                            <AlertTriangle size={14} /> SUSPICIOUS
                          </span>
                        ) : (
                          <span className="badge-strong" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                            <CheckCircle2 size={14} /> NORMAL
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Security Alerts Section */}
            {data.alerts && data.alerts.length > 0 && (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f43f5e', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle size={20} /> Targeted Account Security Alerts
                </h3>
                {data.alerts.map((alert, idx) => (
                  <div key={idx} className="alert-box" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fda4af', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.4rem' }}>
                      <AlertTriangle size={20} color="#f43f5e" />
                      <span>⚠ SECURITY ALERT</span>
                    </div>
                    <p style={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                      Possible password guessing attack detected.
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
                      <span>Targeted Username: <strong style={{ color: '#f8fafc' }}>{alert.username}</strong></span>
                      <span>Different Passwords Attempted: <strong style={{ color: '#f43f5e' }}>{alert.different_passwords}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGuessingDetection;
