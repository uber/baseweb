/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulRadioGroup, Radio} from '../index.js';

export const name = 'radio';

export const component = () => (
  <StatefulRadioGroup initialState={{value: '2'}} aria-label="choose item">
    <Radio value="1">First</Radio>
    <Radio
      value="2"
      description="This is a radio description, it gives a little more in-yo-face context about what this is."
    >
      Second
    </Radio>
    <Radio value="3">Third</Radio>
  </StatefulRadioGroup>
);
