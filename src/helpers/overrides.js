/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import deepMerge from '../utils/deep-merge';

type StyleOverrideT = {} | (({}) => ?{});

export type OverrideObjectT<T> = {|
  component?: ?React.ComponentType<T>,
  props?: ?{},
  style?: ?StyleOverrideT,
|};

export type OverrideT<T> = OverrideObjectT<T> | React.ComponentType<T>;

export type OverridesT<T> = {
  [string]: OverrideT<T>,
};

/**
 * Given an override argument, returns the component implementation override if it exists
 */
export function getOverride<T>(
  override: ?OverrideT<T>,
): ?React.ComponentType<T> {
  // Check if override is OverrideObjectT
  if (override && typeof override === 'object') {
    // Remove this 'any' once this flow issue is fixed:
    // https://github.com/facebook/flow/issues/6666
    // eslint-disable-next-line flowtype/no-weak-types
    return (override: any).component;
  }
  // Otherwise it must be a component type (function or class) or null/undefined
  return override;
}

/**
 * Given an override argument, returns the override props that should be passed
 * to the component when rendering it.
 */
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
 * Coerces an override argument into an override object
 * (sometimes it is just an override component)
 */
export function toObjectOverride<T>(
  override: OverrideT<T>,
): OverrideObjectT<T> {
  if (typeof override === 'function') {
    return {
      component: (override: React.ComponentType<T>),
    };
  }
  // Flow can't figure out that typeof 'function' above will
  // catch React.StatelessFunctionalComponent
  // (probably related to https://github.com/facebook/flow/issues/6666)
  // eslint-disable-next-line flowtype/no-weak-types
  return ((override || {}: any): OverrideObjectT<T>);
}

/**
 * Get a convenient override array that will always have [component, props]
 */
export function getOverrides<T>(
  override: ?OverrideT<T>,
  defaultComponent: React.ComponentType<T>,
): [React.ComponentType<T>, {}] {
  const component = getOverride(override) || defaultComponent;
  const props = getOverrideProps(override);
  return [component, props];
}

/**
 * Merges two overrides objects – this is useful if you want to inject your own
 * overrides into a child component, but also accept further overrides from
 * from upstream. See `mergeOverride` below.
 */
export function mergeOverrides<T>(
  target?: OverridesT<T> = {},
  source?: OverridesT<T> = {},
): OverridesT<T> {
  const allIdentifiers = Object.keys({...target, ...source});
  return allIdentifiers.reduce((acc, name) => {
    acc[name] = mergeOverride(
      toObjectOverride(target[name]),
      toObjectOverride(source[name]),
    );
    return acc;
  }, {});
}

/**
 * Merges two override objects using the following behavior:
 * - Component implementation from the source (parent) replaces target
 * - Props and styles are both deep merged
 */
export function mergeOverride<T>(
  target: OverrideObjectT<T>,
  source: OverrideObjectT<T>,
): OverrideObjectT<T> {
  // Shallow merge should handle `component`
  const merged = {...target, ...source};
  // Props just use deep merge
  if (target.props && source.props) {
    merged.props = deepMerge({}, target.props, source.props);
  }
  // Style overrides need special merging since they may be functions
  if (target.style && source.style) {
    merged.style = mergeStyleOverrides(target.style, source.style);
  }
  return merged;
}

/**
 * Since style overrides can be an object *or* a function, we need to handle
 * the case that one of them is a function. We do this by returning a new
 * function that deep emrges the result of each style override
 */
function mergeStyleOverrides(target: StyleOverrideT, source: StyleOverrideT) {
  // Simple case of both objects
  if (typeof target === 'object' && typeof source === 'object') {
    return deepMerge({}, target, source);
  }

  // At least one is a function, return a new composite function
  return (...args) => {
    return deepMerge(
      {},
      typeof target === 'function' ? target(...args) : target,
      typeof source === 'function' ? source(...args) : source,
    );
  };
}
