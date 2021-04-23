/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {StatefulPhoneInput, SIZE} from '../index.js';

export default function Scenario() {
  return (
    <React.Fragment>
      <br />
      <StatefulPhoneInput size={SIZE.compact} />
      <br />
      <StatefulPhoneInput />
      <br />
      <StatefulPhoneInput size={SIZE.large} />
      <br />
      <StatefulPhoneInput positive />
      <br />
      <StatefulPhoneInput error />
    </React.Fragment>
  );
}
