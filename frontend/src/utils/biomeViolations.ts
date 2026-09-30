/**
 * Sample TypeScript file containing deliberate violations targeted for Biome:
 * - style/noVar (use of var)
 * - correctness/noUnusedVariables (unused variable and param)
 * - suspicious/noDoubleEquals (use of == instead of ===)
 * - suspicious/noDebugger (debugger statement)
 * - style/useConst (let that is never reassigned)
 */

var globalSeed: number = 42; // style/noVar, correctness/noUnusedVariables

export function computeMetrics(inputA: number, inputB: number, unusedParam: string): number {
  let unmutatedMultiplier = 1.5; // style/useConst

  if (inputA == 0) { // suspicious/noDoubleEquals
    debugger; // suspicious/noDebugger
    return 0;
  }

  let deadVariable = 999; // correctness/noUnusedVariables

  return inputA * inputB * unmutatedMultiplier;
}
