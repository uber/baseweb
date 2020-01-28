/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {NumericalColumn} from '../index.js';

const Column = NumericalColumn({
  title: 'categorical-column',
  mapDataToValue: () => 0,
});

const Filter = Column.renderFilter;

export const name = 'data-table-numerical-column';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const component = () => {
  return (
    <div style={{backgroundColor: 'lightskyblue', padding: '24px'}}>
      <div id="many-categories">
        <Filter close={() => {}} setFilter={() => {}} data={data} />
      </div>
    </div>
  );
};
