/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulSelect} from '../index.js';

export const name = 'select-option-group';

// const options = [
//   {id: 'AliceBlue', color: '#F0F8FF', optgroup: 'Blueish'},
//   {id: 'Aqua', color: '#00FFFF', optgroup: 'Blueish'},
//   {id: 'Aquamarine', color: '#7FFFD4', optgroup: 'Blueish'},
//   {id: 'AntiqueWhite', color: '#FAEBD7', optgroup: 'Whiteish'},
//   {id: 'Azure', color: '#F0FFFF', optgroup: 'Whiteish'},
//   {id: 'Beige', color: '#F5F5DC', optgroup: 'Whiteish'},
//   {id: 'Black', color: '#000000'},
// ];

const options = {
  Blueish: [
    {id: 'AliceBlue', color: '#F0F8FF', optgroup: 'Blueish'},
    {id: 'Aqua', color: '#00FFFF', optgroup: 'Blueish'},
    {id: 'Aquamarine', color: '#7FFFD4', optgroup: 'Blueish'},
  ],
  Whiteish: [
    {id: 'AntiqueWhite', color: '#FAEBD7', optgroup: 'Whiteish'},
    {id: 'Azure', color: '#F0FFFF', optgroup: 'Whiteish'},
    {id: 'Beige', color: '#F5F5DC', optgroup: 'Whiteish'},
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
