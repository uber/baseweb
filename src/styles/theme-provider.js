/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import LIGHT_THEME from '../themes/light-theme';

import type {ThemeT} from './types';

export const ThemeContext = React.createContext(LIGHT_THEME);

const ThemeProvider = (props: {theme: ThemeT, children: ?React.Node}) => {
  const {theme, children} = props;
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
