/**
 * Calculator module with intentional branch points to demonstrate Statement and Branch coverage.
 */

function calculateTaxAndDiscount(amount, customerType, hasCoupon) {
    let tax = 0;
    let discount = 0;

    // Branch 1: customerType check
    if (customerType === 'BUSINESS') {
        tax = amount * 0.15;
    } else {
        tax = amount * 0.08;
    }

    // Branch 2: hasCoupon check
    if (hasCoupon && amount > 100) {
        discount = amount * 0.10;
    } else {
        discount = 0;
    }

    // Uncovered Branch 3: VIP status check (Never reached by test suite)
    if (customerType === 'VIP_MEMBER') {
        discount += 50;
        tax = 0;
    }

    return {
        netTotal: amount + tax - discount,
        tax,
        discount
    };
}

module.exports = { calculateTaxAndDiscount };
