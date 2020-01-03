/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable react/display-name*/

import * as React from 'react';

import {StatefulSlider} from '../index.js';

export const name = 'slider-range';

export const component = () => (
  <div
    style={{
      maxWidth: '500px',
    }}
  >
    <StatefulSlider initialState={{value: [25, 60]}} />
  </div>
);
