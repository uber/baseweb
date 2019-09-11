/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulDatepicker} from '../index.js';

export const name = 'datepicker-int';

export const component = () => (
  <StatefulDatepicker
    aria-label="Select a date"
    highlightedDate={new Date('March 10, 2019')}
    formatString="MM/dd/yyyy"
    placeholder="MM/DD/YYYY"
    overrides={{
      MonthYearSelectButton: {props: {'data-id': 'monthYearSelectButton'}},
      MonthYearSelectStatefulMenu: {
        props: {overrides: {List: {props: {'data-id': 'monthYearSelectMenu'}}}},
      },
    }}
  />
);
