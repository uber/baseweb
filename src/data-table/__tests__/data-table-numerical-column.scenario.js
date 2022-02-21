/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {NUMERICAL_FORMATS, NumericalColumn} from '../index.js';
import {randomLcg, randomBinomial, randomLogNormal, randomInt} from 'd3';

import {precisionData} from './precision-data.js';
const Filter = NumericalColumn({
  title: 'categorical-column',
  mapDataToValue: () => 0,
  format: NUMERICAL_FORMATS.DEFAULT,
}).renderFilter;
const AccountingFilter = NumericalColumn({
  title: 'categorical-column',
  mapDataToValue: () => 0,
  format: NUMERICAL_FORMATS.ACCOUNTING,
}).renderFilter;

const PercentageFilter = NumericalColumn({
  title: 'categorical-column',
  mapDataToValue: () => 0,
  format: NUMERICAL_FORMATS.PERCENTAGE,
}).renderFilter;

const HighPrecisionFilter = NumericalColumn({
  title: 'categorical-column',
  mapDataToValue: () => 0,
  format: NUMERICAL_FORMATS.DEFAULT,
  precision: 4,
}).renderFilter;
const randGen = randomLcg(42);

const smallData = [1, 2, 2, 3, 4, 4, 4];

const defaultData = Array.from(
  {length: 300},
  randomBinomial.source(randGen)(80, 0.9),
);

const accountingData = Array.from(
  {length: 300},
  randomLogNormal.source(randGen)(5, 0.5),
);
const probabilityData = Array.from(
  {length: 300},
  randomInt.source(randGen)(0, 100),
);

export function Scenario() {
  return (
    <div
      style={{
        backgroundColor: 'lightskyblue',
        padding: '24px',
        gap: '24px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div id="default">
        <Filter close={() => {}} setFilter={() => {}} data={defaultData} />
      </div>
      <div id="accounting">
        <AccountingFilter
          close={() => {}}
          setFilter={() => {}}
          data={accountingData}
        />
      </div>
      <div id="percentage">
        <PercentageFilter
          close={() => {}}
          setFilter={() => {}}
          data={probabilityData}
        />
      </div>
      <div id="small">
        <Filter close={() => {}} setFilter={() => {}} data={smallData} />
      </div>

      <div id="ts">
        <HighPrecisionFilter
          close={() => {}}
          setFilter={() => {}}
          data={precisionData}
        />
      </div>
    </div>
  );
}
