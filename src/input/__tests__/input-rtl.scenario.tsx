/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { ThemeProvider, LightTheme } from '../../index.js';
import { Scenario as BasicInputScenario } from './input.scenario.js';
import { Scenario as ClearableScenario } from './input-clearable.scenario.js';
import { Scenario as PasswordScenario } from './input-password.scenario.js';
import { Scenario as EnhancerScenario } from './input-before-after.scenario.js';
import { Scenario as StatesScenario } from './input-states.scenario.js';

export function Scenario() {
  return (
    <ThemeProvider theme={{ ...LightTheme, direction: 'rtl' }}>
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
