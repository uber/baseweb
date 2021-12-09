/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {TimePicker} from '../index.js';

export function Scenario() {
  return (
    <div>
      <div id="default">
        <TimePicker
          minTime={new Date('December 4, 2021 8:02:00')}
          maxTime={new Date('December 8, 2021 18:02:00')}
          value={new Date('December 6, 2021 11:02:00')}
        />
      </div>

      <div id="max-after-current">
        <TimePicker
          minTime={new Date('December 6, 2021 8:02:00')}
          maxTime={new Date('December 8, 2021 18:02:00')}
          value={new Date('December 6, 2021 11:02:00')}
        />
      </div>

      <div id="min-before-current">
        <TimePicker
          minTime={new Date('December 4, 2021 8:02:00')}
          maxTime={new Date('December 6, 2021 18:02:00')}
          value={new Date('December 6, 2021 11:02:00')}
        />
      </div>

      <div id="ignore-min-max-date">
        <TimePicker
          ignoreMinMaxDateComponent
          minTime={new Date('December 4, 2021 8:02:00')}
          maxTime={new Date('December 8, 2021 18:02:00')}
          value={new Date('December 6, 2021 11:02:00')}
        />
      </div>

      <div id="max-time-lands-on-step">
        <TimePicker
          ignoreMinMaxDateComponent
          minTime={new Date('December 4, 2021 8:00:00')}
          maxTime={new Date('December 8, 2021 10:00:00')}
          value={new Date('December 6, 2021 9:02:00')}
        />
      </div>

      <div id="test">
        <TimePicker
          ignoreMinMaxDateComponent
          minTime={new Date('December 4, 2021 8:00:00')}
          maxTime={new Date('December 8, 2021 10:00:00')}
          value={new Date('December 6, 2021 9:00:00')}
        />
      </div>
    </div>
  );
}
