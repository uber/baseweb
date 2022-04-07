/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { Datepicker } from '../index.js';

function Instance({ startDate }) {
  const [value, setValue] = React.useState([startDate]);
  return (
    <Datepicker
      aria-label="Select a date"
      clearable={true}
      value={value}
      onChange={({ date }) => setValue(date)}
      excludeDates={[
        new Date('2022-03-09'),
        new Date('2022-03-13'),
        new Date('2022-03-24'),
        new Date('2022-03-25'),
        new Date('2022-04-03'),
        new Date('2022-04-13'),
      ]}
      range
      highlightDate={new Date('2022-03-05')}
      maxDate={new Date('2022-05-14')}
      minDate={new Date('2022-03-05')}
      overrides={{
        MonthYearSelectButton: { props: { 'data-id': 'monthYearSelectButton' } },
        MonthYearSelectStatefulMenu: {
          props: {
            overrides: { List: { props: { 'data-id': 'monthYearSelectMenu' } } },
          },
        },
        TimeSelect: {
          props: {
            overrides: {
              Select: {
                props: {
                  overrides: {
                    Root: { props: { 'data-id': 'time-select' } },
                    ValueContainer: { props: { 'data-id': 'selected' } },
                  },
                },
              },
            },
          },
        },
      }}
    />
  );
}

export function Scenario() {
  return (
    <div>
      <div id="within-month">
        <Instance startDate={new Date(2022, 2, 14)} />
      </div>

      <div id="between-month">
        <Instance startDate={new Date(2022, 2, 31)} />
      </div>
    </div>
  );
}
