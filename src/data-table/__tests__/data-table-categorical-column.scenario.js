/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {CategoricalColumn} from '../index.js';

const Column = CategoricalColumn({title: 'categorical-column'});

const Filter = Column.renderFilter;

export const name = 'data-table-categorical-column';

const data = [
  'Bike',
  'Scooter',
  'Truck',
  'AIR Taxi',
  'Transit',
  'Taxi',
  'UberX',
  'UberXL',
  'Uber Select',
  'Uber Comfort',
  'Uber Pool',
  'Uber Black',
  'Uber Black SUV',
  'Uber Assist',
  'Uber WAV',
];

export const component = () => {
  return (
    <div style={{backgroundColor: 'lightgreen', padding: '24px'}}>
      <Filter close={() => {}} setFilter={() => {}} data={data} />
    </div>
  );
};
