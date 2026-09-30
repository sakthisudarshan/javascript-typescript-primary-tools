import { getA } from './moduleA';

export function getB(): string {
    return 'B' + (getA ? 'ready' : 'waiting');
}
