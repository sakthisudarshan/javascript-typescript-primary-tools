/**
 * Sample JavaScript file with deliberate lint violations:
 * - no-var (use of var)
 * - no-unused-vars (unused variables)
 * - no-constant-condition (while(true))
 * - no-debugger (debugger statement)
 * - eqeqeq (loose equality ==)
 * - no-unreachable (dead code after return)
 */

var legacyGlobalCounter = 0; // violation: no-var
const unusedConfigSetting = "strict_mode"; // violation: no-unused-vars
let tempCalculation = 100; // violation: no-unused-vars

function processTransaction(amount, currency) {
    var discountRate = 0.05; // violation: no-var, no-unused-vars
    
    if (amount == 0) { // violation: eqeqeq
        return "FREE";
    }

    if (true) { // violation: no-constant-condition
        debugger; // violation: no-debugger
        return amount * 1.18;
    }

    const deadCodeResult = amount * 2; // violation: no-unreachable, no-unused-vars
    return deadCodeResult;
}

module.exports = { processTransaction };
