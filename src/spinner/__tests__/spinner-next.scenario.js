/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StyledSpinnerNext, SIZE} from '../index.js';

export function Scenario() {
  return (
    <React.Fragment>
      <StyledSpinnerNext />

      <StyledSpinnerNext $size={SIZE.small} />
      <StyledSpinnerNext $size={SIZE.medium} />
      <StyledSpinnerNext $size={SIZE.large} />

      <StyledSpinnerNext $size={'20px'} />
      <StyledSpinnerNext $size={'40px'} />
      <StyledSpinnerNext $size={'60px'} />

      <StyledSpinnerNext $borderWidth={SIZE.small} $size={60} />
      <StyledSpinnerNext $borderWidth={SIZE.medium} $size={60} />
      <StyledSpinnerNext $borderWidth={SIZE.large} $size={60} />

      <StyledSpinnerNext $borderWidth={20} $size={SIZE.small} />
      <StyledSpinnerNext $borderWidth={20} $size={SIZE.medium} />
      <StyledSpinnerNext $borderWidth={20} $size={SIZE.large} />

      <StyledSpinnerNext $borderWidth="scale300" $size="scale1000" />
      <StyledSpinnerNext $borderWidth="scale200" $size="scale900" />
      <StyledSpinnerNext $borderWidth="scale100" $size="scale700" />
    </React.Fragment>
  );
}
