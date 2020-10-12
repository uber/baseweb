/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';

import {
  TableBuilder,
  TableBuilderColumn,
  StyledTableBody,
  StyledTableHeadCellSortable,
  StyledTableBodyRow,
  StyledTableBodyCell,
  StyledSortAscIcon,
  StyledSortDescIcon,
  StyledSortNoneIcon,
} from '../index.js';

const DATA = [
  {
    foo: 10,
    bar: 'banana',
    url: 'https://example.com/b',
  },
  {
    foo: 1,
    bar: 'carrot',
    url: 'https://example.com/c',
  },
  {
    foo: 2,
    bar: 'apple',
    url: 'https://example.com/a',
  },
];

describe('Table Semantic Builder', () => {
  it('renders expected number of rows', () => {
    const wrapper = mount(
      <TableBuilder data={DATA}>
        <TableBuilderColumn header="Foo">{row => row.foo}</TableBuilderColumn>
        <TableBuilderColumn header="Bar">
          {row => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
        <TableBuilderColumn>{row => 'Hey'}</TableBuilderColumn>
      </TableBuilder>,
    );

    expect(wrapper.find(StyledTableBodyRow)).toHaveLength(DATA.length);
  });

  it('renders expected number of columns', () => {
    const wrapper = mount(
      <TableBuilder data={DATA}>
        <TableBuilderColumn header="Foo">{row => row.foo}</TableBuilderColumn>
        <TableBuilderColumn header="Bar">
          {row => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
        <TableBuilderColumn>{row => 'Hey'}</TableBuilderColumn>
      </TableBuilder>,
    );

    const cells = wrapper
      .find(StyledTableBodyRow)
      .first()
      .find(StyledTableBodyCell);

    expect(cells).toHaveLength(3);
  });

  it('renders expected number of anchors', () => {
    const wrapper = mount(
      <TableBuilder data={DATA}>
        <TableBuilderColumn header="Foo">{row => row.foo}</TableBuilderColumn>
        <TableBuilderColumn header="Bar">
          {row => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
        <TableBuilderColumn>{row => 'Hey'}</TableBuilderColumn>
      </TableBuilder>,
    );

    const anchors = wrapper.find('a');

    expect(anchors).toHaveLength(DATA.length);
    expect(anchors.at(0).prop('href')).toBe('https://example.com/b');
    expect(anchors.at(0).prop('children')).toBe('banana');
  });

  it('renders sorted results', () => {
    const asc = mount(
      <TableBuilder data={DATA} sortColumn={'foo'} sortOrder={'ASC'}>
        <TableBuilderColumn header="Foo" id="foo" numeric sortable>
          {row => row.foo}
        </TableBuilderColumn>
        <TableBuilderColumn header="Bar" id="bar" sortable>
          {row => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
      </TableBuilder>,
    );

    expect(asc.find(StyledSortAscIcon)).toHaveLength(1);
    expect(asc.find(StyledSortDescIcon)).toHaveLength(0);
    expect(asc.find(StyledSortNoneIcon)).toHaveLength(1);

    const desc = mount(
      <TableBuilder data={DATA} sortColumn={'bar'} sortOrder={'DESC'}>
        <TableBuilderColumn header="Foo" id="foo" numeric sortable>
          {row => row.foo}
        </TableBuilderColumn>
        <TableBuilderColumn header="Bar" id="bar" sortable>
          {row => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
      </TableBuilder>,
    );

    expect(desc.find(StyledSortAscIcon)).toHaveLength(0);
    expect(desc.find(StyledSortDescIcon)).toHaveLength(1);
    expect(desc.find(StyledSortNoneIcon)).toHaveLength(1);

    const none = mount(
      <TableBuilder data={DATA}>
        <TableBuilderColumn header="Foo" id="foo" numeric sortable>
          {row => row.foo}
        </TableBuilderColumn>
        <TableBuilderColumn header="Bar" id="bar" sortable>
          {row => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
      </TableBuilder>,
    );

    expect(none.find(StyledSortAscIcon)).toHaveLength(0);
    expect(none.find(StyledSortDescIcon)).toHaveLength(0);
    expect(none.find(StyledSortNoneIcon)).toHaveLength(2);
  });

  it('executes onSort with column id when header is clicked', () => {
    const mockOnSort = jest.fn();

    const wrapper = mount(
      <TableBuilder data={DATA} onSort={mockOnSort}>
        <TableBuilderColumn header="Foo" id="foo" sortable>
          {row => row.foo}
        </TableBuilderColumn>
        <TableBuilderColumn header="Bar" id="bar" sortable>
          {row => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
      </TableBuilder>,
    );

    const headCells = wrapper.find(StyledTableHeadCellSortable);

    headCells.at(0).simulate('click');
    headCells.at(1).simulate('click');

    headCells
      .at(1)
      .simulate('focus')
      .simulate('keydown', {key: 'Enter'});

    headCells
      .at(1)
      .simulate('focus')
      .simulate('keydown', {key: ' '});

    headCells
      .at(1)
      .simulate('focus')
      .simulate('keydown', {key: 'a'});

    headCells.at(1).simulate('blur');

    expect(mockOnSort.mock.calls.length).toBe(4);
    expect(mockOnSort.mock.calls).toEqual([['foo'], ['bar'], ['bar'], ['bar']]);
  });

  it('exposes row and column data to overrides', () => {
    const mockTableHeadCellStyle = jest.fn();
    const mockTableBodyRowStyle = jest.fn();
    const mockTableBodyCellStyle = jest.fn();

    mount(
      <TableBuilder
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
      >
        <TableBuilderColumn header="Foo" id="foo">
          {row => row.foo}
        </TableBuilderColumn>
        <TableBuilderColumn header="Bar" id="bar">
          {row => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
      </TableBuilder>,
    );

    expect(mockTableHeadCellStyle.mock.calls.length).toBe(2);
    expect(mockTableHeadCellStyle.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        $colIndex: 0,
        $col: expect.objectContaining({
          header: 'Foo',
          id: 'foo',
        }),
      }),
    );

    expect(mockTableBodyRowStyle.mock.calls.length).toBe(3);
    expect(mockTableBodyRowStyle.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        $rowIndex: 0,
        $row: DATA[0],
      }),
    );

    expect(mockTableBodyCellStyle.mock.calls.length).toBe(6);
    expect(mockTableBodyCellStyle.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        $colIndex: 0,
        $col: expect.objectContaining({
          header: 'Foo',
          id: 'foo',
        }),
        $rowIndex: 0,
        $row: DATA[0],
      }),
    );
  });

  it('renders aria label for column header', () => {
    const wrapper = mount(
      <TableBuilder data={DATA}>
        <TableBuilderColumn
          header={<span>Foo</span>}
          tableHeadAriaLabel="Foo Aria Label"
          sortable
        >
          {row => row.foo}
        </TableBuilderColumn>
        <TableBuilderColumn header="Bar" sortable>
          {row => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
        <TableBuilderColumn>{row => 'Hey'}</TableBuilderColumn>
      </TableBuilder>,
    );

    const headCells = wrapper.find(StyledTableHeadCellSortable);

    expect(headCells.at(0).prop('aria-label')).toBe(
      'Foo Aria Label, ascending sorting',
    );
    expect(headCells.at(1).prop('aria-label')).toBe('Bar, ascending sorting');
  });

  it('renders loading message', () => {
    const wrapper = mount(
      <TableBuilder data={DATA} isLoading={true}>
        <TableBuilderColumn header="Foo">{row => row.foo}</TableBuilderColumn>
        <TableBuilderColumn header="Bar">
          {row => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
        <TableBuilderColumn>{row => 'Hey'}</TableBuilderColumn>
      </TableBuilder>,
    );

    expect(wrapper.find(StyledTableBodyRow)).toHaveLength(0);

    const tableBody = wrapper.find(StyledTableBody);
    expect(tableBody.text()).toContain('Loading...');
  });

  it('renders empty message', () => {
    const wrapper = mount(
      <TableBuilder data={[]} emptyMessage="No data">
        <TableBuilderColumn header="Foo">{row => row.foo}</TableBuilderColumn>
        <TableBuilderColumn header="Bar">
          {row => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
        <TableBuilderColumn>{row => 'Hey'}</TableBuilderColumn>
      </TableBuilder>,
    );

    expect(wrapper.find(StyledTableBodyRow)).toHaveLength(0);

    const tableBody = wrapper.find(StyledTableBody);
    expect(tableBody.text()).toContain('No data');
  });
});
