export const singleSeriePropType: PropTypes.Requireable<PropTypes.InferProps<{
    id: PropTypes.Validator<NonNullable<NonNullable<string | number>>>;
    collectionId: PropTypes.Requireable<NonNullable<string | number>>;
    color: PropTypes.Requireable<string>;
    hidden: PropTypes.Requireable<boolean>;
    opacity: PropTypes.Requireable<number>;
    strokeWidth: PropTypes.Requireable<number>;
    drawPoints: PropTypes.Requireable<NonNullable<boolean | ((...args: any[]) => any)>>;
    /**
     * If unset, this defaults to {@code true} for line charts and {@code false}
     * for scatterplots.
     * This will likely be consolidated into a standardized default in the future.
     */
    drawLines: PropTypes.Requireable<boolean>;
    loader: PropTypes.Requireable<(...args: any[]) => any>;
    step: PropTypes.Requireable<boolean>;
    xAccessor: PropTypes.Requireable<(...args: any[]) => any>;
    x0Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    x1Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    yAccessor: PropTypes.Requireable<(...args: any[]) => any>;
    y0Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    y1Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    yDomain: PropTypes.Requireable<number[]>;
    ySubDomain: PropTypes.Requireable<number[]>;
    yAxisDisplayMode: PropTypes.Requireable<PropTypes.InferProps<{
        id: PropTypes.Validator<string>;
        width: PropTypes.Validator<(...args: any[]) => any>;
    }>>;
}>>;
export const seriesPropType: PropTypes.Requireable<PropTypes.InferProps<{
    id: PropTypes.Validator<NonNullable<NonNullable<string | number>>>;
    collectionId: PropTypes.Requireable<NonNullable<string | number>>;
    color: PropTypes.Requireable<string>;
    hidden: PropTypes.Requireable<boolean>;
    opacity: PropTypes.Requireable<number>;
    strokeWidth: PropTypes.Requireable<number>;
    drawPoints: PropTypes.Requireable<NonNullable<boolean | ((...args: any[]) => any)>>;
    /**
     * If unset, this defaults to {@code true} for line charts and {@code false}
     * for scatterplots.
     * This will likely be consolidated into a standardized default in the future.
     */
    drawLines: PropTypes.Requireable<boolean>;
    loader: PropTypes.Requireable<(...args: any[]) => any>;
    step: PropTypes.Requireable<boolean>;
    xAccessor: PropTypes.Requireable<(...args: any[]) => any>;
    x0Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    x1Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    yAccessor: PropTypes.Requireable<(...args: any[]) => any>;
    y0Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    y1Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    yDomain: PropTypes.Requireable<number[]>;
    ySubDomain: PropTypes.Requireable<number[]>;
    yAxisDisplayMode: PropTypes.Requireable<PropTypes.InferProps<{
        id: PropTypes.Validator<string>;
        width: PropTypes.Validator<(...args: any[]) => any>;
    }>>;
}>[]>;
export const domainPropType: PropTypes.Requireable<number[]>;
export namespace annotationShape {
    let data: PropTypes.Requireable<number[]>;
    let xScale: PropTypes.Requireable<(...args: any[]) => any>;
    let height: PropTypes.Requireable<number>;
    let id: PropTypes.Requireable<number>;
    let color: PropTypes.Requireable<string>;
    let fillOpacity: PropTypes.Requireable<number>;
}
export const annotationPropType: PropTypes.Requireable<PropTypes.InferProps<{
    data: PropTypes.Requireable<number[]>;
    xScale: PropTypes.Requireable<(...args: any[]) => any>;
    height: PropTypes.Requireable<number>;
    id: PropTypes.Requireable<number>;
    color: PropTypes.Requireable<string>;
    fillOpacity: PropTypes.Requireable<number>;
}>>;
export const pointPropType: PropTypes.Requireable<PropTypes.InferProps<{
    id: PropTypes.Requireable<NonNullable<string | number>>;
    name: PropTypes.Validator<string>;
    color: PropTypes.Validator<string>;
    timestamp: PropTypes.Validator<number>;
    value: PropTypes.Requireable<NonNullable<string | number>>;
    x: PropTypes.Validator<number>;
    y: PropTypes.Validator<number>;
}>>;
export const dataPointPropType: PropTypes.Requireable<PropTypes.InferProps<{}>>;
export const rulerPropType: PropTypes.Requireable<PropTypes.InferProps<{
    visible: PropTypes.Requireable<boolean>;
    timeLabel: PropTypes.Validator<(...args: any[]) => any>;
    yLabel: PropTypes.Validator<(...args: any[]) => any>;
    timestamp: PropTypes.Requireable<number>;
    getTimeLabelPosition: PropTypes.Requireable<(...args: any[]) => any>;
}>>;
export const axisDisplayModeType: PropTypes.Requireable<PropTypes.InferProps<{
    width: PropTypes.Validator<(...args: any[]) => any>;
}>>;
export const scalerFactoryFunc: PropTypes.Requireable<(...args: any[]) => any>;
export const accessorFuncPropType: PropTypes.Requireable<(...args: any[]) => any>;
export const scaleFuncPropType: PropTypes.Requireable<(...args: any[]) => any>;
export const coordinatePropType: PropTypes.Requireable<PropTypes.InferProps<{
    xval: PropTypes.Requireable<number>;
    yval: PropTypes.Requireable<number>;
    points: PropTypes.Requireable<PropTypes.InferProps<{
        id: PropTypes.Requireable<NonNullable<string | number>>;
        name: PropTypes.Validator<string>;
        color: PropTypes.Validator<string>;
        timestamp: PropTypes.Validator<number>;
        value: PropTypes.Requireable<NonNullable<string | number>>;
        x: PropTypes.Validator<number>;
        y: PropTypes.Validator<number>;
    }>[]>;
}>>;
export const areaPropType: PropTypes.Requireable<PropTypes.InferProps<{
    id: PropTypes.Requireable<NonNullable<string | number>>;
    seriesId: PropTypes.Requireable<NonNullable<string | number>>;
    color: PropTypes.Requireable<string>;
    xMin: PropTypes.Validator<number>;
    xMax: PropTypes.Validator<number>;
    yMin: PropTypes.Validator<number>;
    yMax: PropTypes.Validator<number>;
}>>;
declare namespace _default {
    export { axisPlacement };
    export { collection };
    export { collections };
    export { contextChart };
    export { drawPoints };
    export { grid };
    export { multipleSeries };
    export { singleSeries };
    export { updateDomains };
    export { domainsByItemId };
    export { domainsByItemId as subDomainsByItemId };
    export { zoomAxes };
    export { axes };
}
export default _default;
import PropTypes from 'prop-types';
declare const axisPlacement: PropTypes.Requireable<import("../components/AxisPlacement").AxisPlacement>;
declare const collection: PropTypes.Requireable<PropTypes.InferProps<{
    id: PropTypes.Validator<NonNullable<NonNullable<string | number>>>;
    color: PropTypes.Requireable<string>;
    /**
     * If unset, this defaults to {@code true} for line charts and {@code false}
     * for scatterplots.
     * This will likely be consolidated into a standardized default in the future.
     */
    drawLines: PropTypes.Requireable<boolean>;
    drawPoints: PropTypes.Requireable<NonNullable<boolean | ((...args: any[]) => any)>>;
    hidden: PropTypes.Requireable<boolean>;
    opacity: PropTypes.Requireable<number>;
    strokeWidth: PropTypes.Requireable<number>;
    xAccessor: PropTypes.Requireable<(...args: any[]) => any>;
    yAxisDisplayMode: PropTypes.Requireable<any>;
    yAccessor: PropTypes.Requireable<(...args: any[]) => any>;
    y0Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    y1Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    yDomain: PropTypes.Requireable<number[]>;
    ySubDomain: PropTypes.Requireable<number[]>;
}>>;
declare const collections: PropTypes.Requireable<PropTypes.InferProps<{
    id: PropTypes.Validator<NonNullable<NonNullable<string | number>>>;
    color: PropTypes.Requireable<string>;
    /**
     * If unset, this defaults to {@code true} for line charts and {@code false}
     * for scatterplots.
     * This will likely be consolidated into a standardized default in the future.
     */
    drawLines: PropTypes.Requireable<boolean>;
    drawPoints: PropTypes.Requireable<NonNullable<boolean | ((...args: any[]) => any)>>;
    hidden: PropTypes.Requireable<boolean>;
    opacity: PropTypes.Requireable<number>;
    strokeWidth: PropTypes.Requireable<number>;
    xAccessor: PropTypes.Requireable<(...args: any[]) => any>;
    yAxisDisplayMode: PropTypes.Requireable<any>;
    yAccessor: PropTypes.Requireable<(...args: any[]) => any>;
    y0Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    y1Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    yDomain: PropTypes.Requireable<number[]>;
    ySubDomain: PropTypes.Requireable<number[]>;
}>[]>;
declare const contextChart: PropTypes.Requireable<PropTypes.InferProps<{
    visible: PropTypes.Requireable<boolean>;
    height: PropTypes.Requireable<number>;
}>>;
/**
 * If a {@code boolean} is passed, then this will enable (or disable) the
 * default rendering.
 * If a {@code function} is passed, then this will be used as the rendering
 * function for rendering the points.
 *
 * @see {@code drawPoints} on {@link DataProvider} for more information.
 */
declare const drawPoints: PropTypes.Requireable<NonNullable<boolean | ((...args: any[]) => any)>>;
declare namespace grid {
    let color_1: PropTypes.Requireable<string>;
    export { color_1 as color };
    export let strokeWidth: PropTypes.Requireable<number>;
    export let opacity: PropTypes.Requireable<number>;
    export let x: PropTypes.Requireable<PropTypes.InferProps<{
        /** Render lines every X pixels */
        pixels: PropTypes.Requireable<number>;
        /**
         * Render this many lines (approximatey). If this is `0`, then the lines
         * will match the tick marks on the x axis.
         */
        count: PropTypes.Requireable<number>;
        /**
         * Color of the lines. If this is not specified, then the top-level color
         * property will be used.
         */
        color: PropTypes.Requireable<string>;
        /**
         * Thickness of the lines. If this is not specified, then the top-level
         * strokeWidth property will be used.
         */
        strokeWidth: PropTypes.Requireable<number>;
        /**
         * Opaccity of the lines. If this is not specified, then the top-level
         * opacity property will be used.
         */
        opacity: PropTypes.Requireable<number>;
    }>>;
    export let y: PropTypes.Requireable<PropTypes.InferProps<{
        /** Render lines every X pixels */
        pixels: PropTypes.Requireable<number>;
        /**
         * The series ID to link these lines to for scaling purposes. This way they
         * will be redrawn the y axis is zoomed, translated, etc.
         */
        seriesId: PropTypes.Requireable<NonNullable<string | number>>;
        /**
         * Render this many lines (approximatey). If this is `0`, then the lines
         * will match the tick marks on the x axis.
         */
        count: PropTypes.Requireable<number>;
        /**
         * Color of the lines. If this is `null` (magic value), and `seriesId`
         * points to a series, then that color will be used. However, if `seriesId`
         * is not set, then the top-level color will be used.
         */
        color: PropTypes.Requireable<string>;
        /**
         * Thickness of the lines. If this is not specified, then the top-level
         * strokeWidth property will be used.
         */
        strokeWidth: PropTypes.Requireable<number>;
        /**
         * Opaccity of the lines. If this is not specified, then the top-level
         * opacity property will be used.
         */
        opacity: PropTypes.Requireable<number>;
    }>>;
}
declare const multipleSeries: PropTypes.Requireable<PropTypes.InferProps<{
    id: PropTypes.Validator<NonNullable<NonNullable<string | number>>>;
    collectionId: PropTypes.Requireable<NonNullable<string | number>>;
    color: PropTypes.Requireable<string>;
    hidden: PropTypes.Requireable<boolean>;
    opacity: PropTypes.Requireable<number>;
    strokeWidth: PropTypes.Requireable<number>;
    drawPoints: PropTypes.Requireable<NonNullable<boolean | ((...args: any[]) => any)>>;
    /**
     * If unset, this defaults to {@code true} for line charts and {@code false}
     * for scatterplots.
     * This will likely be consolidated into a standardized default in the future.
     */
    drawLines: PropTypes.Requireable<boolean>;
    loader: PropTypes.Requireable<(...args: any[]) => any>;
    step: PropTypes.Requireable<boolean>;
    xAccessor: PropTypes.Requireable<(...args: any[]) => any>;
    x0Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    x1Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    yAccessor: PropTypes.Requireable<(...args: any[]) => any>;
    y0Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    y1Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    yDomain: PropTypes.Requireable<number[]>;
    ySubDomain: PropTypes.Requireable<number[]>;
    yAxisDisplayMode: PropTypes.Requireable<PropTypes.InferProps<{
        id: PropTypes.Validator<string>;
        width: PropTypes.Validator<(...args: any[]) => any>;
    }>>;
}>[]>;
declare const singleSeries: PropTypes.Requireable<PropTypes.InferProps<{
    id: PropTypes.Validator<NonNullable<NonNullable<string | number>>>;
    collectionId: PropTypes.Requireable<NonNullable<string | number>>;
    color: PropTypes.Requireable<string>;
    hidden: PropTypes.Requireable<boolean>;
    opacity: PropTypes.Requireable<number>;
    strokeWidth: PropTypes.Requireable<number>;
    drawPoints: PropTypes.Requireable<NonNullable<boolean | ((...args: any[]) => any)>>;
    /**
     * If unset, this defaults to {@code true} for line charts and {@code false}
     * for scatterplots.
     * This will likely be consolidated into a standardized default in the future.
     */
    drawLines: PropTypes.Requireable<boolean>;
    loader: PropTypes.Requireable<(...args: any[]) => any>;
    step: PropTypes.Requireable<boolean>;
    xAccessor: PropTypes.Requireable<(...args: any[]) => any>;
    x0Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    x1Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    yAccessor: PropTypes.Requireable<(...args: any[]) => any>;
    y0Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    y1Accessor: PropTypes.Requireable<(...args: any[]) => any>;
    yDomain: PropTypes.Requireable<number[]>;
    ySubDomain: PropTypes.Requireable<number[]>;
    yAxisDisplayMode: PropTypes.Requireable<PropTypes.InferProps<{
        id: PropTypes.Validator<string>;
        width: PropTypes.Validator<(...args: any[]) => any>;
    }>>;
}>>;
declare const updateDomains: PropTypes.Requireable<(...args: any[]) => any>;
declare const domainsByItemId: PropTypes.Requireable<{
    [x: string]: PropTypes.InferProps<{
        time: PropTypes.Requireable<number[]>;
        x: PropTypes.Requireable<number[]>;
        y: PropTypes.Requireable<number[]>;
    }>;
}>;
declare const zoomAxes: PropTypes.Requireable<PropTypes.InferProps<{
    time: PropTypes.Requireable<boolean>;
    x: PropTypes.Requireable<boolean>;
    y: PropTypes.Requireable<boolean>;
}>>;
declare const axes: PropTypes.Requireable<string>;
