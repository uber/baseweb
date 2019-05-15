/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulDatepicker} from '../index.js';
import {addDays} from '../utils/index.js';

export const name = 'Stateful datepicker quick select';

const now = new Date('2019-02-14T10:00:00Z');

export const component = () => (
  <StatefulDatepicker
    range
    initialState={{
      value: [now, addDays(now, 3)],
    }}
    quickSelect
  />
);
