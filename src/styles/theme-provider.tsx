/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { LightTheme } from '../themes/index';

import type { ThemeT } from './types';

export const ThemeContext: React.Context<ThemeT> = React.createContext(LightTheme);

const ThemeProvider = (props: { theme: ThemeT; children: React.ReactNode | undefined | null }) => {
  const { theme, children } = props;
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
