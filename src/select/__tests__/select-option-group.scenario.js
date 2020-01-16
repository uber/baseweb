/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulSelect} from '../index.js';

export const name = 'select-option-group';

const options = {
  __ungrouped: [{id: 'Black', color: '#000000'}],
  Blueish: [
    {id: 'AliceBlue', color: '#F0F8FF'},
    {id: 'Aqua', color: '#00FFFF'},
    {id: 'Aquamarine', color: '#7FFFD4'},
  ],
  Whiteish: [
    {id: 'AntiqueWhite', color: '#FAEBD7'},
    {id: 'Azure', color: '#F0FFFF'},
    {id: 'Beige', color: '#F5F5DC'},
  ],
};

export const component = () => (
  <StatefulSelect
    aria-label="Select a color"
    options={options}
    labelKey="id"
    valueKey="color"
    overrides={{ValueContainer: {props: {'data-id': 'selected'}}}}
  />
);
