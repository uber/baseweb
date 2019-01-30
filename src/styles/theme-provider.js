/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import createReactContext, {type Context} from 'create-react-context';
import {LightTheme} from '../themes/index.js';

import type {ThemeT} from './types.js';

export const ThemeContext: Context<ThemeT> = createReactContext(LightTheme);

const ThemeProvider = (props: {theme: ThemeT, children: ?React.Node}) => {
  const {theme, children} = props;
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
