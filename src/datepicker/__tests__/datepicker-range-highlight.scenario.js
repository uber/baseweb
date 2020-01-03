/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {StatefulDatepicker} from '../index.js';

export const name = 'datepicker-range-highlight';

export const component = () => (
  <StatefulDatepicker
    aria-label="Select a date"
    initialState={{value: []}}
    range
    highlightedDate={new Date('March 10, 2019')}
  />
);
