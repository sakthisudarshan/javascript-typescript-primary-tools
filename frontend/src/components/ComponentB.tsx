import { getA } from './ComponentA';

export function getB(): string {
  return 'B';
}

export function circularReference(): string {
  return getA();
}
