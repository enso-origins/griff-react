import { Domain } from '../external';
/**
 * Provide a placeholder domain so callers can detect unresolved domains while
 * still operating on a valid tuple.
 */
export declare const placeholder: (min: number, max: number) => Domain;
