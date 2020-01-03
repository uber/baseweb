/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {component as ButtonScenario} from './button.scenario.js';
import {ThemeProvider, LightTheme} from '../../index.js';

export const name = 'button-rtl';

export const component = () => (
  <ThemeProvider theme={{...LightTheme, direction: 'rtl'}}>
    <div dir="rtl">
      <ButtonScenario />
    </div>
  </ThemeProvider>
);
