import React from 'react';
import { Datapoint, PointRenderer, AccessorFunction } from '../../external';
import { ScalerFunction } from '../../utils/scale-helpers';
export interface Props {
    drawPoints?: boolean | PointRenderer;
    color?: string;
    opacity?: number;
    opacityAccessor?: AccessorFunction;
    pointFilter?: (d: Datapoint, i: number, arr: Datapoint[]) => boolean;
    pointWidth?: number;
    pointWidthAccessor?: AccessorFunction;
    strokeWidth?: number;
    data: Datapoint[];
    xAccessor: AccessorFunction;
    x0Accessor?: AccessorFunction;
    x1Accessor?: AccessorFunction;
    yAccessor: AccessorFunction;
    y0Accessor?: AccessorFunction;
    y1Accessor?: AccessorFunction;
    xScale: ScalerFunction;
    yScale: ScalerFunction;
}
declare const Points: React.FC<Props>;
export default Points;
