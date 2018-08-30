/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

export type OverrideObjectT<T> = {|
  component?: ?React.ComponentType<T>,
  props?: ?{},
  style?: ?{},
|};

export type OverrideT<T> = OverrideObjectT<T> | React.ComponentType<T>;

export type OverridesT<T> = {
  [string]: OverrideT<T>,
};

export function getOverride<T>(
  override: ?OverrideT<T>,
): ?React.ComponentType<T> {
  // Check if override is OverrideObjectT
  if (override && typeof override === 'object') {
    // TODO remove this 'any' once this flow issue is fixed:
    // https://github.com/facebook/flow/issues/6666
    // eslint-disable-next-line flowtype/no-weak-types
    return (override: any).component;
  }
  // Otherwise it must be a component type (function or class) or null/undefined
  return override;
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
      component: (override: React.ComponentType<T>),
    };
  }
  return override;
}

/**
 * Get a convenient override object that will always have {component, props}
 */
export function getOverrideObject<T>(
  override: ?OverrideT<T>,
  defaultComponent: React.ComponentType<T>,
): {
  component: React.ComponentType<T>,
  props: {},
} {
  const component = getOverride(override) || defaultComponent;
  const props = getOverrideProps(override);
  return {component, props};
}

/**
 * Merges two override objects – this is useful if you want to
 * inject your own overrides into a child component, but also
 * accept further overrides from your parent.
 */
export function mergeOverrides<T>(
  target?: OverridesT<T> = {},
  source?: OverridesT<T> = {},
): OverridesT<T> {
  return Object.keys({...target, ...source}).reduce((acc, name) => {
    acc[name] = {
      ...toObjectOverride(target[name]),
      ...toObjectOverride(source[name]),
    };
    return acc;
  }, {});
}
