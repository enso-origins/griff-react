export default ToggleRenderer;
declare class ToggleRenderer extends React.Component<any, any, any> {
    constructor(props: any);
    constructor(props: any, context: any);
    state: {};
    setProperty: (id: any, key: any, value: any) => () => void;
    getItemOptions: (itemId: any) => {};
    renderToggles: (key: any) => import("react/jsx-runtime").JSX.Element[];
    renderPropertyTable: () => import("react/jsx-runtime").JSX.Element;
    render(): import("react/jsx-runtime").JSX.Element;
}
declare namespace ToggleRenderer {
    namespace propTypes {
        let defaultLoader: PropTypes.Requireable<(...args: any[]) => any>;
        let timeDomain: PropTypes.Requireable<number[]>;
        let collectionIds: PropTypes.Requireable<string[]>;
        let seriesIds: PropTypes.Requireable<string[]>;
    }
    namespace defaultProps {
        export { staticLoader as defaultLoader };
        let timeDomain_1: number[];
        export { timeDomain_1 as timeDomain };
        let collectionIds_1: any[];
        export { collectionIds_1 as collectionIds };
        let seriesIds_1: any[];
        export { seriesIds_1 as seriesIds };
    }
}
import React from 'react';
import PropTypes from 'prop-types';
import { staticLoader } from './loaders';
