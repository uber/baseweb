/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {LayersManager} from '../layer/index.js';
import {ThemeProvider} from '../styles/index.js';
import type {BaseProviderPropsT} from './types.js';

const BaseProvider = (props: BaseProviderPropsT) => {
  const {children, overrides, theme, zIndex} = props;
  return (
    <LayersManager zIndex={zIndex} overrides={overrides}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </LayersManager>
  );
};

export default BaseProvider;
