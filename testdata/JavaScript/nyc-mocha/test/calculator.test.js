const assert = require('assert');
const { calculateTaxAndDiscount } = require('../src/calculator');

describe('calculateTaxAndDiscount Tests', () => {
    it('should calculate tax for INDIVIDUAL customer without coupon', () => {
        const result = calculateTaxAndDiscount(100, 'INDIVIDUAL', false);
        assert.strictEqual(result.tax, 8);
        assert.strictEqual(result.discount, 0);
        assert.strictEqual(result.netTotal, 108);
    });

    it('should calculate tax for BUSINESS customer with coupon', () => {
        const result = calculateTaxAndDiscount(200, 'BUSINESS', true);
        assert.strictEqual(result.tax, 30);
        assert.strictEqual(result.discount, 20);
        assert.strictEqual(result.netTotal, 210);
    });
});
