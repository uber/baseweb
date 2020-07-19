/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {isValidElementType} from 'react-is';
import deepMerge from '../utils/deep-merge.js';

export type ConfigurationOverrideFunctionT = ({}) => ?{};
export type ConfigurationOverrideObjectT = {};

export type ConfigurationOverrideT =
  | ConfigurationOverrideObjectT
  | ConfigurationOverrideFunctionT;

export type StyleOverrideT = ConfigurationOverrideT;

export type OverrideObjectT = {|
  // eslint-disable-next-line flowtype/no-weak-types
  component?: ?React$AbstractComponent<*, *>,
  props?: ?ConfigurationOverrideT,
  style?: ?ConfigurationOverrideT,
|};

// eslint-disable-next-line flowtype/no-weak-types
export type OverrideT = OverrideObjectT | React$AbstractComponent<*, *>;

export type OverridesT = {
  [string]: OverrideT,
};

/**
 * Given an override argument, returns the component implementation override if it exists
 */
// eslint-disable-next-line flowtype/no-weak-types
export function getOverride(override: any): any {
  if (isValidElementType(override)) {
    return override;
  }

  // Check if override is OverrideObjectT
  if (override && typeof override === 'object') {
    // Remove this 'any' once this flow issue is fixed:
    // https://github.com/facebook/flow/issues/6666
    // eslint-disable-next-line flowtype/no-weak-types
    return (override: any).component;
  }

  // null/undefined
  return override;
}

/**
 * Given an override argument, returns the override props that should be passed
 * to the component when rendering it.
 */
export function getOverrideProps(override: ?OverrideT) {
  if (override && typeof override === 'object') {
    if (typeof override.props === 'object') {
      return {
        ...override.props,
        $style: override.style,
      };
    } else {
      return {
        $style: override.style,
      };
    }
  }
  return {};
}

/**
 * Coerces an override argument into an override object
 * (sometimes it is just an override component)
 */
export function toObjectOverride<T>(override: OverrideT): OverrideObjectT {
  if (isValidElementType(override)) {
    return {
      // eslint-disable-next-line flowtype/no-weak-types
      component: ((override: any): React$AbstractComponent<T, *>),
    };
  }

  // Flow can't figure out that typeof 'function' above will
  // catch React$StatelessFunctionalComponent
  // (probably related to https://github.com/facebook/flow/issues/6666)
  // eslint-disable-next-line flowtype/no-weak-types
  return ((override || {}: any): OverrideObjectT);
}

/**
 * Get a convenient override array that will always have [component, props]
 */
/* eslint-disable flowtype/no-weak-types */
export function getOverrides(
  override: any,
  defaultComponent: React$AbstractComponent<*, *>,
): [React$AbstractComponent<*, *>, {}] {
  const Component = getOverride(override) || defaultComponent;

  if (
    override &&
    typeof override === 'object' &&
    typeof override.props === 'function'
  ) {
    // TODO(v11)
    if (__DEV__) {
      console.warn(
        'baseui:Overrides Props as a function will be removed in the next major version.',
      );
    }
    const DynamicOverride = React.forwardRef((props, ref) => {
      const mappedProps = override.props(props);
      const nextProps = getOverrideProps({...override, props: mappedProps});
      return <Component ref={ref} {...nextProps} />;
    });
    DynamicOverride.displayName = Component.displayName;
    return [DynamicOverride, {}];
  }

  const props = getOverrideProps(override);
  return [Component, props];
}
/* eslint-enable flowtype/no-weak-types */

/**
 * Merges two overrides objects – this is useful if you want to inject your own
 * overrides into a child component, but also accept further overrides from
 * from upstream. See `mergeOverride` below.
 */
export function mergeOverrides(
  target?: OverridesT = {},
  source?: OverridesT = {},
): OverridesT {
  const merged = Object.assign({}, target, source);
  const allIdentifiers = Object.keys(merged);
  // const allIdentifiers = Object.keys({...target, ...source});

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
export function mergeOverride(
  target: OverrideObjectT,
  source: OverrideObjectT,
): OverrideObjectT {
  // Shallow merge should handle `component`
  const merged = {...target, ...source};
  if (target.props && source.props) {
    merged.props = mergeConfigurationOverrides(target.props, source.props);
  }
  if (target.style && source.style) {
    merged.style = mergeConfigurationOverrides(target.style, source.style);
  }
  return merged;
}

/**
 * Since style or props overrides can be an object *or* a function, we need to handle
 * the case that one of them is a function. We do this by returning a new
 * function that deep merges the result of each style override
 */
export function mergeConfigurationOverrides(
  target: ConfigurationOverrideT,
  source: ConfigurationOverrideT,
): ConfigurationOverrideT {
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
