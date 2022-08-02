/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { devices } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';
import base from './playwright-base.config';

const reporter = [];
if (process.env.CI) {
  reporter.push(['dot']);
} else {
  reporter.push(['list']);
  reporter.push(['html', { open: 'never', outputFolder: './__artifacts__/playright-report' }]);
}

const config: PlaywrightTestConfig = {
  ...base,
  reporter,
  testMatch: ['**/__tests__/*.e2e.ts'],
};

export default config;
