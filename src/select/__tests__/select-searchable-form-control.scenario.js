/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {FormControl} from '../../form-control/index.js';
import {Select} from '../index.js';

const options = [
  {label: 'AliceBlue', id: '#F0F8FF'},
  {label: 'AntiqueWhite', id: '#FAEBD7'},
  {label: 'Aqua', id: '#00FFFF'},
  {label: 'Aquamarine', id: '#7FFFD4'},
  {label: 'Azure', id: '#F0FFFF'},
  {label: 'Beige', id: '#F5F5DC'},
];

export function Scenario() {
  const [value, setValue] = React.useState([]);

  return (
    <div>
      <div id="click-outside">click outside element</div>

      <FormControl label="not searchable">
        <Select
          id="colors-not-searchable"
          clearable={false}
          searchable={false}
          placeholder="Select color"
          value={value}
          options={options}
          onChange={(params) => setValue(params.value)}
        />
      </FormControl>

      <FormControl label="searchable">
        <Select
          id="colors-searchable"
          clearable={false}
          placeholder="Select color"
          value={value}
          options={options}
          onChange={(params) => setValue(params.value)}
        />
      </FormControl>

      <label htmlFor="not-searchable-native-label">
        Native not searchable
        <Select
          id="not-searchable-native-label"
          clearable={false}
          searchable={false}
          placeholder="Select color"
          value={value}
          options={options}
          onChange={(params) => setValue(params.value)}
        />
      </label>

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        Native searchable
        <Select
          clearable={false}
          searchable={true}
          placeholder="Select color"
          value={value}
          options={options}
          onChange={(params) => setValue(params.value)}
        />
      </label>

      <div id="no-label-not-searchable">
        <p>no label not searchable</p>
        <Select
          clearable={false}
          searchable={false}
          placeholder="Select color"
          value={value}
          options={options}
          onChange={(params) => setValue(params.value)}
        />
      </div>

      <div id="no-label-searchable">
        <p>no label</p>
        <Select
          clearable={false}
          searchable={true}
          placeholder="Select color"
          value={value}
          options={options}
          onChange={(params) => setValue(params.value)}
        />
      </div>
    </div>
  );
}
