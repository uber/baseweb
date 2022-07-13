/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { ThemeProvider, LightTheme } from '../..';
import { Scenario as PaymentScenario } from './payment-card.scenario';

export function Scenario() {
  return (
    <ThemeProvider theme={{ ...LightTheme, direction: 'rtl' }}>
      <div dir="rtl">
        <PaymentScenario />
      </div>
    </ThemeProvider>
  );
}
