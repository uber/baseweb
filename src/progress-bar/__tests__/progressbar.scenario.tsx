/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { ProgressBar, SIZE } from '../index';

export function Scenario() {
  return (
    <>
      <ProgressBar value={20} showLabel size={SIZE.small} />
      <br />
      <ProgressBar value={120} minValue={100} maxValue={200} showLabel />
      <br />
      <ProgressBar value={20} showLabel />
      <br />
      <ProgressBar value={20} showLabel size={SIZE.large} />
      <br />
      <ProgressBar value={20} showLabel size={SIZE.large} steps={5} />
      <br />
      <ProgressBar
        value={120}
        minValue={100}
        maxValue={200}
        showLabel
        size={SIZE.large}
        steps={10}
      />
      <br />
      <ProgressBar infinite />
    </>
  );
}
