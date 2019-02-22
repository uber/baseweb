/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulDatepicker} from '../index.js';

export const name = 'datepicker';

export const component = () => (
  <StatefulDatepicker
    aria-label="Select a date"
    highlightedDate={new Date('March 10, 2019')}
    overrides={{
      MonthSelect: {
        props: {overrides: {Root: {props: {'data-id': 'monthSelect'}}}},
      },
      YearSelect: {
        props: {overrides: {Root: {props: {'data-id': 'yearSelect'}}}},
      },
    }}
  />
);
