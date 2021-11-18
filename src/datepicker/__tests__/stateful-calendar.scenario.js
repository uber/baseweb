/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulCalendar} from '../index.js';

export function Scenario() {
  return (
    <>
      <StatefulCalendar highlightedDate={new Date('2019-02-14T10:00:00Z')} />
      <br />
      <StatefulCalendar
        maxDate={new Date('2001-01-30T07:00:00')}
        minDate={new Date('1999-01-01T07:00:00')}
        initialState={{
          value: new Date('2000-01-01T07:00:00'),
        }}
      />
    </>
  );
}
