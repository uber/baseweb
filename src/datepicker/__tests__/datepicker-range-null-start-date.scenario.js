/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Datepicker} from '../index.js';

export function Scenario() {
  const [value, setValue] = React.useState([null, new Date('June 10, 2021')]);

  return (
    <Datepicker
      aria-label="Select a date"
      clearable={true}
      value={value}
      onChange={({date}) => setValue(date)}
      highlightedDate={new Date('2021-06-03')}
      range
    />
  );
}
