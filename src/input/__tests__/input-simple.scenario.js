/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulInput} from '../index.js';

export const name = 'input-simple';

export const component = () => (
  <StatefulInput
    overrides={{
      Root: {props: {'data-baseweb': 'test-container'}},
      Input: {props: {'data-test': 'e2e'}},
    }}
    placeholder="simple"
  />
);
