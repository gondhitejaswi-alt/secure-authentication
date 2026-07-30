import React, { useEffect, useState } from 'react';
import { 
  KeyRound, 
  Lock, 
  Zap, 
  ShieldAlert, 
  Target, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle,
  Server,
  Layers
} from 'lucide-react';

const Dashboard = ({ setActiveTab }) => {
  const [stats, setStats] = useState({
    security_modules_count: 5,
    failed_attempt_threshold: 3,
    detected_suspicious_ips: 2,
    possible_password_guessing_attacks: 1
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/dashboard-stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Could not fetch backend stats:", err));
  }, []);

  const modules = [
    {
      id: 'strength',
      title: 'Password Strength Checker',
      icon: KeyRound,
      emoji: '🔐',
      description: 'Evaluate password security entropy based on length, complexity, and special character variety.',
      color: '#06b6d4'
    },
    {
      id: 'lockout',
      title: 'Login Lockout Simulator',
      icon: Lock,
      emoji: '🔒',
      description: 'Simulate account protection mechanisms against repeated failed authentication logins.',
      color: '#3b82f6'
    },
    {
      id: 'generator',
      title: 'Secure Password Generator',
      icon: Zap,
      emoji: '⚡',
      description: 'Generate cryptographically secure high-entropy passwords using Python secrets.',
      color: '#10b981'
    },
    {
      id: 'bruteforce',
      title: 'Brute Force Detection',
      icon: ShieldAlert,
      emoji: '🛡️',
      description: 'Detect suspicious IP addresses originating 3 or more failed login attempts.',
      color: '#f59e0b'
    },
    {
      id: 'guessing',
      title: 'Password Guessing Detection',
      icon: Target,
      emoji: '🎯',
      description: 'Detect targeted password guessing and dictionary attacks against specific user accounts.',
      color: '#f43f5e'
    }
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          background: 'rgba(6, 182, 212, 0.1)', 
          border: '1px solid rgba(6, 182, 212, 0.3)',
          padding: '0.4rem 1rem',
          borderRadius: '30px',
          color: '#38bdf8',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '1rem'
        }}>
          <ShieldCheck size={16} /> FastAPI & React Authentication Security Suite
        </div>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 800, 
          letterSpacing: '-0.02em',
          marginBottom: '0.75rem',
          background: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Cybersecurity Authentication Toolkit
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto' }}>
          A Python-based cybersecurity toolkit for authentication security and attack detection.
        </p>
      </div>

      {/* Live Statistics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '1.25rem', 
        marginBottom: '3rem' 
      }}>
        <div className="cyber-card" style={{ padding: '1.25rem', borderLeft: '4px solid #06b6d4' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Security Modules</span>
            <Layers size={20} color="#06b6d4" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.5rem' }}>
            {stats.security_modules_count}
          </div>
          <div style={{ color: '#06b6d4', fontSize: '0.8rem', marginTop: '0.2rem' }}>Full assignment coverage</div>
        </div>

        <div className="cyber-card" style={{ padding: '1.25rem', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Lockout Threshold</span>
            <Lock size={20} color="#3b82f6" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.5rem' }}>
            {stats.failed_attempt_threshold}
          </div>
          <div style={{ color: '#3b82f6', fontSize: '0.8rem', marginTop: '0.2rem' }}>Max failed attempts allowed</div>
        </div>

        <div className="cyber-card" style={{ padding: '1.25rem', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Detected Suspicious IPs</span>
            <Server size={20} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.5rem' }}>
            {stats.detected_suspicious_ips}
          </div>
          <div style={{ color: '#f59e0b', fontSize: '0.8rem', marginTop: '0.2rem' }}>Flagged IP origins</div>
        </div>

        <div className="cyber-card" style={{ padding: '1.25rem', borderLeft: '4px solid #f43f5e' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Targeted Accounts</span>
            <AlertTriangle size={20} color="#f43f5e" />
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f8fafc', marginTop: '0.5rem' }}>
            {stats.possible_password_guessing_attacks}
          </div>
          <div style={{ color: '#f43f5e', fontSize: '0.8rem', marginTop: '0.2rem' }}>Dictionary attack alerts</div>
        </div>
      </div>

      {/* 5 Module Cards Grid */}
      <h2 style={{ 
        fontSize: '1.35rem', 
        fontWeight: 700, 
        marginBottom: '1.5rem', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem' 
      }}>
        Interactive Security Modules
      </h2>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <div key={mod.id} className="cyber-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{
                    background: `rgba(${mod.color === '#06b6d4' ? '6, 182, 212' : mod.color === '#3b82f6' ? '59, 130, 246' : mod.color === '#10b981' ? '16, 185, 129' : mod.color === '#f59e0b' ? '245, 158, 11' : '244, 63, 94'}, 0.15)`,
                    padding: '0.65rem',
                    borderRadius: '12px',
                    color: mod.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#f8fafc' }}>
                    {mod.emoji} {mod.title}
                  </h3>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                  {mod.description}
                </p>
              </div>

              <button
                onClick={() => setActiveTab(mod.id)}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'space-between' }}
              >
                <span>Open Module</span>
                <ArrowRight size={18} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
