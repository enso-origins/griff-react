import React from 'react';
type StoryProps = {
    options: {
        x: number;
    };
};
declare const _default: {
    title: string;
    decorators: ((story: (props: StoryProps) => React.ReactElement | null) => import("react/jsx-runtime").JSX.Element)[];
};
export default _default;
export declare const basic: ({ options: { x } }: StoryProps) => import("react/jsx-runtime").JSX.Element;
export declare const longText: {
    ({ options: { x } }: StoryProps): import("react/jsx-runtime").JSX.Element;
    story: {
        name: string;
    };
};
export declare const hugePadding: {
    ({ options: { x } }: StoryProps): import("react/jsx-runtime").JSX.Element;
    story: {
        name: string;
    };
};
export declare const colors: ({ options: { x } }: StoryProps) => import("react/jsx-runtime").JSX.Element;
