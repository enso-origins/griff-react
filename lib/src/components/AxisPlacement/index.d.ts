/** Control how an axis is placed on the screen. */
export interface AxisPlacement {
    id: number;
    name: string;
    toString: () => string;
}
declare const AXIS_PLACEMENTS: {
    UNSPECIFIED: AxisPlacement;
    RIGHT: AxisPlacement;
    LEFT: AxisPlacement;
    BOTH: AxisPlacement;
    BOTTOM: AxisPlacement;
    TOP: AxisPlacement;
};
export default AXIS_PLACEMENTS;
