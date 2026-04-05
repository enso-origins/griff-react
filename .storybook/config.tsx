import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { configure, addDecorator } from '@storybook/react';

// Storybook 5 relies on legacy React APIs removed in React 19. Patch them back.
const roots = new Map<Element, ReturnType<typeof createRoot>>();
if (!(ReactDOM as any).render) {
  (ReactDOM as any).render = (
    element: React.ReactElement,
    container: Element,
    callback?: () => void
  ) => {
    let root = roots.get(container);
    if (!root) {
      root = createRoot(container);
      roots.set(container, root);
    }
    root.render(element);
    if (callback) callback();
  };
}
if (!(ReactDOM as any).unmountComponentAtNode) {
  (ReactDOM as any).unmountComponentAtNode = (container: Element) => {
    const root = roots.get(container);
    if (root) {
      root.unmount();
      roots.delete(container);
      return true;
    }
    return false;
  };
}
import { withInfo, setDefaults } from '@storybook/addon-info';

setDefaults({ inline: true, header: false });

addDecorator((story, context) => (
  <div style={{ backgroundColor: '#f3f3f3' }}>
    <div
      style={{
        backgroundColor: '#fff',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '80%',
      }}
    >
      {withInfo()(story)(context)}
    </div>
  </div>
));

configure(
  [
    // This is where demo stories will live -- end-to-end examples.
    require.context('../stories', true, /\.stories\.(tsx|js)$/),
    // Component stories should live next to their implementations.
    require.context('../src', true, /\.stories\.(tsx|js)$/),
  ],
  module
);
