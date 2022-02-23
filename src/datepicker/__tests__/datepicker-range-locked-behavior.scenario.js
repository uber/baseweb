/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Datepicker} from '../index.js';

export function Scenario() {
  const [singleMonthValue, setSingleMonthValue] = React.useState([]);
  const [multiMonthValue, setMultiMonthValue] = React.useState([]);

  return (
    <div>
      <p>Single Month</p>
      <Datepicker
        aria-label="Select a date"
        clearable={true}
        value={singleMonthValue}
        onChange={({date}) => setSingleMonthValue(date)}
        highlightedDate={new Date('March 10, 2019')}
        range
        separateRangeInputs
        rangedCalendarBehavior="locked"
        timeSelectEnd
        timeSelectStart
        overrides={{
          TimeSelect: {
            props: {
              overrides: {
                Select: {
                  props: {
                    overrides: {
                      Root: {props: {'data-id': 'time-select'}},
                      ValueContainer: {props: {'data-id': 'selected'}},
                    },
                  },
                },
              },
            },
          },
        }}
      />
      <p>Multi-Month</p>
      <Datepicker
        aria-label="Select a date"
        value={multiMonthValue}
        onChange={({date}) => setMultiMonthValue(date)}
        highlightedDate={new Date('March 10, 2019')}
        range
        separateRangeInputs
        rangedCalendarBehavior="locked"
        monthsShown={2}
        clearable={true}
        overrides={{
          MonthYearSelectButton: {props: {'data-id': 'monthYearSelectButton'}},
          MonthYearSelectStatefulMenu: {
            props: {
              overrides: {List: {props: {'data-id': 'monthYearSelectMenu'}}},
            },
          },
          Input: {
            props: {
              overrides: {
                Input: {
                  props: {'data-id': 'multiMonthInputs'},
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
