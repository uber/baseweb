/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {ThemeProvider, LightTheme} from '../../index.js';
import {Scenario as MenuScenario} from './menu.scenario.js';
import {Scenario as MenuNestedScenario} from './menu-child.scenario.js';

export function Scenario() {
  return (
    <ThemeProvider theme={{...LightTheme, direction: 'rtl'}}>
      <div dir="rtl">
        <MenuNestedScenario />
        <br />
        <MenuScenario />
      </div>
    </ThemeProvider>
  );
}
