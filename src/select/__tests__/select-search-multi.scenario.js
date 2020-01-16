/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulSelect, TYPE} from '../index.js';

export const name = 'select-search-multi';

export const component = () => (
  <StatefulSelect
    options={[
      {id: 'AliceBlue', color: '#F0F8FF'},
      {id: 'AntiqueWhite', color: '#FAEBD7'},
      {id: 'Aqua', color: '#00FFFF'},
      {id: 'Aquamarine', color: '#7FFFD4'},
      {id: 'Azure', color: '#F0FFFF'},
      {id: 'Beige', color: '#F5F5DC'},
      {id: 'DarkBlue', color: '#00008B'},
      {id: 'DarkCyan', color: '#008B8B'},
    ]}
    overrides={{ValueContainer: {props: {'data-id': 'selected'}}}}
    closeOnSelect={false}
    labelKey="id"
    multi
    valueKey="color"
    type={TYPE.search}
  />
);
