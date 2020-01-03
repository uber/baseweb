/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {shallow} from 'enzyme';

import {
  Unstable_Table,
  StyledTableBodyRow,
  StyledTableBodyCell,
} from '../index.js';

const COLUMNS = ['ID', 'First Name', 'Last Name', 'Age', 'Address'];

const DATA = [
  ['1', 'Sarah', 'Brown', 31, '100 Broadway st. New York City, New York'],
  ['2', 'Jane', 'Smith', 32, '100 Market st. San Francisco, California'],
  ['3', 'Joe', 'Black', 33, '100 Macquarie st. Sydney, Australia'],
];

describe('Table Semantic', () => {
  it('renders expected number of rows', () => {
    const wrapper = shallow(<Unstable_Table columns={COLUMNS} data={DATA} />);

    expect(wrapper.find(StyledTableBodyRow)).toHaveLength(DATA.length);
  });

  it('renders expected number of columns', () => {
    const wrapper = shallow(<Unstable_Table columns={COLUMNS} data={DATA} />);
    const cells = wrapper
      .find(StyledTableBodyRow)
      .first()
      .find(StyledTableBodyCell);

    expect(cells).toHaveLength(DATA[0].length);
  });
});
