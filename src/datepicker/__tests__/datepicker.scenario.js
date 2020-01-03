/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Datepicker} from '../index.js';
import {Button} from '../../button/index.js';

export const name = 'datepicker';

export const component = () => {
  const [date, setDate] = React.useState(null);

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          setDate(new Date('2019/07/01'));
        }}
        size="compact"
      >
        Set date
      </Button>
      <Datepicker
        aria-label="Select a date"
        highlightedDate={new Date('March 10, 2019')}
        value={date}
        overrides={{
          MonthYearSelectButton: {props: {'data-id': 'monthYearSelectButton'}},
          MonthYearSelectStatefulMenu: {
            props: {
              overrides: {List: {props: {'data-id': 'monthYearSelectMenu'}}},
            },
          },
        }}
      />
      <span>Large</span>
      <Datepicker
        aria-label="Select a date"
        aria-describedby="large-datepicker"
        highlightedDate={new Date('March 10, 2019')}
        size="large"
        overrides={{
          MonthYearSelectButton: {props: {'data-id': 'monthYearSelectButton'}},
          MonthYearSelectStatefulMenu: {
            props: {
              overrides: {List: {props: {'data-id': 'monthYearSelectMenu'}}},
            },
          },
        }}
      />
      <span>Compact</span>
      <Datepicker
        aria-label="Select a date"
        aria-describedby="compact-datepicker"
        highlightedDate={new Date('March 10, 2019')}
        size="compact"
        overrides={{
          MonthYearSelectButton: {props: {'data-id': 'monthYearSelectButton'}},
          MonthYearSelectStatefulMenu: {
            props: {
              overrides: {List: {props: {'data-id': 'monthYearSelectMenu'}}},
            },
          },
        }}
      />
    </React.Fragment>
  );
};
