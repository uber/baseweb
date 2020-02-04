/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulPinCode} from '../index.js';

export default function Scenario() {
  return (
    <>
      <StatefulPinCode size="compact" />
      <br />
      <StatefulPinCode />
      <br />
      <StatefulPinCode size="large" />
    </>
  );
}
