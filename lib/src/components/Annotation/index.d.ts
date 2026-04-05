import React from 'react';
import { ItemId } from '../../external';
import { ScalerFunction } from '../../utils/scale-helpers';
export interface Props {
    /** Two timestamps representing the bounds of this annotation. */
    data: [number, number];
    xScale: ScalerFunction;
    height: number;
    color?: string;
    fillOpacity?: number;
    id: ItemId;
}
declare const Annotation: React.FC<Props>;
export default Annotation;
