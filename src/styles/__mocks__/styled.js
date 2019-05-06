/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {getInitialStyle} from 'styletron-standard';
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
const IDENTITY = x => x;

function styled(ElementName: string, objOrFn?: ObjOrFnT = {}) {
  class MockStyledComponent extends React.Component<PropsT, StateT> {
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
      return <ElementName styled-component="true" {...this.getPassedProps()} />;
    }
  }

  // $FlowFixMe
  MockStyledComponent.__STYLETRON__ = {
    getInitialStyle,
    wrapper: IDENTITY,
    base: ElementName,
  };

  return MockStyledComponent;
}

export default styled;
