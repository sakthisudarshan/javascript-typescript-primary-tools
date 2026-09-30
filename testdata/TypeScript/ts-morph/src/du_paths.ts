/**
 * TypeScript source file with deliberate Definition-Use (DU) pairs:
 * - Variable definitions (Def)
 * - Computational uses (C-Use): mathematical or assignment operations
 * - Predicate uses (P-Use): boolean conditions in control flow
 * - Dead/unreferenced definitions: defined but never used
 */

export function analyzeFinancialTrajectory(principal: number, interestRate: number, years: number): number {
    let accumulatedBalance = principal; // Def 1
    let deadAuditTracker = "INITIALIZED"; // Def 2 (Dead definition - never used)
    let compoundMultiplier = 1 + interestRate; // Def 3 (C-Use of interestRate)

    if (principal > 10000) { // P-Use of principal
        let bonusTierRate = 0.02; // Def 4
        compoundMultiplier += bonusTierRate; // C-Use of compoundMultiplier & bonusTierRate
    }

    for (let currentYear = 1; currentYear <= years; currentYear++) { // Def 5 (currentYear), P-Use (currentYear <= years), C-Use (currentYear++)
        accumulatedBalance *= compoundMultiplier; // C-Use of accumulatedBalance & compoundMultiplier
        
        if (accumulatedBalance > 1000000) { // P-Use of accumulatedBalance
            let taxWithholding = accumulatedBalance * 0.15; // Def 6 (C-Use of accumulatedBalance)
            accumulatedBalance -= taxWithholding; // C-Use of accumulatedBalance & taxWithholding
            break;
        }
    }

    return accumulatedBalance; // C-Use of accumulatedBalance
}
