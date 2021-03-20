/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {LightTheme} from '../themes/index.js';

import type {ThemeT, ThemeProviderT} from './types.js';
import type {ThemeLevelOverridesT} from '../helpers/overrides';

export const ThemeContext: React.Context<ThemeProviderT> = React.createContext({
  theme: LightTheme,
});

const ThemeProvider = (props: {
  theme: ThemeT,
  children: ?React.Node,
  overrides?: ThemeLevelOverridesT,
}) => {
  const {theme, children, overrides} = props;
  return (
    <ThemeContext.Provider value={{theme, overrides: overrides}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
