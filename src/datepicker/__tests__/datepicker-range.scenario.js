/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StyledDay, StatefulDatepicker} from '../index.js';

export const name = 'datepicker-range';

export const component = () => (
  <StatefulDatepicker
    aria-label="Select a date"
    initialState={{value: []}}
    range
    highlightedDate={new Date('March 10, 2019')}
    clearable={true}
    overrides={{
      Day: {
        // eslint-disable-next-line react/display-name
        component: props => (
          <StyledDay data-highlighted={props.$isHighlighted} {...props} />
        ),
      },
      MonthYearSelectButton: {props: {'data-id': 'monthYearSelectButton'}},
      MonthYearSelectStatefulMenu: {
        props: {overrides: {List: {props: {'data-id': 'monthYearSelectMenu'}}}},
      },
    }}
  />
);
