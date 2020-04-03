/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {isValidElementType} from 'react-is';

type StaticPropertyT = {};
type DynamicPropertyT<A, B> = A => B;

type ComponentPropertyT<Props> = React.AbstractComponent<Props>;
type PropsPropertyT<Props> = StaticPropertyT | DynamicPropertyT<{}, Props>;
type StylePropertyT = StaticPropertyT | DynamicPropertyT<{}, {}>;

type OverrideConfigT<T> = {|
  component?: ?ComponentPropertyT<T>,
  props?: ?PropsPropertyT<T>,
  style?: ?StylePropertyT,
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

function mergeOverrideResources<Props>(
  target: OverrideResourceT<Props>,
  source: OverrideResourceT<Props>,
): OverrideResourceT<Props> {
  // TODO
  return target;
}

function mergeOverrideCollections<Props>(
  target: {[string]: OverrideResourceT<Props>},
  source: {[string]: OverrideResourceT<Props>},
): {[string]: OverrideResourceT<Props>} {
  // TODO
  return target;
}
