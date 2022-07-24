/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as SnackbarAsync } from './snackbar-async.scenario';
import { Scenario as SnackbarElementOverrides } from './snackbar-element-overrides.scenario';
import { Scenario as SnackbarElement } from './snackbar-element.scenario';
import { Scenario as SnackbarPlacement } from './snackbar-placement.scenario';
import { Scenario as SnackbarProviderOverrides } from './snackbar-provider-overrides.scenario';
import { Scenario as SnackbarProvider } from './snackbar-provider.scenario';

export const Async = () => <SnackbarAsync />;
export const ElementOverrides = () => <SnackbarElementOverrides />;
export const Element = () => <SnackbarElement />;
export const Placement = () => <SnackbarPlacement />;
export const ProviderOverrides = () => <SnackbarProviderOverrides />;
export const Provider = () => <SnackbarProvider />;
