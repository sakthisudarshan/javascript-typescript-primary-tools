import { getB } from './ComponentB';

export function getA(): string {
  return 'A' + getB();
}
