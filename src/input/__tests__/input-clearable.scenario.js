/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulInput} from '../index.js';

export const name = 'input-clearable';

export const component = () => (
  <StatefulInput
    clearable
    initialState={{value: 'Something'}}
    overrides={{Input: {props: {'data-test': 'e2e'}}}}
  />
);
