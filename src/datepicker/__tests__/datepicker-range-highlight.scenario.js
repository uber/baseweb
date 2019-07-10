/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
// eslint-disable-next-line import/extensions
import Screener, {Steps} from 'screener-storybook/src/screener';
import {StatefulDatepicker} from '../index.js';

export const name = 'datepicker-range-highlight';

export const component = () => {
  const input = 'input';
  const calendar = '[role="application"]';
  const rightArrow = '[aria-label="Next month"]';
  return (
    <Screener
      steps={new Steps()
        .wait(input)
        .click(input)
        .wait(calendar)
        .click(rightArrow)
        .snapshot('Datepicker range (no highlight)')
        .end()}
    >
      <StatefulDatepicker
        aria-label="Select a date"
        initialState={{value: []}}
        range
        highlightedDate={new Date('March 10, 2019')}
      />
    </Screener>
  );
};
