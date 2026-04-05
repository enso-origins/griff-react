export default CollapsedAxis;
declare function CollapsedAxis({ height, width, offsetx: initialOffsetX, color, onMouseEnter, onMouseLeave, yAxisPlacement, }: {
    height: any;
    width: any;
    offsetx: any;
    color: any;
    onMouseEnter: any;
    onMouseLeave: any;
    yAxisPlacement: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace CollapsedAxis {
    export { propTypes };
    export { defaultProps };
}
declare namespace propTypes {
    let height: PropTypes.Validator<number>;
    let width: PropTypes.Validator<number>;
    let offsetx: PropTypes.Requireable<number>;
    let color: PropTypes.Requireable<string>;
    let onMouseEnter: PropTypes.Requireable<(...args: any[]) => any>;
    let onMouseLeave: PropTypes.Requireable<(...args: any[]) => any>;
    let yAxisPlacement: PropTypes.Requireable<import("components/AxisPlacement").AxisPlacement>;
}
declare namespace defaultProps {
    let color_1: string;
    export { color_1 as color };
    let offsetx_1: number;
    export { offsetx_1 as offsetx };
    let onMouseEnter_1: any;
    export { onMouseEnter_1 as onMouseEnter };
    let onMouseLeave_1: any;
    export { onMouseLeave_1 as onMouseLeave };
    let yAxisPlacement_1: import("components/AxisPlacement").AxisPlacement;
    export { yAxisPlacement_1 as yAxisPlacement };
}
import PropTypes from 'prop-types';
