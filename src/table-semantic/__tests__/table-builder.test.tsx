/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import {
  render,
  fireEvent,
  getByText,
  queryByTestId,
  queryAllByTestId,
  queryByText,
} from '@testing-library/react';

import { TableBuilder, TableBuilderColumn } from '..';

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
    const { container } = render(
      <TableBuilder data={DATA}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Foo">{(row) => row.foo}</TableBuilderColumn>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Bar">
          {(row) => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
        <TableBuilderColumn>{() => 'Hey'}</TableBuilderColumn>
      </TableBuilder>
    );
    const rows = container.querySelectorAll('tr');
    expect(rows.length).toBe(DATA.length + 1);
  });

  it('renders expected number of columns', () => {
    const { container } = render(
      <TableBuilder data={DATA}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Foo">{(row) => row.foo}</TableBuilderColumn>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Bar">
          {(row) => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
        <TableBuilderColumn>{() => 'Hey'}</TableBuilderColumn>
      </TableBuilder>
    );
    const headCells = container.querySelectorAll('th');
    expect(headCells.length).toBe(3);
  });

  it('renders expected number of anchors', () => {
    const { container } = render(
      <TableBuilder data={DATA}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Foo">{(row) => row.foo}</TableBuilderColumn>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Bar">
          {(row) => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
        {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
        <TableBuilderColumn>{(row) => 'Hey'}</TableBuilderColumn>
      </TableBuilder>
    );

    const anchors = container.querySelectorAll('a');
    expect(anchors).toHaveLength(DATA.length);
    expect(anchors[0].getAttribute('href')).toBe('https://example.com/b');
    expect(anchors[0].textContent).toBe('banana');
  });

  it('renders sorted results ascending', () => {
    const { container } = render(
      <TableBuilder
        data={DATA}
        sortColumn={'foo'}
        sortOrder={'ASC'}
        overrides={{
          SortAscIcon: { props: { 'data-testid': 'sort-asc-icon' } },
          SortDescIcon: { props: { 'data-testid': 'sort-desc-icon' } },
          SortNoneIcon: { props: { 'data-testid': 'sort-none-icon' } },
        }}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Foo" id="foo" numeric sortable>
          {(row) => row.foo}
        </TableBuilderColumn>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Bar" id="bar" sortable>
          {(row) => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
      </TableBuilder>
    );

    expect(queryByTestId(container, 'sort-asc-icon')).not.toBeNull();
    expect(queryByTestId(container, 'sort-desc-icon')).toBeNull();
    expect(queryByTestId(container, 'sort-none-icon')).not.toBeNull();
  });

  it('renders sorted results descending', () => {
    const { container } = render(
      <TableBuilder
        data={DATA}
        sortColumn={'bar'}
        sortOrder={'DESC'}
        overrides={{
          SortAscIcon: { props: { 'data-testid': 'sort-asc-icon' } },
          SortDescIcon: { props: { 'data-testid': 'sort-desc-icon' } },
          SortNoneIcon: { props: { 'data-testid': 'sort-none-icon' } },
        }}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Foo" id="foo" numeric sortable>
          {(row) => row.foo}
        </TableBuilderColumn>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Bar" id="bar" sortable>
          {(row) => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
      </TableBuilder>
    );

    expect(queryByTestId(container, 'sort-asc-icon')).toBeNull();
    expect(queryByTestId(container, 'sort-desc-icon')).not.toBeNull();
    expect(queryByTestId(container, 'sort-none-icon')).not.toBeNull();
  });

  it('renders sorted results none', () => {
    const { container } = render(
      <TableBuilder
        data={DATA}
        overrides={{
          SortAscIcon: { props: { 'data-testid': 'sort-asc-icon' } },
          SortDescIcon: { props: { 'data-testid': 'sort-desc-icon' } },
          SortNoneIcon: { props: { 'data-testid': 'sort-none-icon' } },
        }}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Foo" id="foo" numeric sortable>
          {(row) => row.foo}
        </TableBuilderColumn>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Bar" id="bar" sortable>
          {(row) => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
      </TableBuilder>
    );

    expect(queryByTestId(container, 'sort-asc-icon')).toBeNull();
    expect(queryByTestId(container, 'sort-desc-icon')).toBeNull();
    expect(queryAllByTestId(container, 'sort-none-icon').length).toBe(2);
  });

  it('executes onSort with column id when header is clicked', () => {
    const mockOnSort = jest.fn();

    const { container } = render(
      <TableBuilder data={DATA} onSort={mockOnSort}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Foo" id="foo" sortable>
          {(row) => row.foo}
        </TableBuilderColumn>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Bar" id="bar" sortable>
          {(row) => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
      </TableBuilder>
    );

    const headCells = container.querySelectorAll('th');
    fireEvent.click(headCells[0]);
    fireEvent.click(headCells[1]);

    fireEvent.focus(headCells[1]);
    fireEvent.keyDown(headCells[1], { key: 'Enter' });

    fireEvent.focus(headCells[1]);
    fireEvent.keyDown(headCells[1], { key: ' ' });

    fireEvent.focus(headCells[1]);
    fireEvent.keyDown(headCells[1], { key: 'a' });

    fireEvent.blur(headCells[1]);

    expect(mockOnSort.mock.calls.length).toBe(4);
    expect(mockOnSort.mock.calls).toEqual([['foo'], ['bar'], ['bar'], ['bar']]);
  });

  it('exposes row and column data to overrides', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mockTableHeadCellStyle = jest.fn((arg) => null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mockTableBodyRowStyle = jest.fn((arg) => null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mockTableBodyCellStyle = jest.fn((arg) => null);

    render(
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
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Foo" id="foo">
          {(row) => row.foo}
        </TableBuilderColumn>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Bar" id="bar">
          {(row) => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
      </TableBuilder>
    );

    expect(mockTableHeadCellStyle.mock.calls.length).toBe(2);
    expect(mockTableHeadCellStyle.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        $colIndex: 0,
        $col: expect.objectContaining({
          header: 'Foo',
          id: 'foo',
        }),
      })
    );

    expect(mockTableBodyRowStyle.mock.calls.length).toBe(3);
    expect(mockTableBodyRowStyle.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        $rowIndex: 0,
        $row: DATA[0],
      })
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
      })
    );
  });

  it('renders aria label for column header', () => {
    const { container } = render(
      <TableBuilder data={DATA}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any>
          header={<span>Foo</span>}
          tableHeadAriaLabel="Foo Aria Label"
          sortable
        >
          {(row) => row.foo}
        </TableBuilderColumn>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Bar" sortable>
          {(row) => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
        <TableBuilderColumn>{() => 'Hey'}</TableBuilderColumn>
      </TableBuilder>
    );

    const headCells = container.querySelectorAll('th');
    expect(headCells[0].getAttribute('aria-label')).toBe('Foo Aria Label, ascending sorting');
    expect(headCells[1].getAttribute('aria-label')).toBe('Bar, ascending sorting');
  });

  it('renders loading message', () => {
    const { container } = render(
      <TableBuilder data={DATA} isLoading={true}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Foo">{(row) => row.foo}</TableBuilderColumn>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Bar">
          {(row) => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
        <TableBuilderColumn>{() => 'Hey'}</TableBuilderColumn>
      </TableBuilder>
    );
    getByText(container, 'Loading...');
  });

  it('renders empty message', () => {
    const { container } = render(
      <TableBuilder data={[]} emptyMessage="No data">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Foo">{(row) => row.foo}</TableBuilderColumn>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Bar">
          {(row) => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
        <TableBuilderColumn>{() => 'Hey'}</TableBuilderColumn>
      </TableBuilder>
    );
    getByText(container, 'No data');
  });

  it('does not render unset empty message', () => {
    const { container } = render(
      <TableBuilder data={[]}>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Foo">{(row) => row.foo}</TableBuilderColumn>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <TableBuilderColumn<any> header="Bar">
          {(row) => <a href={row.url}>{row.bar}</a>}
        </TableBuilderColumn>
        <TableBuilderColumn>{() => 'Hey'}</TableBuilderColumn>
      </TableBuilder>
    );
    expect(queryByText(container, 'Loading...')).toBeNull();
  });
});
