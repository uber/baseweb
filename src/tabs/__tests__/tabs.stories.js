/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as TabsControlled } from './tabs-controlled.scenario.js';
import { Scenario as TabsOneChild } from './tabs-one-child.scenario.js';
import { Scenario as TabsDefault } from './tabs.scenario.js';

export const Controlled = () => <TabsControlled />;
export const OneChild = () => <TabsOneChild />;
export const Tabs = () => <TabsDefault />;

export default {
  title: 'Tabs',
};
