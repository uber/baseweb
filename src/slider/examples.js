/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable react/display-name*/

import * as React from 'react';
// Styled elements
import {StatefulSlider as Slider} from './index.js';
import tests from './examples-list.js';
export const suite = 'Slider Test Suite';

export default {
  [tests.AS_SIMPLE_SLIDER]: () => {
    return (
      <div
        style={{
          maxWidth: '500px',
        }}
      >
        <Slider />
      </div>
    );
  },
  [tests.AS_SIMPLE_RANGE_SLIDER]: () => {
    return (
      <div
        style={{
          maxWidth: '500px',
        }}
      >
        <Slider initialState={{value: [25, 60]}} />
      </div>
    );
  },
  [tests.AS_DISABLED]: () => {
    return (
      <div
        style={{
          maxWidth: '500px',
        }}
      >
        <Slider initialState={{value: [50]}} disabled />
      </div>
    );
  },
  [tests.AS_CUSTOM_RANGE_AND_STEP]: () => {
    return (
      <div
        style={{
          maxWidth: '500px',
        }}
      >
        <Slider initialState={{value: [0]}} step={5} min={-300} max={300} />
      </div>
    );
  },
  [tests.AS_SLIDER_WITH_OVERRIDES]: () => {
    return (
      <div
        style={{
          maxWidth: '500px',
        }}
      >
        <Slider
          initialState={{value: [50]}}
          overrides={{
            InnerThumb: ({$value, $thumbIndex}) => $value[$thumbIndex],
            ThumbValue: () => null,
            Thumb: {
              style: ({$value, $thumbIndex, $min, $max}) => ({
                height: '36px',
                width: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '36px',
                border: '3px solid #ccc',
                backgroundColor: '#fff',
              }),
            },
          }}
        />
      </div>
    );
  },
};
