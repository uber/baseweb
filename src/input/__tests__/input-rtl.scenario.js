/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {ThemeProvider, LightTheme} from '../../index.js';
import {component as BasicInputScenario} from './input.scenario.js';
import {component as ClearableScenario} from './input-clearable.scenario.js';
import {component as PasswordScenario} from './input-password.scenario.js';
import {component as EnhancerScenario} from './input-before-after.scenario.js';
import {component as StatesScenario} from './input-states.scenario.js';

export const name = 'input-rtl';

export const component = () => (
  <ThemeProvider theme={{...LightTheme, direction: 'rtl'}}>
    <div dir="rtl">
      <BasicInputScenario />
      <br />
      <EnhancerScenario />
      <br />
      <ClearableScenario />
      <br />
      <PasswordScenario />
      <br />
      <StatesScenario />
    </div>
  </ThemeProvider>
);
