/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { LightTheme } from '../themes';

import type { Theme } from './types';

export const ThemeContext: React.Context<Theme> = React.createContext(LightTheme);

export type ThemeProviderProps = { theme: Theme };
const ThemeProvider: React.FC<React.PropsWithChildren<ThemeProviderProps>> = (props) => {
  const { theme, children } = props;
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
