import React from 'react';
import { ItemProps } from '../Series';
import { ItemId } from '../../external';
export interface Props extends ItemProps {
    id: ItemId;
}
declare const _default: (props: Props & {
    children: React.ReactNode[];
}) => import("react/jsx-runtime").JSX.Element;
export default _default;
