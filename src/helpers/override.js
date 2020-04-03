/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {isValidElementType} from 'react-is';

type StaticPropertyT = {};
type DynamicPropertyT = ({}) => {};
type ComponentPropertyT<T> = React.ComponentType<T>;
type OverridePropertyT = StaticPropertyT | DynamicPropertyT;

type OverrideObjectT<T> = {|
  component?: ?ComponentPropertyT<T>,
  props?: ?OverridePropertyT,
  style?: ?OverridePropertyT,
|};

export type OverrideT<T> = OverrideObjectT<T> | ComponentPropertyT<T>;

export function Override<Config: {}>(
  Base: React.AbstractComponent<Config>,
): React.AbstractComponent<Config & {override?: OverrideT<Config>}> {
  function ConfigureOverride(allProps, ref) {
    const {override, ...props} = allProps;
    if (override) {
      if (isValidElementType(override)) {
        // https://github.com/facebook/flow/issues/6666
        // eslint-disable-next-line flowtype/no-weak-types
        const ComponentOverride = ((override: any): ComponentPropertyT<Config>);
        // eslint-disable-next-line flowtype/no-weak-types
        return <ComponentOverride ref={(ref: any)} {...props} />;
      }

      if (typeof override === 'object') {
        let Component = Base;
        if (override.component && isValidElementType(override.component)) {
          Component = override.component;
        }

        let overrideProps = props;
        if (typeof override.props === 'object') {
          overrideProps = {...props, ...override.props};
        } else if (typeof override.props === 'function') {
          overrideProps = override.props(props);
        }

        return (
          <Component
            // eslint-disable-next-line flowtype/no-weak-types
            ref={(ref: any)}
            $style={override.style}
            {...overrideProps}
          />
        );
      }
    }
    ConfigureOverride.displayName = Base.displayName;

    return <Base ref={ref} {...props} />;
  }

  return React.forwardRef<Config & {override?: OverrideT<Config>}, mixed>(
    ConfigureOverride,
  );
}
