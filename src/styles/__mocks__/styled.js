/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
import React from 'react';
import LIGHT_THEME from '../../themes/light-theme';
import createMockTheme from '../../test/create-mock-theme';

type ObjOrFnT = {} | (({}) => {});

type PropsT = {$style?: ObjOrFnT};

type StateT = {styles?: {}};

const MOCK_THEME = createMockTheme(LIGHT_THEME);

function styled(Base: string, objOrFn?: ObjOrFnT = {}) {
  return class MockStyledComponent extends React.Component<PropsT, StateT> {
    static displayName = 'MockStyledComponent';

    state = {};

    static getDerivedStateFromProps(props: PropsT) {
      const styleFnArg = {...props, $theme: MOCK_THEME};

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
