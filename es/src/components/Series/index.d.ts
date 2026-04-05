import { Domain, ItemId, AccessorFunction, PointRenderer } from '../../external';
import { AxisPlacement } from '../AxisPlacement';
import { AxisDisplayMode } from '../../utils/AxisDisplayMode';
type LoaderFunction = (params: any) => any;
export interface ItemProps {
    color?: string;
    drawLines?: boolean;
    drawPoints?: boolean | PointRenderer;
    pointWidth?: number;
    strokeWidth?: number;
    hidden?: boolean;
    loader?: LoaderFunction;
    step?: boolean;
    zoomable?: boolean;
    name?: string;
    timeAccessor?: AccessorFunction;
    xAccessor?: AccessorFunction;
    x0Accessor?: AccessorFunction;
    x1Accessor?: AccessorFunction;
    yAccessor?: AccessorFunction;
    y0Accessor?: AccessorFunction;
    y1Accessor?: AccessorFunction;
    yDomain?: Domain;
    ySubDomain?: Domain;
    yAxisPlacement?: AxisPlacement;
    yAxisDisplayMode?: AxisDisplayMode;
    pointWidthAccessor?: AccessorFunction;
    opacity?: number;
    opacityAccessor?: AccessorFunction;
}
export declare const WATCHED_PROP_NAMES: string[];
export interface Props extends ItemProps {
    id: ItemId;
    collectionId?: ItemId;
}
export type UnregisterSeriesFunction = () => void;
export type RegisterSeriesFunction = (seriesProps: Props) => UnregisterSeriesFunction;
export type UpdateSeriesFunction = (seriesProps: Props) => void;
declare const _default: (props: Props) => import("react/jsx-runtime").JSX.Element;
export default _default;
