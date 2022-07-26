/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { devices } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';
import base from './playwright-base.config';

const config: PlaywrightTestConfig = {
  ...base,
  testMatch: ['**/__tests__/*.e2e.ts'],
};

export default config;
