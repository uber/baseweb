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
import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';
import {ThemeProvider} from '../styles';
import DEFAULT_THEME from '../themes/light-theme';

const engine = new Styletron();

export const withStyletronProvider = (Component: React.ComponentType<*>) =>
  function withStyletronProviderHOC(props: {}) {
    return (
      <StyletronProvider value={engine}>
        <Component {...props} />
      </StyletronProvider>
    );
  };

export const withThemeProvider = (Component: React.ComponentType<*>) =>
  function withThemeProviderHOC(props: {}) {
    return (
      <ThemeProvider theme={DEFAULT_THEME}>
        <Component {...props} />
      </ThemeProvider>
    );
  };

export const withAll = (Component: () => React.Element<*>) => {
  return (
    <StyletronProvider value={engine}>
      <ThemeProvider theme={DEFAULT_THEME}>{Component()}</ThemeProvider>
    </StyletronProvider>
  );
};
