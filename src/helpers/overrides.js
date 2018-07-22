// @flow

export type OverrideT<T> =
  | {
      component?: ?React.ComponentType<T>,
      props?: ?{},
      style?: ?{},
    }
  | React.ComponentType<T>;

export function getComponent<T>(
  override: ?OverrideT<T>,
  defaultComponent: React.ComponentType<T>,
): React.ComponentType<T> {
  if (override && typeof override === 'object') {
    return override.component || defaultComponent;
  }
  return override || defaultComponent;
}

export function getOverrideProps<T>(override: ?OverrideT<T>) {
  if (override && typeof override === 'object') {
    return {
      // $FlowFixMe
      ...override.props,
      // $FlowFixMe
      $style: override.style,
    };
  }
  return {};
}
