/**
 * TypeScript Order Processing Engine with high Cyclomatic Complexity.
 * Triggers Lizard complexity warnings on TypeScript code.
 */

export interface OrderItem {
  id: string;
  category: string;
  unitPrice: number;
  quantity: number;
  inStock: boolean;
}

export interface Customer {
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'VIP';
  isBlacklisted: boolean;
  creditScore: number;
  taxExempt: boolean;
}

export function processComplexOrder(
  items: OrderItem[],
  customer: Customer,
  destinationCountry: string,
  couponCode?: string
): number {
  let finalTotal = 0;

  if (!items || items.length === 0) {
    return 0;
  }

  if (customer.isBlacklisted) {
    return -1;
  }

  for (const item of items) {
    if (!item.inStock) {
      continue;
    }

    let itemPrice = item.unitPrice * item.quantity;

    if (item.category === 'LUXURY') {
      if (destinationCountry === 'US') {
        itemPrice *= 1.10;
      } else if (destinationCountry === 'EU') {
        itemPrice *= 1.20;
      } else if (destinationCountry === 'UK') {
        itemPrice *= 1.15;
      } else {
        itemPrice *= 1.05;
      }
    } else if (item.category === 'ESSENTIAL') {
      if (!customer.taxExempt) {
        itemPrice *= 1.02;
      }
    }

    finalTotal += itemPrice;
  }

  switch (customer.tier) {
    case 'VIP':
      finalTotal *= 0.80;
      if (finalTotal > 1000) {
        finalTotal -= 50;
      }
      break;
    case 'GOLD':
      finalTotal *= 0.88;
      if (customer.creditScore > 750) {
        finalTotal -= 20;
      }
      break;
    case 'SILVER':
      finalTotal *= 0.95;
      break;
    case 'BRONZE':
    default:
      if (customer.creditScore < 500) {
        finalTotal += 15;
      }
      break;
  }

  if (couponCode) {
    if (couponCode === 'SAVE50' && finalTotal > 200) {
      finalTotal -= 50;
    } else if (couponCode === 'HALF' && customer.tier === 'VIP') {
      finalTotal *= 0.5;
    } else {
      finalTotal -= 5;
    }
  }

  return finalTotal < 0 ? 0 : Math.round(finalTotal * 100) / 100;
}
