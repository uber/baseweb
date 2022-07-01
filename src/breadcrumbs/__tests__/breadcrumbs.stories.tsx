/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as BreadcrumbsIconOverrides } from './breadcrumbs-icon-overrides.scenario.js';
import { Scenario as BreadcrumbsPseudo } from './breadcrumbs-pseudo.scenario.js';
import { Scenario as BreadcrumbsTrailing } from './breadcrumbs-trailing.scenario.js';
import { Scenario as BreadcrumbsDefault } from './breadcrumbs.scenario.js';

export const IconOverrides = () => <BreadcrumbsIconOverrides />;
export const Pseudo = () => <BreadcrumbsPseudo />;
export const Trailing = () => <BreadcrumbsTrailing />;
export const Breadcrumbs = () => <BreadcrumbsDefault />;
