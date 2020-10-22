/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {SpinnerDeterminate, SIZE} from '../index.js';

export default function Scenario() {
  return (
    <React.Fragment>
      <SpinnerDeterminate progress={0.5} size={SIZE.small} animate={false} />
      <br />
      <SpinnerDeterminate progress={0.5} size={SIZE.medium} animate={false} />
      <br />
      <SpinnerDeterminate progress={0.5} size={SIZE.large} animate={false} />
    </React.Fragment>
  );
}
