/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import { Datepicker } from '../index.js';
import { Button } from '../../button/index.js';
import MomentUtils from '@date-io/moment';
const adapter = new MomentUtils({});
import moment from 'moment';

export function Scenario() {
  const [date, setDate] = React.useState(null);
  const [momentDate, setMomentDate] = React.useState(null);

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
        onChange={({ date }) => setDate(date)}
        overrides={{
          MonthYearSelectButton: { props: { 'data-id': 'monthYearSelectButton' } },
          MonthYearSelectStatefulMenu: {
            props: {
              overrides: { List: { props: { 'data-id': 'monthYearSelectMenu' } } },
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
          MonthYearSelectButton: { props: { 'data-id': 'monthYearSelectButton' } },
          MonthYearSelectStatefulMenu: {
            props: {
              overrides: { List: { props: { 'data-id': 'monthYearSelectMenu' } } },
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
          MonthYearSelectButton: { props: { 'data-id': 'monthYearSelectButton' } },
          MonthYearSelectStatefulMenu: {
            props: {
              overrides: { List: { props: { 'data-id': 'monthYearSelectMenu' } } },
            },
          },
        }}
      />

      <span>Moment</span>
      <Datepicker
        adapter={adapter}
        aria-label="Select a date"
        aria-describedby="moment-datepicker"
        highlightedDate={moment('March 10, 2019')}
        value={momentDate}
        onChange={({ date }) => setMomentDate(date)}
        overrides={{
          MonthYearSelectButton: { props: { 'data-id': 'monthYearSelectButton' } },
          MonthYearSelectStatefulMenu: {
            props: {
              overrides: { List: { props: { 'data-id': 'monthYearSelectMenu' } } },
            },
          },
        }}
      />
    </React.Fragment>
  );
}
