/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as IconAttributes } from './icon-attributes.scenario.js';
import { Scenario as IconButtons } from './icon-buttons.scenario.js';
import { Scenario as IconOverrides } from './icon-overrides.scenario.js';

export const Attributes = () => <IconAttributes />;
export const Buttons = () => <IconButtons />;
export const Overrides = () => <IconOverrides />;

export default {
  title: 'Icon',
};
