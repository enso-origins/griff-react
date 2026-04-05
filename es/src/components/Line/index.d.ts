import React from 'react';
import { ScalerFunction } from '../../utils/scale-helpers';
import { AccessorFunction, Datapoint, ItemId } from '../../external';
export interface Props {
    id: ItemId;
    data: Datapoint[];
    xScale: ScalerFunction;
    xAxisAccessor: AccessorFunction;
    yScale: ScalerFunction;
    yAccessor: AccessorFunction;
    y0Accessor?: AccessorFunction;
    y1Accessor?: AccessorFunction;
    color?: string;
    step?: boolean;
    hidden?: boolean;
    drawPoints?: boolean;
    strokeWidth?: number;
    opacity?: number;
    opacityAccessor?: AccessorFunction;
    pointWidth?: number;
    pointWidthAccessor?: AccessorFunction;
    clipPath: string;
}
declare const Line: React.FC<Props>;
export default Line;
