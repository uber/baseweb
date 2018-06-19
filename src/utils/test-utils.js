// @flow
import * as React from 'react';
import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';
import {ThemeProvider} from '../styles';
import DEFAULT_THEME from '../themes/light-theme';

const engine = new Styletron();

export const withStyletronProvider = (
  Component: React.ComponentType<*>,
) => (props: {}) => {
  return (
    <StyletronProvider value={engine}>
      <Component {...props} />
    </StyletronProvider>
  );
};

export const withThemeProvider = (
  Component: React.ComponentType<*>,
) => (props: {}) => {
  return (
    <ThemeProvider theme={DEFAULT_THEME}>
      <Component {...props} />
    </ThemeProvider>
  );
};
