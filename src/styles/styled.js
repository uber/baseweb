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
import * as React from 'react';
import {createStyled, withStyleDeep} from 'styletron-react-core';
import {driver, getInitialStyle} from 'styletron-standard';

import {ThemeContext} from './theme-provider';

const wrapper = StyledComponent =>
  function withThemeHOC(props) {
    return (
      <ThemeContext.Consumer>
        {theme => <StyledComponent {...props} $theme={theme} />}
      </ThemeContext.Consumer>
    );
  };

const baseStyled = createStyled({wrapper, getInitialStyle, driver});

// TODO: Need a flow expert to help remove this 'any' type
// eslint-disable-next-line flowtype/no-weak-types
export default function styledWrapper(...args: any) {
  // If user is trying to style a styled component
  // use withStyleDeep, otherwise use baseStyled
  const styleFn = typeof args[0] === 'function' ? withStyleDeep : baseStyled;
  // Also allow passing deep style overrides via $style prop
  // Ex: <StyledDiv $style={{color: 'red'}} />
  // Issue for supporting this natively in styletron:
  // https://github.com/rtsao/styletron/issues/221
  return withStyleDeep(styleFn(...args), (props: {$style?: ?{}}) => {
    const {$style} = props;
    if (typeof $style === 'function') {
      return $style(props);
    }
    return $style || {};
  });
}
