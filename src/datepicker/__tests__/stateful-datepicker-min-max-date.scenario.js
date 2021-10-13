/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulDatepicker} from '../index.js';

export default function Scenario() {
  return (
    <div>
      <p>Available dates: May 15, 2019 - August 15, 2024</p>
      <StatefulDatepicker
        minDate={new Date(2019, 4, 15)}
        maxDate={new Date(2024, 7, 15)}
        overrides={{
          MonthYearSelectButton: {props: {'data-id': 'monthYearSelectButton'}},
          MonthYearSelectStatefulMenu: {
            props: {
              overrides: {List: {props: {'data-id': 'monthYearSelectMenu'}}},
            },
          },
        }}
      />
    </div>
  );
}
