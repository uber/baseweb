/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, getByRole, getAllByRole } from '@testing-library/react';

import { Table } from '..';

const DATA = [
  ['1', 'Sarah', 'Brown', 31, '100 Broadway st. New York City, New York'],
  ['2', 'Jane', 'Smith', 32, '100 Market st. San Francisco, California'],
  ['3', 'Joe', 'Black', 33, '100 Macquarie st. Sydney, Australia'],
];

const COLUMNS = ['ID', 'First Name', 'Last Name', 'Age', 'Address'];

describe('Table', () => {
  it('renders expected number of rows', () => {
    const { container } = render(<Table columns={COLUMNS} data={DATA} />);
    const rows = getAllByRole(container, 'row');
    expect(rows.length).toBe(4);
  });

  it('renders expected number of columns', () => {
    const { container } = render(<Table columns={COLUMNS} data={DATA} />);
    const rows = getAllByRole(container, 'row');
    expect(rows[0].children.length).toBe(5);
  });

  it('applies correct aria attributes to table container', () => {
    const { container } = render(<Table columns={COLUMNS} data={DATA} />);
    const grid = getByRole(container, 'grid');
    expect(grid.getAttribute('aria-colcount')).toBe(COLUMNS.length.toString());
    expect(grid.getAttribute('aria-rowcount')).toBe(DATA.length.toString());
  });

  it('applies correct role attribute to table head cell', () => {
    const { container } = render(<Table columns={COLUMNS} data={DATA} />);
    const headers = getAllByRole(container, 'columnheader');
    expect(headers.length).toBe(5);
  });

  it('applies correct role attribute to table body', () => {
    const { container } = render(<Table columns={COLUMNS} data={DATA} />);
    getByRole(container, 'rowgroup');
  });

  it('applies correct role attribute to table cell', () => {
    const { container } = render(<Table columns={COLUMNS} data={DATA} />);
    const cells = getAllByRole(container, 'gridcell');
    expect(cells.length).toBe(15);
  });
});
