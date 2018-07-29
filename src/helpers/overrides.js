// @flow
import type {ComponentType} from 'react';

export type OverrideT<T> =
  | {
      component?: ?ComponentType<T>,
      props?: ?{},
      style?: ?{},
    }
  | ComponentType<T>;

export type OverridesT = {
  [string]: OverrideT<*>,
};

export function getComponent<T>(
  override: ?OverrideT<T>,
  defaultComponent: ComponentType<T>,
): ComponentType<T> {
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

/**
 * Coerces an override value into an override object
 * (sometimes it is just an override component)
 */
export function toObjectOverride<T>(override: OverrideT<T>): OverrideT<T> {
  if (typeof override === 'function') {
    return {
      component: (override: ComponentType<T>),
    };
  }
  return override;
}

/**
 * Merges two override objects – this is useful if you want to
 * inject your own overrides into a child component, but also
 * accept further overrides from your parent.
 */
export function mergeOverrides(
  target?: OverridesT = {},
  source?: OverridesT = {},
): OverridesT {
  return Object.keys({...target, ...source}).reduce((acc, name) => {
    acc[name] = {
      ...toObjectOverride(target[name]),
      ...toObjectOverride(source[name]),
    };
    return acc;
  }, {});
}
