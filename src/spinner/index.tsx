/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { StyledSpinner } from './styled-components';
import type { SpinnerProps } from './types';
import type { StyletronComponent } from 'styletron-react';

export { SIZE } from './constants';
// Flow
export * from './types';

const Spinner: StyletronComponent<'i', SpinnerProps> = (props) => {
  return <StyledSpinner role="progressbar" aria-label="loading" aria-busy="true" {...props} />;
};
Spinner.displayName = 'StyledSpinner';
Spinner.__STYLETRON__ = StyledSpinner.__STYLETRON__;

export { Spinner };
