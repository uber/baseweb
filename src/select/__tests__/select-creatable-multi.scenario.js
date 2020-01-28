/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulSelect} from '../index.js';

export const name = 'select-creatable-multi';

export const component = () => (
  <StatefulSelect
    creatable
    multi
    options={[{id: 'Portland', label: 'Portland'}]}
    labelKey="label"
    valueKey="id"
    overrides={{ValueContainer: {props: {'data-id': 'selected'}}}}
  />
);
