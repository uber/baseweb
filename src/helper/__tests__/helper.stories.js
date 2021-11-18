/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Scenario as HelperPosition} from './helper-position.scenario.js';
import {Scenario as HelperSteps} from './helper-steps.scenario.js';
import {Scenario as HelperWithSteps} from './helper-with-steps.scenario.js';

export const Position = () => <HelperPosition />;
export const Steps = () => <HelperSteps />;
export const WithSteps = () => <HelperWithSteps />;
