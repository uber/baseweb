/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulCalendar, ORIENTATION} from '../index.js';

export const name = 'calendar-multi-month';

export const component = () => (
  <StatefulCalendar
    onChange={({date}) => console.log(date)}
    orientation={ORIENTATION.horizontal}
    highlightedDate={new Date('March 10, 2019')}
    monthsShown={3}
    range
    quickSelect
  />
);
