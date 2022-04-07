/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import RadioSelect from './radio-select.scenario.js';
import RadioStates from './radio-states.scenario.js';
import RadioDefault from './radio.scenario.js';

export const States = () => <RadioStates />;
export const Select = () => <RadioSelect />;
export const Radio = () => <RadioDefault />;
