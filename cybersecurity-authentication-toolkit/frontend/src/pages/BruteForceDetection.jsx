import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Server, Search, CheckCircle2 } from 'lucide-react';

const BruteForceDetection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/api/brute-force')
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Brute force analysis failed:", err);
        setLoading(false);
      });
  };

  return (
    <div style={{ maxWidth: '950px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <div className="cyber-card">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '0.65rem', borderRadius: '12px', color: '#f59e0b' }}>
            <ShieldAlert size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f8fafc' }}>
              Brute Force Attack Detection
            </h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Analyze login attempts and identify IP addresses with 3 or more failed login attempts.
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
          <Search size={18} /> {loading ? 'Analyzing Authentication Logs...' : 'Analyze Login Attempts'}
        </button>

        {data && (
          <div>
            {/* Statistics Summary Row */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1rem', 
              marginBottom: '1.75rem' 
            }}>
              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.15)' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>Total Login Attempts</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.2rem' }}>
                  {data.total_attempts}
                </div>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.15)' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>Total Failed Attempts</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f59e0b', marginTop: '0.2rem' }}>
                  {data.total_failed_attempts}
                </div>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>Suspicious IP Addresses</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f43f5e', marginTop: '0.2rem' }}>
                  {data.suspicious_ip_count}
                </div>
              </div>
            </div>

            {/* Results Table */}
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '0.75rem' }}>
              Log Analysis Breakdown per IP
            </h3>
            <div style={{ overflowX: 'auto', marginBottom: '1.75rem' }}>
              <table className="cyber-table">
                <thead>
                  <tr>
                    <th>IP Address</th>
                    <th>Failed Attempts</th>
                    <th>Threshold Rule</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.table_data.map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#38bdf8' }}>
                        {row.ip}
                      </td>
                      <td style={{ fontWeight: 700 }}>{row.failed_attempts}</td>
                      <td style={{ color: '#94a3b8', fontSize: '0.85rem' }}>&ge; {data.threshold} failures</td>
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
                  <AlertTriangle size={20} /> Security Threat Alerts Generated
                </h3>
                {data.alerts.map((alert, idx) => (
                  <div key={idx} className="alert-box" style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fda4af', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.4rem' }}>
                      <AlertTriangle size={20} color="#f43f5e" />
                      <span>⚠ SECURITY ALERT</span>
                    </div>
                    <p style={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                      Possible brute-force attack detected.
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
                      <span>IP Address: <strong style={{ color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>{alert.ip}</strong></span>
                      <span>Failed Attempts: <strong style={{ color: '#f43f5e' }}>{alert.failed_attempts}</strong></span>
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

export default BruteForceDetection;
