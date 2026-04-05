import { ScalerFunction } from '../../utils/scale-helpers';
import { Dimension } from '../../utils/Axes';
import { Series } from '../../external';
import { DomainsByItemId } from '../Scaler';
export interface Props extends InternalProps {
    width: number;
    height: number;
    xAxis: Dimension;
    pointWidth?: number;
    scaleX?: boolean;
    yScalerFactory?: (series: Series, height: number) => ScalerFunction;
}
interface InternalProps {
    series?: Series[];
    domainsByItemId: DomainsByItemId;
    subDomainsByItemId: DomainsByItemId;
}
declare const _default: (props: Props) => import("react/jsx-runtime").JSX.Element;
export default _default;
