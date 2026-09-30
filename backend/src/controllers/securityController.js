/**
 * Sample JavaScript controller with deliberate SAST security vulnerabilities:
 * - eval() with expression
 * - child_process.exec() with user input
 * - ReDoS unsafe regular expression
 * - non-literal require
 * - non-literal fs read
 */

const fs = require('fs');
const cp = require('child_process');

function executeUntrustedOperation(userInput, modulePath, fileName) {
    // 1. detect-eval-with-expression
    const evaluatedResult = eval("calc(" + userInput + ")");

    // 2. detect-child-process
    cp.exec("ping -c 1 " + userInput, (err, stdout) => {
        console.log("Exec output:", stdout);
    });

    // 3. detect-unsafe-regex (Exponential backtracking / ReDoS)
    const unsafeEmailRegex = new RegExp("([a-zA-Z0-9]+)*@([a-zA-Z0-9]+)*\\.com");
    const isMatch = unsafeEmailRegex.test(userInput);

    // 4. detect-non-literal-require
    const dynamicModule = require(modulePath);

    // 5. detect-non-literal-fs-filename
    const fileContent = fs.readFileSync(fileName, 'utf8');

    return { evaluatedResult, isMatch, dynamicModule, fileContent };
}

module.exports = { executeUntrustedOperation };
