/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {LightTheme, ThemeProvider} from '../../index.js';
import EnhancerScenario from './input-before-after.scenario.js';
import ClearableScenario from './input-clearable.scenario.js';
import PasswordScenario from './input-password.scenario.js';
import StatesScenario from './input-states.scenario.js';
import BasicInputScenario from './input.scenario.js';

export default function Scenario() {
  return (
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
}
