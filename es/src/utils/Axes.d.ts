import { Domain } from '../external';
/**
 * We only currently recognize three dimensions: time, x, and y.
 */
export type DomainDimension = 'time' | 'x' | 'y';
export interface Domains {
    time: Domain;
    x: Domain;
    y: Domain;
}
/**
 * A {@code Dimension} is a function which is linked to a particular axis of
 * measurement, like time. This function takes in an {@code Domains}
 * and spits out the Domain (or {@code [0, 0]} if there isn't one).
 */
export interface Dimension extends Function {
    (input: Domains): Domain;
    toString: () => string;
}
declare const AXES: {
    time: Dimension;
    x: Dimension;
    y: Dimension;
    HORIZONTAL: Dimension[];
    VERTICAL: Dimension[];
    ALL: Dimension[];
};
export default AXES;
