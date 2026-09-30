import { getB } from './moduleB';

export function getA(): string {
    return 'A' + getB();
}
