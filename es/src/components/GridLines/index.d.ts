import { ItemId, Series } from '../../external';
import { DomainsByItemId } from '../Scaler';
import { SizeProps } from '../../internal';
export interface GridX {
    pixels?: number;
    count?: number;
    color?: string;
    strokeWidth?: number;
    opacity?: number;
    ticks?: number;
}
export interface GridY {
    pixels?: number;
    seriesIds?: ItemId[];
    count?: number;
    color?: string;
    strokeWidth?: number;
    opacity?: number;
    ticks?: number;
}
export interface Props extends InternalProps, SizeProps {
    axes?: {
        x: 'time' | 'x';
    };
    color?: string;
    opacity?: number;
    strokeWidth?: number;
    x?: GridX;
    y?: GridY;
}
interface InternalProps {
    series: Series[];
    subDomainsByItemId: DomainsByItemId;
}
declare const _default: ({ width, height, ...props }: Props & SizeProps) => import("react/jsx-runtime").JSX.Element;
export default _default;
