/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { devices } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';
import base from './playwright-base.config';

const config: PlaywrightTestConfig = {
  ...base,
  testDir: 'vrt',
  testMatch: ['tests.vrt.js'],
};

export default config;
