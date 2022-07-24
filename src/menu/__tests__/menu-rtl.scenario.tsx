/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { ThemeProvider, LightTheme } from '../..';
import { Scenario as MenuScenario } from './menu.scenario';
import { Scenario as MenuNestedScenario } from './menu-child.scenario';

export function Scenario() {
  return (
    <ThemeProvider theme={{ ...LightTheme, direction: 'rtl' }}>
      <div dir="rtl">
        <MenuNestedScenario />
        <br />
        <MenuScenario />
      </div>
    </ThemeProvider>
  );
}
