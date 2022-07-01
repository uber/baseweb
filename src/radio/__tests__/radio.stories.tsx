/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as RadioSelect } from './radio-select.scenario';
import { Scenario as RadioStates } from './radio-states.scenario';
import { Scenario as RadioDefault } from './radio.scenario';

export const States = () => <RadioStates />;
export const Select = () => <RadioSelect />;
export const Radio = () => <RadioDefault />;
