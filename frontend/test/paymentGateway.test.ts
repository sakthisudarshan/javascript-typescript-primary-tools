import { describe, it, expect } from 'vitest';
import { processPayment } from '../src/services/paymentGateway';

describe('Payment Gateway Unit Tests', () => {
  it('should reject payment with amount <= 0', () => {
    const res = processPayment({
      amount: 0,
      currency: 'USD',
      method: 'CARD',
      isInstantSettlement: false,
      retryCount: 0
    });
    expect(res.success).toBe(false);
    expect(res.status).toBe('REJECTED');
  });

  it('should process CARD payment with instant settlement', () => {
    const res = processPayment({
      amount: 100,
      currency: 'USD',
      method: 'CARD',
      isInstantSettlement: true,
      retryCount: 1
    });
    expect(res.success).toBe(true);
    expect(res.status).toBe('AUTHORIZED');
    expect(res.processingFee).toBe(5.4); // 0.5 + 2.9 + 2.0
  });
});
