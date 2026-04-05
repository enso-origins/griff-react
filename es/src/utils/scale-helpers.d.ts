import * as d3 from 'd3';
import { Domain } from '../external';
export type ScalerFunction = d3.ScaleContinuousNumeric<number, number>;
export type ScalerFunctionFactory = (domain: Domain, height: number) => void;
export declare const createYScale: (domain: Domain, height: number) => d3.ScaleLinear<number, number>;
export declare const createXScale: (domain: Domain, width: number) => d3.ScaleLinear<number, number>;
