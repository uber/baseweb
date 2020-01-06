/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {render, fireEvent} from '@testing-library/react';

import {CategoricalColumn} from '../index.js';

describe('categorical column', () => {
  it('is sortable by default', () => {
    const column = CategoricalColumn({
      title: 'column',
      mapDataToValue: () => '',
    });
    expect(column.sortable).toBe(true);
  });

  it('is filterable by default', () => {
    const column = CategoricalColumn({
      title: 'column',
      mapDataToValue: () => '',
    });
    expect(column.filterable).toBe(true);
  });

  it('applies provided sortable value', () => {
    const column = CategoricalColumn({
      title: 'column',
      sortable: false,
      mapDataToValue: () => '',
    });
    expect(column.sortable).toBe(false);
  });

  it('applies provided filterable value', () => {
    const column = CategoricalColumn({
      title: 'column',
      filterable: false,
      mapDataToValue: () => '',
    });
    expect(column.filterable).toBe(false);
  });

  it('cell renders provided value', () => {
    const column = CategoricalColumn({
      title: 'column',
      mapDataToValue: () => '',
    });
    const Cell = column.renderCell;

    const {container} = render(<Cell value="A" />);
    const cell = container.querySelector('div');
    expect(cell.textContent).toBe('A');
  });

  it('renders expected number of checkboxes in filter component', () => {
    const column = CategoricalColumn({
      title: 'column',
      mapDataToValue: () => '',
    });
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = ['A', 'B', 'C'];
    const {container} = render(
      <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
    );

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    // counts an additional checkbox to account for the 'exlude' toggle
    expect(checkboxes.length).toBe(4);
  });

  it('can call setFilter with expected selection', () => {
    const column = CategoricalColumn({
      title: 'column',
      mapDataToValue: () => '',
    });
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = ['A', 'B', 'C'];
    const {container, getByText} = render(
      <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
    );

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    fireEvent.click(checkboxes[0]);
    expect(((checkboxes[0]: any): HTMLInputElement).checked).toBe(true);

    fireEvent.click(getByText('Apply'));

    expect(mockSetFilter.mock.calls.length).toBe(1);
    const [filterParams] = mockSetFilter.mock.calls[0];
    expect(filterParams.selection.has('A')).toBe(true);
    expect(filterParams.selection.has('B')).toBe(false);
    expect(filterParams.selection.has('C')).toBe(false);
    expect(filterParams.exclude).toBe(false);
    expect(filterParams.description).toBe('A');
  });

  it('selects all options', () => {
    const column = CategoricalColumn({
      title: 'column',
      mapDataToValue: () => '',
    });
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = ['A', 'B', 'C'];
    const {container, getByText} = render(
      <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
    );

    fireEvent.click(getByText('Select All'));

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(((checkboxes[0]: any): HTMLInputElement).checked).toBe(true);
    expect(((checkboxes[1]: any): HTMLInputElement).checked).toBe(true);
    expect(((checkboxes[2]: any): HTMLInputElement).checked).toBe(true);
  });

  it('clears current selection', () => {
    const column = CategoricalColumn({
      title: 'column',
      mapDataToValue: () => '',
    });
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = ['A', 'B', 'C'];
    const {container, getByText} = render(
      <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
    );

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(getByText('Clear'));

    expect(((checkboxes[0]: any): HTMLInputElement).checked).toBe(false);
    expect(((checkboxes[1]: any): HTMLInputElement).checked).toBe(false);
    expect(((checkboxes[2]: any): HTMLInputElement).checked).toBe(false);
  });

  it('renders input if more than 10 categories', () => {
    const column = CategoricalColumn({
      title: 'column',
      mapDataToValue: () => '',
    });
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const {container} = render(
      <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
    );

    const input = container.querySelector('[data-baseweb="input"] input');
    expect(input).toBeTruthy();
  });

  it('filters categories based on query', () => {
    const column = CategoricalColumn({
      title: 'column',
      mapDataToValue: () => '',
    });
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const {container} = render(
      <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
    );

    const input = container.querySelector('[data-baseweb="input"] input');
    fireEvent.change(input, {target: {value: 'a'}});

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(2);
  });

  it('quick actions hide when search query present', () => {
    const column = CategoricalColumn({
      title: 'column',
      mapDataToValue: () => '',
    });
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const {container, queryByText} = render(
      <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
    );

    expect(queryByText('Select All')).toBeTruthy();
    expect(queryByText('Clear')).toBeTruthy();

    const input = container.querySelector('[data-baseweb="input"] input');
    fireEvent.change(input, {target: {value: 'a'}});

    expect(queryByText('Select All')).toBeFalsy();
    expect(queryByText('Clear')).toBeFalsy();
  });

  it('builds expected filter function', () => {
    const column = CategoricalColumn({
      title: 'column',
      mapDataToValue: () => '',
    });

    const filterSelectionEmpty = column.buildFilter({
      description: '',
      exclude: false,
      selection: new Set(),
    });
    expect(filterSelectionEmpty('A')).toBe(false);

    const filterSelectionSingle = column.buildFilter({
      description: '',
      exclude: false,
      selection: new Set(['A']),
    });
    expect(filterSelectionSingle('A')).toBe(true);

    const filterSelectionExclude = column.buildFilter({
      description: '',
      exclude: true,
      selection: new Set(['A']),
    });
    expect(filterSelectionExclude('A')).toBe(false);
    expect(filterSelectionExclude('B')).toBe(true);
  });

  it('builds expected sort function', () => {
    const column = CategoricalColumn({
      title: 'column',
      mapDataToValue: () => '',
    });
    const input = ['A', 'B', 'C', 'C', 'B', 'A'];
    input.sort(column.sortFn);

    const output = ['A', 'A', 'B', 'B', 'C', 'C'];
    for (let i = 0; i < input.length; i++) {
      expect(input[i]).toBe(output[i]);
    }
  });
});
