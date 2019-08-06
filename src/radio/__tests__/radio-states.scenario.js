/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {RadioGroup, Radio} from '../index.js';
export const name = 'radio-states';
export const component = () => (
  <React.Fragment>
    <RadioGroup value="2">
      <Radio value="1">Basic</Radio>
      <Radio value="2">Basic</Radio>
    </RadioGroup>
    <RadioGroup isError value="2">
      <Radio value="1">Error</Radio>
      <Radio value="2">Error</Radio>
    </RadioGroup>
    <RadioGroup disabled value="2">
      <Radio value="1">Error</Radio>
      <Radio value="2">Error</Radio>
    </RadioGroup>
  </React.Fragment>
);
