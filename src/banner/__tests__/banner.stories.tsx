/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import { Scenario as BannerScenario } from './banner.scenario.js';
import { Scenario as BannerActionBelowScenario } from './banner-action-below.scenario.js';
import { Scenario as BannerArtworkScenario } from './banner-artwork.scenario.js';
import { Scenario as BannerOverridesScenario } from './banner-overrides.scenario.js';
import { Scenario as BannerNestedScenario } from './banner-nested.scenario.js';

export const Banner = () => <BannerScenario />;
export const BannerActionBelow = () => <BannerActionBelowScenario />;
export const BannerArtwork = () => <BannerArtworkScenario />;
export const BannerOverrides = () => <BannerOverridesScenario />;
export const BannerNested = () => <BannerNestedScenario />;
