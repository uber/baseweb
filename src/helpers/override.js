/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {isValidElementType} from 'react-is';
import deepMerge from '../utils/deep-merge.js';

type StaticPropertyT = {};
type DynamicPropertyT<A, B> = A => B;

type ComponentPropertyT<Props> = React.AbstractComponent<Props>;
type ConfigPropertyT<A, B> = StaticPropertyT | DynamicPropertyT<A, B>;

type OverrideConfigT<T> = {|
  component?: ?ComponentPropertyT<T>,
  props?: ?ConfigPropertyT<{}, T>,
  style?: ?ConfigPropertyT<{}, {}>,
|};

export type OverrideResourceT<P> = OverrideConfigT<P> | ComponentPropertyT<P>;

function refineResourceToConfig<Props>(
  resource: OverrideResourceT<Props>,
): OverrideConfigT<Props> {
  if (isValidElementType(resource)) {
    // https://github.com/facebook/flow/issues/6666
    // eslint-disable-next-line flowtype/no-weak-types
    const component: ComponentPropertyT<Props> = (resource: any);
    return {component, props: null, style: null};
  }
  if (typeof resource === 'object') {
    return resource;
  }
  return {
    component: null,
    props: null,
    style: null,
  };
}

export function Override<Props: {}>(
  Base: React.AbstractComponent<Props>,
): React.AbstractComponent<Props & {override: ?OverrideResourceT<Props>}> {
  function ProxyOverrides(allProps, ref) {
    const {override, ...props} = allProps;
    if (override) {
      const config = refineResourceToConfig<Props>(override);

      let Component = Base;
      if (config.component && isValidElementType(config.component)) {
        Component = config.component;
      }

      let overrideProps = props;
      if (typeof config.props === 'object') {
        overrideProps = {...props, ...config.props};
      } else if (typeof config.props === 'function') {
        overrideProps = config.props(props);
      }

      return <Component ref={ref} $style={config.style} {...overrideProps} />;
    }
    ProxyOverrides.displayName = Base.displayName;

    return <Base ref={ref} {...props} />;
  }

  return React.forwardRef<Props & {override: ?OverrideResourceT<Props>}, mixed>(
    ProxyOverrides,
  );
}

function mergeOverrideProperties<A: {}, B: {}>(
  target: ConfigPropertyT<A, B>,
  source: ConfigPropertyT<A, B>,
): ConfigPropertyT<A, B> {
  if (typeof target === 'object' && typeof source === 'object') {
    return deepMerge({}, target, source);
  }
  return (props: A): B => {
    return deepMerge(
      {},
      typeof source === 'function' ? source(props) : source,
      typeof source === 'function' ? source(props) : source,
    );
  };
}

export function mergeOverrideResources<Props: {}>(
  target: OverrideResourceT<Props>,
  source: OverrideResourceT<Props>,
): OverrideConfigT<Props> {
  const targetConfig = refineResourceToConfig<Props>(target);
  const sourceConfig = refineResourceToConfig<Props>(source);
  const merged = {...targetConfig, ...sourceConfig};
  if (targetConfig.props && sourceConfig.props) {
    merged.props = mergeOverrideProperties<{}, Props>(
      targetConfig.props,
      sourceConfig.props,
    );
  }
  if (targetConfig.style && sourceConfig.style) {
    merged.style = mergeOverrideProperties<{}, {}>(
      targetConfig.style,
      sourceConfig.style,
    );
  }
  return merged;
}

function mergeOverrideCollections<Props>(
  target: {[string]: OverrideResourceT<Props>},
  source: {[string]: OverrideResourceT<Props>},
): {[string]: OverrideResourceT<Props>} {
  // TODO
  return target;
}
