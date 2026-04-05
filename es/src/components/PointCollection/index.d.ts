import { SizeProps } from '../../internal';
import { Series } from '../../external';
import { DomainsByItemId } from '../Scaler';
export interface Props extends InternalProps, SizeProps {
}
interface InternalProps {
    series: Series[];
    subDomainsByItemId: DomainsByItemId;
}
declare const _default: (props: Props & SizeProps) => import("react/jsx-runtime").JSX.Element;
export default _default;
