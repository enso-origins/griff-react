import React from 'react';
import { ItemId } from '../../external';
export interface RulerConfig {
    visible: boolean;
    timeLabel: (data: RulerPoint) => string;
    yLabel: (data: RulerPoint) => string;
    getTimeLabelPosition?: (defaultPosition: number, measurements: {
        height: number;
        labelHeight: number;
        timeLabelMargin: number;
    }) => number;
}
export interface RulerPoint {
    id?: ItemId;
    name: string;
    color: string;
    timestamp: number;
    value: number | string;
    x: number;
    y: number;
}
export interface Props {
    chartWidth: number;
    chartHeight: number;
    points: RulerPoint[];
    ruler: RulerConfig;
}
declare const Ruler: React.FunctionComponent<Props>;
export default Ruler;
