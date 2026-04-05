declare namespace _default {
    let title: string;
    let decorators: ((story: any) => import("react/jsx-runtime").JSX.Element)[];
}
export default _default;
export function basic(): import("react/jsx-runtime").JSX.Element;
export function controlledByContextChart(): import("react/jsx-runtime").JSX.Element;
export namespace controlledByContextChart {
    namespace story {
        let name: string;
    }
}
export function interactingWithContextChart(): import("react/jsx-runtime").JSX.Element;
export namespace interactingWithContextChart {
    export namespace story_1 {
        let name_1: string;
        export { name_1 as name };
    }
    export { story_1 as story };
}
