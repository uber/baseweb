/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {CategoricalColumn} from '../index.js';

const Column = CategoricalColumn({
  title: 'categorical-column',
  mapDataToValue: () => '',
});

const Filter = Column.renderFilter;

export const name = 'data-table-categorical-column';

const dataLong = [
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

const dataShort = [
  'Bike',
  'Scooter',
  'Truck',
  'AIR Taxi',
  'Transit',
  'Taxi',
  'UberX',
];

export const component = () => {
  return (
    <div style={{backgroundColor: 'lightgreen', padding: '24px'}}>
      <div id="many-categories">
        <Filter close={() => {}} setFilter={() => {}} data={dataLong} />
      </div>
      <div style={{height: '48px'}} />
      <div id="few-categories">
        <Filter close={() => {}} setFilter={() => {}} data={dataShort} />
      </div>
    </div>
  );
};
