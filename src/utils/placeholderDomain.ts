import { Domain } from '../external';

/**
 * Provide a placeholder domain so callers can detect unresolved domains while
 * still operating on a valid tuple.
 */
export const placeholder = (min: number, max: number): Domain => {
  const domain: Domain = [min, max];
  domain.placeholder = true;
  return domain;
};
