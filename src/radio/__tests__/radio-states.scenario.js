/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Radio, RadioGroup} from '../index.js';

export const name = 'radio-states';

export const component = () => (
  <React.Fragment>
    <RadioGroup name="example1" value="1">
      <Radio value="1">Uber</Radio>
      <Radio value="2">Taxi</Radio>
    </RadioGroup>
    <RadioGroup name="example2" value="1" disabled>
      <Radio value="1">Uber</Radio>
      <Radio value="2">Taxi</Radio>
    </RadioGroup>
    <RadioGroup name="example3" value="1" isError>
      <Radio value="1">Uber</Radio>
      <Radio value="2">Taxi</Radio>
    </RadioGroup>
  </React.Fragment>
);
