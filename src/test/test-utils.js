/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { Provider as StyletronProvider } from 'styletron-react';
import { Client as Styletron } from 'styletron-engine-atomic';

import BaseProvider from '../helpers/base-provider.js';
import { ThemeProvider } from '../styles/index.js';
import { LightTheme } from '../themes/index.js';

const engine = new Styletron();

export const withStyletronProvider = (Component: React.ComponentType<{}>) =>
  function withStyletronProviderHOC(props: {}) {
    return (
      <StyletronProvider value={engine}>
        <Component {...props} />
      </StyletronProvider>
    );
  };

export const withThemeProvider = (Component: React.ComponentType<{}>) =>
  function withThemeProviderHOC(props: {}) {
    return (
      <ThemeProvider theme={LightTheme}>
        <Component {...props} />
      </ThemeProvider>
    );
  };

// flowlint-next-line unclear-type:off
export const withAll = (Component: () => React.Element<any>) => {
  return (
    <StyletronProvider value={engine}>
      <ThemeProvider theme={LightTheme}>{Component()}</ThemeProvider>
    </StyletronProvider>
  );
};

export function TestBaseProvider({ children }: { children?: React.Node }) {
  return <BaseProvider theme={LightTheme}>{children}</BaseProvider>;
}
