/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as BreadcrumbsIconOverrides } from './breadcrumbs-icon-overrides.scenario';
import { Scenario as BreadcrumbsPseudo } from './breadcrumbs-pseudo.scenario';
import { Scenario as BreadcrumbsTrailing } from './breadcrumbs-trailing.scenario';
import { Scenario as BreadcrumbsDefault } from './breadcrumbs.scenario';

export const IconOverrides = () => <BreadcrumbsIconOverrides />;
export const Pseudo = () => <BreadcrumbsPseudo />;
export const Trailing = () => <BreadcrumbsTrailing />;
export const Breadcrumbs = () => <BreadcrumbsDefault />;
