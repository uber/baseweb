/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import { Spinner } from '../index.js';

export function Scenario() {
  const [, theme] = useStyletron();
  return (
    <React.Fragment>
      <Spinner />

      <Spinner $size={SIZE.small} />
      <Spinner $size={SIZE.medium} />
      <Spinner $size={SIZE.large} />

      <Spinner $size={'20px'} />
      <Spinner $size={'40px'} />
      <Spinner $size={'60px'} />

      <Spinner $borderWidth={SIZE.small} $size={60} />
      <Spinner $borderWidth={SIZE.medium} $size={60} />
      <Spinner $borderWidth={SIZE.large} $size={60} />

      <Spinner $borderWidth={20} $size={SIZE.small} />
      <Spinner $borderWidth={20} $size={SIZE.medium} />
      <Spinner $borderWidth={20} $size={SIZE.large} />

      <Spinner $borderWidth="scale300" $size="scale1000" />
      <Spinner $borderWidth="scale200" $size="scale900" />
      <Spinner $borderWidth="scale100" $size="scale700" />

      <Spinner $color={theme.colors.negative} />
      <Spinner $color="green" />
    </React.Fragment>
  );
}
