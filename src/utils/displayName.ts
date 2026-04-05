export function withDisplayName<T extends React.ComponentType<any>>(
  displayName: string,
  Component: T
): T {
  return Object.assign(Component, { displayName });
}
