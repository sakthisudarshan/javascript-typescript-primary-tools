/**
 * Complex JavaScript function with high Cyclomatic Complexity (McCabe > 15)
 * Contains nested conditionals, switch cases, and loops to trigger Lizard complexity metrics.
 */

function calculateComplexRiskScore(user, transaction, history, environment) {
    let score = 0;
    
    if (!user || !transaction) {
        return -1;
    }

    if (user.isVerified) {
        score += 10;
        if (user.kycTier === 'TIER_1') {
            score += 5;
        } else if (user.kycTier === 'TIER_2') {
            score += 15;
            if (user.hasTwoFactor) {
                score += 10;
            }
        } else if (user.kycTier === 'TIER_3') {
            score += 25;
        } else {
            score -= 10;
        }
    } else {
        score -= 50;
        if (transaction.amount > 1000) {
            score -= 20;
        }
    }

    switch (transaction.type) {
        case 'WIRE':
            score -= 10;
            if (transaction.isInternational) {
                score -= 30;
            }
            break;
        case 'CRYPTO':
            score -= 40;
            if (transaction.networkFee > 50) {
                score -= 5;
            }
            break;
        case 'ACH':
            score += 5;
            break;
        case 'CREDIT_CARD':
            if (transaction.cardCountry !== user.country) {
                score -= 25;
            }
            break;
        default:
            score -= 15;
            break;
    }

    if (history && history.pastFailures) {
        for (let i = 0; i < history.pastFailures.length; i++) {
            let failure = history.pastFailures[i];
            if (failure.severity === 'HIGH' && failure.daysAgo < 30) {
                score -= 30;
            } else if (failure.severity === 'MEDIUM' && failure.daysAgo < 14) {
                score -= 15;
            } else if (failure.severity === 'LOW') {
                score -= 5;
            }
        }
    }

    while (score > 100 || score < -100) {
        if (score > 100) {
            score = 100;
        } else {
            score = -100;
        }
    }

    return score;
}

module.exports = { calculateComplexRiskScore };
