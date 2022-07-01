/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as AppNavBarGetUniqueIdentifier } from './app-nav-bar-get-unique-identifier.scenario.js';
import { Scenario as AppNavBarIconOverrides } from './app-nav-bar-icon-overrides.scenario.js';
import { Scenario as AppNavBarIsMainItemActive } from './app-nav-bar-is-main-item-active.scenario.js';
import { Scenario as AppNavBarMapItemToNode } from './app-nav-bar-map-item-to-node.scenario.js';
import { Scenario as AppNavBarOverrides } from './app-nav-bar-overrides.scenario.js';
import { Scenario as AppNavBarTitleNode } from './app-nav-bar-title-node.scenario.js';
import { Scenario as AppNavBarDefault } from './app-nav-bar.scenario.js';

export const GetUniqueIdentifier = () => <AppNavBarGetUniqueIdentifier />;
export const IconOverrides = () => <AppNavBarIconOverrides />;
export const IsMainItemActive = () => <AppNavBarIsMainItemActive />;
export const MapItemToNode = () => <AppNavBarMapItemToNode />;
export const Overrides = () => <AppNavBarOverrides />;
export const TitleNode = () => <AppNavBarTitleNode />;
export const AppNavBar = () => <AppNavBarDefault />;
