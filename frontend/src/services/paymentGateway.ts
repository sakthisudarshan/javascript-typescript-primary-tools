export interface PaymentRequest {
  amount: number;
  currency: string;
  method: 'CARD' | 'CRYPTO' | 'BANK_TRANSFER';
  isInstantSettlement: boolean;
  retryCount: number;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  processingFee: number;
  status: 'AUTHORIZED' | 'PENDING' | 'REJECTED';
}

export function processPayment(req: PaymentRequest): PaymentResponse {
  if (req.amount <= 0) {
    return {
      success: false,
      transactionId: 'N/A',
      processingFee: 0,
      status: 'REJECTED'
    };
  }

  let fee = 0.50;

  if (req.method === 'CARD') {
    fee += req.amount * 0.029;
  } else if (req.method === 'CRYPTO') {
    fee += req.amount * 0.015;
  } else {
    fee += 1.00;
  }

  if (req.isInstantSettlement) {
    fee += 2.00;
  }

  // Uncovered branch: retry count > 3 triggers penalty
  if (req.retryCount > 3) {
    return {
      success: false,
      transactionId: 'TX-FAILED-MAX-RETRY',
      processingFee: fee + 5.0,
      status: 'REJECTED'
    };
  }

  return {
    success: true,
    transactionId: `TX-${Date.now()}`,
    processingFee: Math.round(fee * 100) / 100,
    status: 'AUTHORIZED'
  };
}
