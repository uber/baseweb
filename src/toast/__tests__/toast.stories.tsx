/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as ToastDefault } from './toast.scenario';
import { Scenario as ToastApplicationState } from './toast-application-state.scenario';
import { Scenario as ToasterFocusScenario } from './toaster-focus.scenario';
import { Scenario as ToasterScenario } from './toaster.scenario';

export const Toast = () => <ToastDefault />;
export const ApplicationState = () => <ToastApplicationState />;
export const ToasterFocus = () => <ToasterFocusScenario />;
export const Toaster = () => <ToasterScenario />;
