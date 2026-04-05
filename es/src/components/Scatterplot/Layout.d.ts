export default Layout;
declare function Layout({ chart, xAxis, xAxisPlacement, yAxis, yAxisPlacement }: {
    chart: any;
    xAxis: any;
    xAxisPlacement: any;
    yAxis: any;
    yAxisPlacement: any;
}): import("react/jsx-runtime").JSX.Element;
declare namespace Layout {
    export { propTypes };
    export { defaultProps };
}
declare namespace propTypes {
    let chart: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
    let xAxis: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
    let xAxisPlacement: PropTypes.Requireable<import("components/AxisPlacement").AxisPlacement>;
    let yAxis: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
    let yAxisPlacement: PropTypes.Requireable<import("components/AxisPlacement").AxisPlacement>;
}
declare namespace defaultProps {
    let xAxisPlacement_1: import("components/AxisPlacement").AxisPlacement;
    export { xAxisPlacement_1 as xAxisPlacement };
    let yAxisPlacement_1: import("components/AxisPlacement").AxisPlacement;
    export { yAxisPlacement_1 as yAxisPlacement };
}
import PropTypes from 'prop-types';
