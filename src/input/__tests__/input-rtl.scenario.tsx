/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { ThemeProvider, LightTheme } from '../..';
import { Scenario as BasicInputScenario } from './input.scenario';
import { Scenario as ClearableScenario } from './input-clearable.scenario';
import { Scenario as PasswordScenario } from './input-password.scenario';
import { Scenario as EnhancerScenario } from './input-before-after.scenario';
import { Scenario as StatesScenario } from './input-states.scenario';

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
