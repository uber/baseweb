/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Datepicker } from '../index';

export function Scenario() {
  const [date, setDate] = React.useState(new Date('2020/01/10'));
  const [range, setRange] = React.useState([new Date('2020/10/10'), new Date('2020/10/11')]);

  return (
    <div>
      <p>null mask</p>
      <Datepicker
        aria-label="Select a date"
        value={date}
        onChange={({ date }) => setDate(date)}
        mask={null}
      />

      <p>mask from formatString</p>
      <Datepicker
        aria-label="Select a date"
        value={date}
        onChange={({ date }) => setDate(date)}
        formatString="dd MM yyyy"
        placeholder="dd mm yyyy"
      />

      <p>mask from a different formatString</p>
      <Datepicker
        aria-label="Select a date"
        value={date}
        onChange={({ date }) => setDate(date)}
        formatString="EEEE, MMMM dd yyyy"
        placeholder="EEEE, MMMM dd yyyy"
      />

      <p>null mask and custom formatString</p>
      <Datepicker
        aria-label="Select a date"
        value={date}
        onChange={({ date }) => setDate(date)}
        formatString="dd.MM.yyyy"
        placeholder="dd.mm.yyyy"
        mask={null}
      />

      <p>null mask and single digit formatString</p>
      <Datepicker
        aria-label="Select a date"
        value={date}
        onChange={({ date }) => setDate(date)}
        formatString="d.M.yyyy"
        placeholder="dd.mm.yyyy"
        mask={null}
      />

      <p>hypen to en dash</p>
      <Datepicker
        aria-label="Select a date"
        value={range}
        onChange={({ date }) => setRange(date)}
        mask="9999/99/99 - 9999/99/99"
        range
      />

      <p>em dash to en dash</p>
      <Datepicker
        aria-label="Select a date"
        value={range}
        onChange={({ date }) => setRange(date)}
        mask="9999/99/99 — 9999/99/99"
        range
      />
    </div>
  );
}
