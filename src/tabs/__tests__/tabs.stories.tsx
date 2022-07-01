/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as TabsControlled } from './tabs-controlled.scenario';
import { Scenario as TabsOneChild } from './tabs-one-child.scenario';
import { Scenario as TabsDefault } from './tabs.scenario';

export const Controlled = () => <TabsControlled />;
export const OneChild = () => <TabsOneChild />;
export const Tabs = () => <TabsDefault />;
