import { AxisPlacement as AxisPlacementType } from '../AxisPlacement';
import { DomainsByItemId } from '../Scaler';
import { Series } from '../../external';
export interface Props extends ScalerProps {
    axis: 'time' | 'x';
    placement: AxisPlacementType;
    scaled: boolean;
    stroke: string;
    tickFormatter: TickFormatter;
    ticks: number;
    height: number;
    width?: number;
}
interface ScalerProps {
    domainsByItemId: DomainsByItemId;
    subDomainsByItemId: DomainsByItemId;
    series: Series[];
}
export type TickFormatter = (value: number, values: number[]) => string;
declare const _default: (props: Props) => import("react/jsx-runtime").JSX.Element;
export default _default;
