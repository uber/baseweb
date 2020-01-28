/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount, shallow} from 'enzyme';

import {
  Table,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
} from '../index.js';

const DATA = [
  ['1', 'Sarah', 'Brown', 31, '100 Broadway st. New York City, New York'],
  ['2', 'Jane', 'Smith', 32, '100 Market st. San Francisco, California'],
  ['3', 'Joe', 'Black', 33, '100 Macquarie st. Sydney, Australia'],
];

const COLUMNS = ['ID', 'First Name', 'Last Name', 'Age', 'Address'];

describe('Table', () => {
  it('renders expected number of rows', () => {
    const wrapper = shallow(<Table columns={COLUMNS} data={DATA} />);

    expect(wrapper.find(StyledRow)).toHaveLength(DATA.length);
  });

  it('renders expected number of columns', () => {
    const wrapper = shallow(<Table columns={COLUMNS} data={DATA} />);
    const cells = wrapper
      .find(StyledRow)
      .first()
      .find(StyledCell);

    expect(cells).toHaveLength(DATA[0].length);
  });

  it('applies correct aria attributes to table container', () => {
    const wrapper = mount(<Table columns={COLUMNS} data={DATA} />);
    expect(wrapper.getDOMNode().getAttribute('role')).toBe('grid');
    expect(wrapper.getDOMNode().getAttribute('aria-colcount')).toBe(
      COLUMNS.length.toString(),
    );
    expect(wrapper.getDOMNode().getAttribute('aria-rowcount')).toBe(
      DATA.length.toString(),
    );
  });

  it('applies correct role attribute to table head', () => {
    const wrapper = mount(<Table columns={COLUMNS} data={DATA} />);
    const head = wrapper.find(StyledHead);

    expect(head.getDOMNode().getAttribute('role')).toBe('row');
  });

  it('applies correct role attribute to table head cell', () => {
    const wrapper = mount(<Table columns={COLUMNS} data={DATA} />);
    const headCell = wrapper.find(StyledHeadCell).first();

    expect(headCell.getDOMNode().getAttribute('role')).toBe('columnheader');
  });

  it('applies correct role attribute to table body', () => {
    const wrapper = mount(<Table columns={COLUMNS} data={DATA} />);
    const body = wrapper.find(StyledBody);

    expect(body.getDOMNode().getAttribute('role')).toBe('rowgroup');
  });

  it('applies correct role attribute to table row', () => {
    const wrapper = mount(<Table columns={COLUMNS} data={DATA} />);
    const row = wrapper.find(StyledRow).first();

    expect(row.getDOMNode().getAttribute('role')).toBe('row');
  });

  it('applies correct role attribute to table cell', () => {
    const wrapper = mount(<Table columns={COLUMNS} data={DATA} />);
    const cell = wrapper.find(StyledCell).first();

    expect(cell.getDOMNode().getAttribute('role')).toBe('gridcell');
  });
});
