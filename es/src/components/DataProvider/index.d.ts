export function calculateDomainFromData(data: any, accessor: any, minAccessor?: any, maxAccessor?: any): (string | number)[];
declare class DataProvider extends React.Component<any, any, any> {
    constructor(props: any);
    state: {
        timeSubDomain: any;
        timeDomain: any;
        timeSubDomains: {};
        xSubDomains: {};
        ySubDomains: {};
        collectionsById: {};
        seriesById: {};
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): Promise<void>;
    componentWillUnmount(): void;
    getSeriesObjects: () => any[];
    onUpdateInterval: () => void;
    startUpdateInterval: () => void;
    fetchInterval: NodeJS.Timeout;
    fetchData: (id: any, reason: any) => Promise<void>;
    timeSubDomainChanged: (timeSubDomain: any) => void;
    timeSubDomainChangedTimeout: NodeJS.Timeout;
    registerCollection: ({ id, ...collection }: {
        [x: string]: any;
        id: any;
    }) => () => void;
    updateCollection: ({ id, ...collection }: {
        [x: string]: any;
        id: any;
    }) => void;
    registerSeries: ({ id, ...series }: {
        [x: string]: any;
        id: any;
    }) => () => void;
    updateSeries: ({ id, ...series }: {
        [x: string]: any;
        id: any;
    }) => void;
    renderLegacyItems: () => import("react/jsx-runtime").JSX.Element;
    render(): import("react/jsx-runtime").JSX.Element;
}
declare namespace DataProvider {
    namespace propTypes {
        let drawPoints: PropTypes.Requireable<NonNullable<boolean | ((...args: any[]) => any)>>;
        let drawLines: PropTypes.Requireable<boolean>;
        let timeDomain: PropTypes.Requireable<number[]>;
        let timeSubDomain: PropTypes.Requireable<number[]>;
        let xDomain: PropTypes.Requireable<number[]>;
        let xSubDomain: PropTypes.Requireable<number[]>;
        let updateInterval: PropTypes.Requireable<number>;
        let timeAccessor: PropTypes.Requireable<(...args: any[]) => any>;
        let xAccessor: PropTypes.Requireable<(...args: any[]) => any>;
        let x0Accessor: PropTypes.Requireable<(...args: any[]) => any>;
        let x1Accessor: PropTypes.Requireable<(...args: any[]) => any>;
        let yAccessor: PropTypes.Requireable<(...args: any[]) => any>;
        let y0Accessor: PropTypes.Requireable<(...args: any[]) => any>;
        let y1Accessor: PropTypes.Requireable<(...args: any[]) => any>;
        let yAxisWidth: PropTypes.Requireable<number>;
        let yDomain: PropTypes.Requireable<number[]>;
        let ySubDomain: PropTypes.Requireable<number[]>;
        let pointsPerSeries: PropTypes.Requireable<number>;
        let children: PropTypes.Validator<NonNullable<PropTypes.ReactNodeLike>>;
        let defaultLoader: PropTypes.Requireable<(...args: any[]) => any>;
        let onTimeSubDomainChanged: PropTypes.Requireable<(...args: any[]) => any>;
        let onUpdateDomains: PropTypes.Requireable<(...args: any[]) => any>;
        let opacity: PropTypes.Requireable<number>;
        let opacityAccessor: PropTypes.Requireable<(...args: any[]) => any>;
        let pointWidth: PropTypes.Requireable<number>;
        let pointWidthAccessor: PropTypes.Requireable<(...args: any[]) => any>;
        let strokeWidth: PropTypes.Requireable<number>;
        let isTimeSubDomainSticky: PropTypes.Requireable<boolean>;
        let limitTimeSubDomain: PropTypes.Requireable<(...args: any[]) => any>;
        let onFetchData: PropTypes.Requireable<(...args: any[]) => any>;
        let onFetchDataError: PropTypes.Requireable<(...args: any[]) => any>;
        let series: PropTypes.Requireable<PropTypes.InferProps<{
            id: PropTypes.Validator<NonNullable<NonNullable<string | number>>>;
        }>[]>;
        let collections: PropTypes.Requireable<PropTypes.InferProps<{
            id: PropTypes.Validator<NonNullable<NonNullable<string | number>>>;
        }>[]>;
    }
    namespace defaultProps {
        let defaultLoader_1: any;
        export { defaultLoader_1 as defaultLoader };
        let drawPoints_1: any;
        export { drawPoints_1 as drawPoints };
        let drawLines_1: any;
        export { drawLines_1 as drawLines };
        let onTimeSubDomainChanged_1: any;
        export { onTimeSubDomainChanged_1 as onTimeSubDomainChanged };
        let onUpdateDomains_1: any;
        export { onUpdateDomains_1 as onUpdateDomains };
        let opacity_1: number;
        export { opacity_1 as opacity };
        let opacityAccessor_1: any;
        export { opacityAccessor_1 as opacityAccessor };
        let pointsPerSeries_1: number;
        export { pointsPerSeries_1 as pointsPerSeries };
        let pointWidth_1: any;
        export { pointWidth_1 as pointWidth };
        let pointWidthAccessor_1: any;
        export { pointWidthAccessor_1 as pointWidthAccessor };
        let strokeWidth_1: any;
        export { strokeWidth_1 as strokeWidth };
        let timeDomain_1: any;
        export { timeDomain_1 as timeDomain };
        let timeSubDomain_1: any;
        export { timeSubDomain_1 as timeSubDomain };
        let xDomain_1: any;
        export { xDomain_1 as xDomain };
        let xSubDomain_1: any;
        export { xSubDomain_1 as xSubDomain };
        let updateInterval_1: number;
        export { updateInterval_1 as updateInterval };
        export function timeAccessor_1(d: any): any;
        export { timeAccessor_1 as timeAccessor };
        let x0Accessor_1: any;
        export { x0Accessor_1 as x0Accessor };
        let x1Accessor_1: any;
        export { x1Accessor_1 as x1Accessor };
        export function xAccessor_1(d: any): any;
        export { xAccessor_1 as xAccessor };
        let y0Accessor_1: any;
        export { y0Accessor_1 as y0Accessor };
        let y1Accessor_1: any;
        export { y1Accessor_1 as y1Accessor };
        export function yAccessor_1(d: any): any;
        export { yAccessor_1 as yAccessor };
        let yAxisWidth_1: number;
        export { yAxisWidth_1 as yAxisWidth };
        let yDomain_1: any;
        export { yDomain_1 as yDomain };
        let ySubDomain_1: any;
        export { ySubDomain_1 as ySubDomain };
        let isTimeSubDomainSticky_1: boolean;
        export { isTimeSubDomainSticky_1 as isTimeSubDomainSticky };
        export function limitTimeSubDomain_1(xSubDomain: any): any;
        export { limitTimeSubDomain_1 as limitTimeSubDomain };
        export function onFetchData_1(): void;
        export { onFetchData_1 as onFetchData };
        export function onFetchDataError_1(e: any): never;
        export { onFetchDataError_1 as onFetchDataError };
        let series_1: any[];
        export { series_1 as series };
        let collections_1: any[];
        export { collections_1 as collections };
    }
}
export default DataProvider;
import React from 'react';
import PropTypes from 'prop-types';
