const express = require('express');
const cors = require('cors');
const { calculateComplexRiskScore } = require('./controllers/riskController');
const { formatAndAuditUserProfile } = require('./services/userService');
const { evaluateOrderDiscount } = require('./services/discountService');
const { calculateTaxAndDiscount } = require('./utils/calculator');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        service: 'backend-api',
        runtime: 'Node.js',
        version: process.version,
        timestamp: new Date().toISOString()
    });
});

app.post('/api/risk/evaluate', (req, res) => {
    const { user, transaction, history, environment } = req.body;
    const score = calculateComplexRiskScore(user, transaction, history, environment);
    res.json({ riskScore: score, status: score > 50 ? 'LOW_RISK' : 'HIGH_RISK' });
});

app.post('/api/users/audit', (req, res) => {
    const { user } = req.body;
    const log = [];
    const auditRecord = formatAndAuditUserProfile(user, log);
    res.json({ auditRecord, log });
});

app.post('/api/discounts/calculate', (req, res) => {
    const { order, customer, promotions, storeConfig } = req.body;
    const discount = evaluateOrderDiscount(order, customer, promotions, storeConfig || { maxDiscountCap: 0.5 });
    res.json({ discount });
});

app.post('/api/orders/tax', (req, res) => {
    const { amount, customerType, hasCoupon } = req.body;
    const result = calculateTaxAndDiscount(amount, customerType, hasCoupon);
    res.json(result);
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Backend server listening on port ${PORT}`);
    });
}

module.exports = app;
