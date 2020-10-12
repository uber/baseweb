/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {shallow, mount} from 'enzyme';

import {
  Table,
  StyledTableBody,
  StyledTableBodyRow,
  StyledTableBodyCell,
  StyledTableLoadingMessage,
  StyledTableEmptyMessage,
} from '../index.js';

const COLUMNS = ['ID', 'First Name', 'Last Name', 'Age', 'Address'];

const DATA = [
  ['1', 'Sarah', 'Brown', 31, '100 Broadway st. New York City, New York'],
  ['2', 'Jane', 'Smith', 32, '100 Market st. San Francisco, California'],
  ['3', 'Joe', 'Black', 33, '100 Macquarie st. Sydney, Australia'],
];

describe('Table Semantic', () => {
  it('renders expected number of rows', () => {
    const wrapper = shallow(<Table columns={COLUMNS} data={DATA} />);

    expect(wrapper.find(StyledTableBodyRow)).toHaveLength(DATA.length);
  });

  it('renders expected number of columns', () => {
    const wrapper = shallow(<Table columns={COLUMNS} data={DATA} />);
    const cells = wrapper
      .find(StyledTableBodyRow)
      .first()
      .find(StyledTableBodyCell);

    expect(cells).toHaveLength(DATA[0].length);
  });

  it('exposes row and column data to overrides', () => {
    const mockTableHeadCellStyle = jest.fn();
    const mockTableBodyRowStyle = jest.fn();
    const mockTableBodyCellStyle = jest.fn();

    mount(
      <Table
        columns={COLUMNS}
        data={DATA}
        overrides={{
          TableHeadCell: {
            style: mockTableHeadCellStyle,
          },
          TableBodyRow: {
            style: mockTableBodyRowStyle,
          },
          TableBodyCell: {
            style: mockTableBodyCellStyle,
          },
        }}
      />,
    );

    expect(mockTableHeadCellStyle.mock.calls.length).toBe(5);
    expect(mockTableHeadCellStyle.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        $colIndex: 0,
        $col: 'ID',
      }),
    );

    expect(mockTableBodyRowStyle.mock.calls.length).toBe(3);
    expect(mockTableBodyRowStyle.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        $rowIndex: 0,
        $row: DATA[0],
      }),
    );

    expect(mockTableBodyCellStyle.mock.calls.length).toBe(15);
    expect(mockTableBodyCellStyle.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        $colIndex: 0,
        $col: 'ID',
        $rowIndex: 0,
        $row: DATA[0],
      }),
    );
  });

  it('renders loading message', () => {
    const wrapper = shallow(
      <Table columns={COLUMNS} data={DATA} isLoading={true} />,
    );
    const styledRows = wrapper.find(StyledTableBodyRow);
    expect(styledRows).toHaveLength(0);

    expect(
      wrapper
        .find(StyledTableBody)
        .find('td')
        .prop('colSpan'),
    ).toEqual(COLUMNS.length);

    const tableBody = wrapper.find(StyledTableBody);
    expect(tableBody.text()).toContain('Loading...');
  });

  it('renders empty message', () => {
    const wrapper = shallow(
      <Table columns={COLUMNS} data={[]} emptyMessage="No data" />,
    );
    const rows = wrapper.find(StyledTableBodyRow);
    expect(rows).toHaveLength(0);

    const tableBody = wrapper.find(StyledTableBody);
    expect(tableBody.text()).toContain('No data');
  });

  it('does not render unset empty message', () => {
    const wrapper = shallow(<Table columns={COLUMNS} data={[]} />);
    const rows = wrapper.find(StyledTableEmptyMessage);
    expect(rows).toHaveLength(0);
  });
});
