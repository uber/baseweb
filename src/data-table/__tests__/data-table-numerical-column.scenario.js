/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {NumericalColumn} from '../index.js';
import {randomLcg, randomBinomial} from 'd3';

const Column = NumericalColumn({
  title: 'categorical-column',
  mapDataToValue: () => 0,
});

const Filter = Column.renderFilter;
const randGen = randomLcg(42);

const data = Array.from({length: 300}, randomBinomial.source(randGen)(80, 0.8));

export function Scenario() {
  return (
    <div style={{backgroundColor: 'lightskyblue', padding: '24px'}}>
      <div id="many-categories">
        <Filter close={() => {}} setFilter={() => {}} data={data} />
      </div>
    </div>
  );
}
