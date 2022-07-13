/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Scenario as ButtonScenario } from './button.scenario';
import { ThemeProvider, LightTheme } from '../..';

export function Scenario() {
  return (
    <ThemeProvider theme={{ ...LightTheme, direction: 'rtl' }}>
      <div dir="rtl">
        <ButtonScenario />
      </div>
    </ThemeProvider>
  );
}
