import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import PasswordStrength from './pages/PasswordStrength';
import LoginLockout from './pages/LoginLockout';
import PasswordGenerator from './pages/PasswordGenerator';
import BruteForceDetection from './pages/BruteForceDetection';
import PasswordGuessingDetection from './pages/PasswordGuessingDetection';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'strength':
        return <PasswordStrength />;
      case 'lockout':
        return <LoginLockout />;
      case 'generator':
        return <PasswordGenerator />;
      case 'bruteforce':
        return <BruteForceDetection />;
      case 'guessing':
        return <PasswordGuessingDetection />;
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main style={{ flex: 1, paddingBottom: '3rem' }}>
        {renderActivePage()}
      </main>

      <footer style={{
        background: 'rgba(9, 13, 22, 0.95)',
        borderTop: '1px solid rgba(56, 189, 248, 0.1)',
        padding: '1.5rem',
        textAlign: 'center',
        color: '#64748b',
        fontSize: '0.85rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          Cybersecurity Authentication Toolkit &bull; Full-Stack React + FastAPI Assignment Project
        </div>
      </footer>
    </div>
  );
}

export default App;
