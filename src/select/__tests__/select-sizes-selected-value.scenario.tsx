/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { Select, SIZE } from '../index';

const options = [
  { id: 'AliceBlue', color: '#F0F8FF' },
  { id: 'AntiqueWhite', color: '#FAEBD7' },
  { id: 'Aqua', color: '#00FFFF' },
  { id: 'Aquamarine', color: '#7FFFD4' },
  { id: 'Azure', color: '#F0FFFF' },
  { id: 'Beige', color: '#F5F5DC' },
];

const value = [{ color: '#F0FFFF' }];

export function Scenario() {
  return (
    <div style={{ width: '400px' }}>
      <Select size={SIZE.mini} options={options} value={value} labelKey="id" valueKey="color" />

      <br />
      <Select size={SIZE.compact} options={options} value={value} labelKey="id" valueKey="color" />

      <br />
      <Select size={SIZE.default} options={options} value={value} labelKey="id" valueKey="color" />

      <br />
      <Select size={SIZE.large} options={options} value={value} labelKey="id" valueKey="color" />
    </div>
  );
}
