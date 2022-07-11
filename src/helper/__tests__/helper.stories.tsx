/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as HelperPosition } from './helper-position.scenario';
import { Scenario as HelperSteps } from './helper-steps.scenario';
import { Scenario as HelperWithSteps } from './helper-with-steps.scenario';

export const Position = () => <HelperPosition />;
export const Steps = () => <HelperSteps />;
export const WithSteps = () => <HelperWithSteps />;
