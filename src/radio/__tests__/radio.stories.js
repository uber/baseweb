/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import RadioStates from './radio-states.scenario.js';
import RadioDefault from './radio.scenario.js';
import RadioBasic from './radio-basic.scenario.js';

export const States = () => <RadioStates />;
export const Radio = () => <RadioDefault />;
export const Basic = () => <RadioBasic />;
