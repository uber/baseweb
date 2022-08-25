/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { DatetimeColumn } from '..';

const Column = DatetimeColumn({
  title: 'categorical-column',
  mapDataToValue: () => new Date(),
});

const Filter = Column.renderFilter;

const padZero = (n) => (n < 10 ? `0${n}` : n);
const data = [1, 2, 3, 4, 5, 6, 7, 7, 8, 8, 9].map((i) => {
  return new Date(`201${i}-04-${padZero(i)}T10:${10 + i}:30Z`);
});

export function Scenario() {
  return (
    <div style={{ backgroundColor: '#FFD700', padding: '24px' }}>
      <div>
        <Filter close={() => {}} setFilter={() => {}} data={data} />
      </div>
    </div>
  );
}
