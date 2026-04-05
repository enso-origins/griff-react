import { ValueFunc, LoaderFunc } from './types';
type CreateTrigValueFuncOptions = {
    oscillations?: number;
    yOffset?: number;
    xOffset?: number;
};
export declare const createTrigValueFunc: (trigFunc: (n: number) => number, { oscillations, yOffset, xOffset, }?: CreateTrigValueFuncOptions) => ValueFunc;
type CreateStaticLoaderOptions = {
    pointCount?: number;
    valueFunc?: ValueFunc;
};
export declare const createStaticLoader: ({ pointCount, valueFunc, }?: CreateStaticLoaderOptions) => LoaderFunc;
export {};
