/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulSelect} from '../index.js';

export const name = 'select-creatable-multi';

export const component = () => (
  <StatefulSelect
    creatable
    multi
    options={[
      {id: 'Portland', label: 'Portland'},
      {id: 'NYC', label: 'New York City'},
      {id: 'LosAngeles', label: 'Los Angeles'},
      {id: 'Boston', label: 'Boston'},
      {id: 'Atlanta', label: 'Atlanta'},
      {id: 'SanFrancisco', label: 'San Francisco'},
    ]}
    labelKey="label"
    valueKey="id"
    overrides={{ValueContainer: {props: {'data-id': 'selected'}}}}
  />
);
