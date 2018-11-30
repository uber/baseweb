/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {LightTheme} from '../../themes/index.js';
import createMockTheme from '../../test/create-mock-theme.js';
import type {ThemeT} from '../../styles/types.js';

type ObjOrFnT = {} | (({}) => {});

type PropsT = {
  $style?: ObjOrFnT,
  $theme?: ThemeT,
};

type StateT = {styles?: {}};

const MOCK_THEME = createMockTheme(LightTheme);

function styled(Base: string, objOrFn?: ObjOrFnT = {}) {
  return class MockStyledComponent extends React.Component<PropsT, StateT> {
    static displayName = 'MockStyledComponent';

    state = {};

    static getDerivedStateFromProps(props: PropsT) {
      const styleFnArg = {
        ...props,
        // If we use defaultProps, $theme unnecessarily ends up in snapshots
        $theme: props.$theme || MOCK_THEME,
      };

      let styles =
        typeof objOrFn === 'function' ? objOrFn(styleFnArg) : objOrFn;

      // Check for runtime overrides
      let {$style} = props;
      if (typeof $style === 'function') {
        $style = $style(styleFnArg);
      }
      if ($style) {
        styles = {...styles, ...$style};
      }

      return {styles};
    }

    getStyles() {
      return this.state.styles;
    }

    getPassedProps() {
      const {props} = this;
      return Object.keys(props).reduce((acc, key) => {
        if (key[0] !== '$') {
          acc[key] = props[key];
        }
        return acc;
      }, {});
    }

    render() {
      return <Base styled-component="true" {...this.getPassedProps()} />;
    }
  };
}

export default styled;
