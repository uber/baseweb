/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Datepicker } from '..';
import { Button } from '../../button';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

const adapter = new MomentUtils({});

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
        // @ts-expect-error todo(flow->ts)
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
