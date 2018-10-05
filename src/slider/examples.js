/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable react/display-name*/

import * as React from 'react';
// Styled elements
import {StatefulSlider as Slider} from './index';

export const suite = 'Slider Test Suite';
export const tests = {
  AS_SIMPLE_SLIDER: 'Simple slider example',
  AS_SIMPLE_RANGE_SLIDER: 'Simple range slider',
  AS_SIMPLE_RANGE_SLIDER_WITH_STEP: 'Simple range slider with step=20',
  AS_RANGE_SLIDER_WITH_MANY_TICKS: 'Range slider with many ticks',
};

export default {
  [tests.AS_SIMPLE_SLIDER]: () => {
    return (
      <div
        style={{
          width: '300px',
        }}
      >
        <Slider value={[60]} range={[0, 100]} />
      </div>
    );
  },
  [tests.AS_SIMPLE_RANGE_SLIDER]: () => {
    return (
      <div
        style={{
          width: '300px',
        }}
      >
        <Slider value={[25, 60]} range={[0, 100]} />
      </div>
    );
  },
  [tests.AS_SIMPLE_RANGE_SLIDER_WITH_STEP]: () => {
    return (
      <div
        style={{
          width: '300px',
        }}
      >
        <Slider value={[20, 70]} step={20} range={[0, 100]} />
      </div>
    );
  },
  [tests.AS_RANGE_SLIDER_WITH_MANY_TICKS]: () => {
    return (
      <div
        style={{
          width: '300px',
        }}
      >
        <Slider value={[25, 70]} range={[0, 20, 40, 60, 80, 100]} />
      </div>
    );
  },
};
