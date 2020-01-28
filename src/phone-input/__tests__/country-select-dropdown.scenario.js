/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {StatefulPhoneInput, SIZE} from '../index.js';

export const name = 'country-select-dropdown';

export const component = () => (
  <React.Fragment>
    <StatefulPhoneInput size={SIZE.compact} />
    <br />
    <StatefulPhoneInput />
    <br />
    <StatefulPhoneInput size={SIZE.large} />
  </React.Fragment>
);
