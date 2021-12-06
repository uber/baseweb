/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {TimePicker} from '../index.js';

const value = new Date('December 6, 2021 11:02:00');
const min = new Date('December 4, 2021 8:02:00');
const max = new Date('December 8, 2021 18:02:00');

export function Scenario() {
  return (
    <div>
      <p>min date: {min.toString()}</p>
      <p>max date: {max.toString()}</p>
      <TimePicker minTime={min} maxTime={max} value={value} />
    </div>
  );
}
