/**
 * Backend Discount Service with high Cognitive Complexity.
 * Triggers sonarjs/cognitive-complexity rule due to deeply nested control flow,
 * nested loops, boolean operators within conditions, and nested branching.
 */

function evaluateOrderDiscount(order, customer, promotions, storeConfig) {
    let finalDiscount = 0;

    if (order && order.items && order.items.length > 0) { // +1
        if (customer && customer.membershipStatus) { // +2 (nesting = 1)
            if (customer.membershipStatus === 'PLATINUM') { // +3 (nesting = 2)
                finalDiscount += 0.20;
                for (let i = 0; i < order.items.length; i++) { // +4 (nesting = 3)
                    const item = order.items[i];
                    if (item.category === 'ELECTRONICS' && (item.isClearance || item.stock < 5)) { // +5 (nesting = 4, +1 boolean)
                        finalDiscount += 0.05;
                    } else if (item.category === 'FASHION') { // +1
                        finalDiscount += 0.02;
                    }
                }
            } else if (customer.membershipStatus === 'GOLD') { // +1
                finalDiscount += 0.10;
                if (order.total > 500) { // +3 (nesting = 2)
                    finalDiscount += 0.05;
                }
            } else {
                finalDiscount += 0.02;
            }
        }

        if (promotions && promotions.length > 0) { // +1
            for (const promo of promotions) { // +2 (nesting = 1)
                if (promo.isActive && (!promo.expiresAt || new Date(promo.expiresAt) > new Date())) { // +3 (nesting = 2, +1 boolean)
                    if (promo.type === 'FLASH_SALE') { // +4 (nesting = 3)
                        finalDiscount += promo.percentage || 0;
                    }
                }
            }
        }
    } else {
        return 0;
    }

    const config = storeConfig || { maxDiscountCap: 0.5 };
    return finalDiscount > config.maxDiscountCap ? config.maxDiscountCap : finalDiscount;
}

module.exports = { evaluateOrderDiscount };
