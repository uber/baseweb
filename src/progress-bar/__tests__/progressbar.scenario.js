/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {ProgressBar, SIZE} from '../index.js';

export default function Scenario() {
  return (
    <>
      <ProgressBar value={20} showLabel size={SIZE.small} />
      <br />
      <ProgressBar value={20} showLabel />
      <br />
      <ProgressBar value={20} showLabel size={SIZE.large} />
      <br />
      <ProgressBar value={20} showLabel size={SIZE.large} steps={5} />
    </>
  );
}
