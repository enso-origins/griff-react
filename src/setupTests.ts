import '@testing-library/jest-dom';

// ResizeObserver is not available in jsdom; provide a no-op mock.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).ResizeObserver = class {
  // eslint-disable-next-line class-methods-use-this
  observe() {}

  // eslint-disable-next-line class-methods-use-this
  unobserve() {}

  // eslint-disable-next-line class-methods-use-this
  disconnect() {}
};
