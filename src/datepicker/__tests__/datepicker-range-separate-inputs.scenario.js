/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StyledDay, StatefulDatepicker} from '../index.js';

export default function Scenario() {
  return (
    <div>
      <StatefulDatepicker
        aria-label="Select a date"
        clearable={true}
        initialState={{value: []}}
        highlightedDate={new Date('March 10, 2019')}
        range
        separateRangeInputs
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
      <StatefulDatepicker
        aria-label="Select a date"
        initialState={{value: []}}
        highlightedDate={new Date('March 10, 2019')}
        range
        separateRangeInputs
        monthsShown={2}
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
