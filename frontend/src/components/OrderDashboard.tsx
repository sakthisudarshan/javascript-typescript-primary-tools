import React, { useState } from 'react';
import { processComplexOrder, Customer, OrderItem } from '../utils/complexOrderEngine';
import { processPayment } from '../services/paymentGateway';
import { analyzeFinancialTrajectory } from '../services/financialEngine';

export const OrderDashboard: React.FC = () => {
  const [orderTotal, setOrderTotal] = useState<number | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [projectedBalance, setProjectedBalance] = useState<number | null>(null);

  const handleSimulate = () => {
    const items: OrderItem[] = [
      { id: 'item-1', category: 'LUXURY', unitPrice: 250, quantity: 2, inStock: true },
      { id: 'item-2', category: 'ESSENTIAL', unitPrice: 40, quantity: 5, inStock: true }
    ];
    const customer: Customer = {
      tier: 'VIP',
      isBlacklisted: false,
      creditScore: 800,
      taxExempt: false
    };

    const total = processComplexOrder(items, customer, 'US', 'SAVE50');
    setOrderTotal(total);

    const payment = processPayment({
      amount: total,
      currency: 'USD',
      method: 'CARD',
      isInstantSettlement: true,
      retryCount: 0
    });
    setPaymentStatus(`${payment.status} (Fee: $${payment.processingFee})`);

    const projection = analyzeFinancialTrajectory(total, 0.05, 3);
    setProjectedBalance(Math.round(projection * 100) / 100);
  };

  return (
    <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
      <h2 style={{ color: '#0f172a', marginTop: 0 }}>Simulated Transaction Engine</h2>
      <p style={{ color: '#475569' }}>
        Executes order processing, risk assessment, payment gateway routing, and financial projection.
      </p>

      <button
        onClick={handleSimulate}
        style={{
          background: '#2563eb',
          color: '#ffffff',
          border: 'none',
          padding: '0.6rem 1.2rem',
          borderRadius: '4px',
          fontWeight: 600,
          cursor: 'pointer'
        }}
      >
        Run End-to-End Simulation
      </button>

      {orderTotal !== null && (
        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Computed Order Total</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#16a34a' }}>${orderTotal}</div>
          </div>
          <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Payment Gateway Status</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2563eb' }}>{paymentStatus}</div>
          </div>
          <div style={{ background: '#ffffff', padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>3-Year Trajectory</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#7c3aed' }}>${projectedBalance}</div>
          </div>
        </div>
      )}
    </div>
  );
};
