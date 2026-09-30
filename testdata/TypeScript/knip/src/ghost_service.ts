// Active used export
export function activeService(): string {
    return 'active';
}

// Ghost exports / Unreachable code: never imported or referenced
export function ghostDeadFunctionA(): void {
    console.log('Ghost path A');
}

export function ghostDeadFunctionB(): number {
    return 42;
}

export interface UnusedGhostConfig {
    secretKey: string;
    timeoutMs: number;
}
