/** Control how an axis is rendered on the screen. */
export interface AxisDisplayMode {
    id: string;
    width: (axisWidth: number, numAxes: number) => number;
    toString: () => string;
}
declare const AXIS_DISPLAY_MODES: {
    ALL: AxisDisplayMode;
    NONE: AxisDisplayMode;
    COLLAPSED: AxisDisplayMode;
};
export default AXIS_DISPLAY_MODES;
