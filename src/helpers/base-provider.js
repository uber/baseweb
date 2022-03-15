/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { UIDReset } from 'react-uid';
import { LayersManager } from '../layer/index.js';
import { ThemeProvider } from '../styles/index.js';
import type { BaseProviderPropsT } from './types.js';

const BaseProvider = (props: BaseProviderPropsT) => {
  const { children, overrides, theme, zIndex } = props;
  return (
    <LayersManager zIndex={zIndex} overrides={overrides}>
      <UIDReset prefix="bui">
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </UIDReset>
    </LayersManager>
  );
};

export default BaseProvider;
