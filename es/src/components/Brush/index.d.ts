import React from 'react';
import { Domain } from '../../external';
export type OnUpdateSelection = (domain: Domain) => void;
export interface Props {
    height: number;
    width: number;
    onUpdateSelection: OnUpdateSelection;
    selection: Domain;
    selectionColor?: string;
    outsideColor?: string;
    handleColor?: string;
    handleWidth?: number;
    zoomable?: true;
}
interface State {
    dragStartOverlay?: number;
    dragStartSelection?: number;
    isDraggingHandleEast: boolean;
    isDraggingHandleWest: boolean;
    isDraggingOverlay: boolean;
    isDraggingSelection: boolean;
}
declare class Brush extends React.Component<Props, State> {
    state: State;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onMouseDownOverlay: (e: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
    onMouseDownHandleEast: () => void;
    onMouseDownHandleWest: () => void;
    onMouseDownSelection: (e: React.MouseEvent<SVGRectElement, MouseEvent>) => void;
    onMouseUpSelection: () => void;
    onMouseUp: () => void;
    onMouseMove: (e: React.MouseEvent<SVGAElement, MouseEvent>) => void;
    onUpdateSelection: (selection: Domain) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export default Brush;
