import React from 'react';
export interface Position {
    xpos: number;
    ypos: number;
}
export interface Props {
    id: string;
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
    color?: string;
    opacity?: number;
}
declare const Area: React.FunctionComponent<Props>;
export default Area;
