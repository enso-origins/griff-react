import React from 'react';
export interface Props {
    labelHeight?: number;
    color: string;
    label: string;
    x: number;
    y: number;
    chartWidth: number;
    padding?: number;
}
interface State {
    textWidth: number;
    textHeight: number;
}
declare class RulerTooltip extends React.Component<Props, State> {
    state: {
        textWidth: number;
        textHeight: number;
    };
    onTooltipRef: (ref: SVGTextElement) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export default RulerTooltip;
