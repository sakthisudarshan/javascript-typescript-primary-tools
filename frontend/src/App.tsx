import React, { useState, useEffect } from 'react';
import { OrderDashboard } from './components/OrderDashboard';
import { getA } from './components/ComponentA';
import { activeService } from './services/ghostService';

export default function App() {
  const [serverHealth, setServerHealth] = useState<string>('Checking...');
  const [componentResult, setComponentResult] = useState<string>('');

  useEffect(() => {
    fetch('/health')
      .then(res => res.json())
      .then(data => setServerHealth(`${data.service} (${data.status})`))
      .catch(() => setServerHealth('Offline (Dev Mode)'));
    
    // Demonstrate circular reference invocation
    try {
      setComponentResult(getA());
    } catch {
      setComponentResult('Circular module loaded');
    }
  }, []);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid #3b82f6', paddingBottom: '1rem', marginBottom: '2rem' }}>
        <h1 style={{ color: '#1e3a8a', margin: 0 }}>Enterprise White Box Analysis Platform</h1>
        <p style={{ color: '#64748b', margin: '0.5rem 0 0 0' }}>
          TypeScript Frontend Client | Backend Status: <strong>{serverHealth}</strong>
        </p>
      </header>

      <section style={{ marginBottom: '2rem' }}>
        <OrderDashboard />
      </section>

      <footer style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>
        <span>Service state: {activeService()} | Component Graph: {componentResult}</span>
      </footer>
    </div>
  );
}
