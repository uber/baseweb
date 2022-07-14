/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable cup/no-undef */
import * as React from 'react';
import { isValidElementType } from 'react-is';
import deepMerge from '../utils/deep-merge';

// Object -> any
export type ConfigurationOverrideFunction = (a: any) => any | undefined | null;
export type ConfigurationOverrideObject = { [k: string]: any };

export type ConfigurationOverride = ConfigurationOverrideObject | ConfigurationOverrideFunction;

export type StyleOverride = ConfigurationOverride;

export type OverrideObject = {
  component?: React.ComponentType<any> | null;
  props?: ConfigurationOverride | null;
  style?: ConfigurationOverride | null;
};

export type Override =
  | OverrideObject
  | (React.ComponentType<any> & {
      component?: undefined;
      props?: undefined;
      style?: undefined;
    });

export type Overrides = {
  [x: string]: Override;
};

/**
 * Given an override argument, returns the component implementation override if it exists
 */
export function getOverride(_override: any): any {
  if (isValidElementType(_override)) {
    return _override;
  }

  // Check if override is OverrideObjectT
  if (_override && typeof _override === 'object') {
    // Remove this 'any' once this flow issue is fixed:
    // https://github.com/facebook/flow/issues/6666
    return (_override as any).component;
  }

  // null/undefined
  return _override;
}

/**
 * Given an override argument, returns the override props that should be passed
 * to the component when rendering it.
 */
export function getOverrideProps<T>(_override?: Override | null): T {
  if (_override && typeof _override === 'object') {
    if (typeof _override.props === 'object') {
      //@ts-expect-error
      return {
        ..._override.props,
        $style: _override.style,
      };
    } else {
      //@ts-expect-error
      return {
        $style: _override.style,
      };
    }
  }
  //@ts-expect-error
  return {};
}

/**
 * Coerces an override argument into an override object
 * (sometimes it is just an override component)
 */
export function toObjectOverride<T>(_override?: Override): OverrideObject {
  if (isValidElementType(_override)) {
    return {
      component: _override as any as React.ComponentType<T>,
    };
  }

  // Flow can't figure out that typeof 'function' above will
  // catch React.StatelessFunctionalComponent
  // (probably related to https://github.com/facebook/flow/issues/6666)
  return _override || ({} as any as OverrideObject);
}

/**
 * Get a convenient override array that will always have [component, props]
 */
export function getOverrides<T = { [k: string]: any }>(
  _override: any,
  defaultComponent: React.ComponentType<any>
): [React.ComponentType<any>, T /* todo(flow->ts) {[k: string]: any} */] {
  const Component = getOverride(_override) || defaultComponent;

  if (_override && typeof _override === 'object' && typeof _override.props === 'function') {
    // TODO(v11)
    if (__DEV__) {
      console.warn(
        'baseui:Overrides Props as a function will be removed in the next major version. Override the whole component instead. ' +
          'See https://baseweb.design/guides/understanding-overrides/#override-the-entire-subcomponent'
      );
    }
    const DynamicOverride = React.forwardRef((props, ref) => {
      const mappedProps = _override.props(props);
      const nextProps: T = getOverrideProps<T>({
        ..._override,
        props: mappedProps,
      });
      return <Component ref={ref} {...nextProps} />;
    });
    DynamicOverride.displayName = Component.displayName;
    // @ts-expect-error
    return [DynamicOverride, {}];
  }

  const props = getOverrideProps<T>(_override);
  return [Component, props];
}
/* flowlint unclear-type:error */

/**
 * Merges two overrides objects – this is useful if you want to inject your own
 * overrides into a child component, but also accept further overrides from
 * from upstream. See `mergeOverride` below.
 */
export function mergeOverrides(target: Overrides = {}, source: Overrides = {}): Overrides {
  const merged = Object.assign({}, target, source);
  const allIdentifiers = Object.keys(merged);
  // const allIdentifiers = Object.keys({...target, ...source});

  return allIdentifiers.reduce((acc, name) => {
    acc[name] = mergeOverride(toObjectOverride(target[name]), toObjectOverride(source[name]));
    return acc;
  }, {});
}

/**
 * Merges two override objects using the following behavior:
 * - Component implementation from the source (parent) replaces target
 * - Props and styles are both deep merged
 */
export function mergeOverride(target: OverrideObject, source: OverrideObject): OverrideObject {
  // Shallow merge should handle `component`
  const merged = { ...target, ...source };
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
  target: ConfigurationOverride,
  source: ConfigurationOverride
): ConfigurationOverride {
  // Simple case of both objects
  if (typeof target === 'object' && typeof source === 'object') {
    return deepMerge({}, target, source);
  }

  // At least one is a function, return a new composite function
  return (...args) => {
    return deepMerge(
      {},
      typeof target === 'function' ? target(...args) : target,
      typeof source === 'function' ? source(...args) : source
    );
  };
}

// Lil' hook for memoized unpacking of overrides
export function useOverrides(
  defaults: {
    [x: string]: React.ComponentType<any>;
  },
  overrides: Overrides = {}
) {
  return React.useMemo(
    () =>
      Object.keys(defaults).reduce<{
        [x: string]: [React.ComponentType<any>, {}];
      }>((obj, key) => {
        obj[key] = getOverrides(overrides[key], defaults[key]);
        return obj;
      }, {}),
    [overrides]
  );
}
