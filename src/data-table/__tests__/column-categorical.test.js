/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils.js';

import {setNativeValue} from './shared.js';
import {CategoricalColumn} from '../index.js';

let container: HTMLDivElement;

describe('categorical column', () => {
  beforeEach(() => {
    if (__BROWSER__) {
      container = document.createElement('div');
      if (document.body) {
        document.body.appendChild(container);
      }
    }
  });

  afterEach(() => {
    if (__BROWSER__) {
      if (document.body && container) {
        document.body.removeChild(container);
        container.remove();
      }
    }
  });

  it('is sortable by default', () => {
    const column = CategoricalColumn({title: 'column'});
    expect(column.sortable).toBe(true);
  });

  it('is filterable by default', () => {
    const column = CategoricalColumn({title: 'column'});
    expect(column.filterable).toBe(true);
  });

  it('applies provided sortable value', () => {
    const column = CategoricalColumn({title: 'column', sortable: false});
    expect(column.sortable).toBe(false);
  });

  it('applies provided filterable value', () => {
    const column = CategoricalColumn({title: 'column', filterable: false});
    expect(column.filterable).toBe(false);
  });

  it('cell renders provided value', () => {
    const column = CategoricalColumn({title: 'column'});
    const Cell = column.renderCell;

    act(() => {
      ReactDOM.render(<Cell value="A" />, container);
    });

    const cell = container.querySelector('div');

    // $FlowFixMe cell could be null
    expect(cell.textContent).toBe('A');
  });

  it('renders expected number of checkboxes in filter component', () => {
    const column = CategoricalColumn({title: 'column'});
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = ['A', 'B', 'C'];
    act(() => {
      ReactDOM.render(
        <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
        container,
      );
    });

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    // counts an additional checkbox to account for the 'exlude' toggle
    expect(checkboxes.length).toBe(4);
  });

  it('can call setFilter with expected selection', () => {
    const column = CategoricalColumn({title: 'column'});
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = ['A', 'B', 'C'];
    act(() => {
      ReactDOM.render(
        <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
        container,
      );
    });
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    act(() => {
      if (__BROWSER__) {
        checkboxes[0].dispatchEvent(new MouseEvent('click', {bubbles: true}));
      }
    });
    expect(((checkboxes[0]: any): HTMLInputElement).checked).toBe(true);

    const buttons = container.querySelectorAll('button');
    buttons.forEach(button => {
      if (button.textContent === 'Apply') {
        act(() => {
          if (__BROWSER__) {
            button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
          }
        });
      }
    });

    expect(mockSetFilter.mock.calls.length).toBe(1);
    const [filterParams, description] = mockSetFilter.mock.calls[0];
    expect(filterParams.selection.has('A')).toBe(true);
    expect(filterParams.selection.has('B')).toBe(false);
    expect(filterParams.selection.has('C')).toBe(false);
    expect(filterParams.exclude).toBe(false);
    expect(description).toBe('A');
  });

  it('selects all options', () => {
    const column = CategoricalColumn({title: 'column'});
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = ['A', 'B', 'C'];
    act(() => {
      ReactDOM.render(
        <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
        container,
      );
    });
    const buttons = container.querySelectorAll('button');
    const selectAll = [...buttons].filter(b => b.textContent === 'Select All');
    act(() => {
      if (__BROWSER__) {
        selectAll[0].dispatchEvent(new MouseEvent('click', {bubbles: true}));
      }
    });
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(((checkboxes[0]: any): HTMLInputElement).checked).toBe(true);
    expect(((checkboxes[1]: any): HTMLInputElement).checked).toBe(true);
    expect(((checkboxes[2]: any): HTMLInputElement).checked).toBe(true);
  });

  it('clears current selection', () => {
    const column = CategoricalColumn({title: 'column'});
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = ['A', 'B', 'C'];
    act(() => {
      ReactDOM.render(
        <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
        container,
      );
    });

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    act(() => {
      if (__BROWSER__) {
        checkboxes[0].dispatchEvent(new MouseEvent('click', {bubbles: true}));
      }
    });

    const buttons = container.querySelectorAll('button');
    const clear = [...buttons].filter(b => b.textContent === 'Clear');
    act(() => {
      if (__BROWSER__) {
        clear[0].dispatchEvent(new MouseEvent('click', {bubbles: true}));
      }
    });

    expect(((checkboxes[0]: any): HTMLInputElement).checked).toBe(false);
    expect(((checkboxes[1]: any): HTMLInputElement).checked).toBe(false);
    expect(((checkboxes[2]: any): HTMLInputElement).checked).toBe(false);
  });

  it('renders input if more than 10 categories', () => {
    const column = CategoricalColumn({title: 'column'});
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    act(() => {
      ReactDOM.render(
        <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
        container,
      );
    });

    const input = container.querySelector('[data-baseweb="input"] input');
    expect(input).toBeTruthy();
  });

  it('filters categories based on query', () => {
    const column = CategoricalColumn({title: 'column'});
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    act(() => {
      ReactDOM.render(
        <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
        container,
      );
    });

    const input = container.querySelector('[data-baseweb="input"] input');
    act(() => {
      if (__BROWSER__) {
        setNativeValue((input: any), 'a');
        // $FlowFixMe input may be null
        input.dispatchEvent(new Event('input', {bubbles: true}));
      }
    });
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(2);
  });

  it('quick actions hide when search query present', () => {
    const column = CategoricalColumn({title: 'column'});
    const Filter = column.renderFilter;

    const mockSetFilter = jest.fn();
    const data = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    act(() => {
      ReactDOM.render(
        <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
        container,
      );
    });

    const input = container.querySelector('[data-baseweb="input"] input');
    act(() => {
      if (__BROWSER__) {
        setNativeValue((input: any), 'a');
        // $FlowFixMe input may be null
        input.dispatchEvent(new Event('input', {bubbles: true}));
      }
    });

    const buttons = container.querySelectorAll('button');
    const selectAll = [...buttons].filter(b => b.textContent === 'Select All');
    const clear = [...buttons].filter(b => b.textContent === 'Clear');
    expect(selectAll.length).toBe(0);
    expect(clear.length).toBe(0);
  });

  it('builds expected filter function', () => {
    const column = CategoricalColumn({title: 'column'});

    const filterSelectionEmpty = column.buildFilter({
      selection: new Set(),
      exclude: false,
    });
    expect(filterSelectionEmpty('A')).toBe(false);

    const filterSelectionSingle = column.buildFilter({
      selection: new Set(['A']),
      exclude: false,
    });
    expect(filterSelectionSingle('A')).toBe(true);

    const filterSelectionExclude = column.buildFilter({
      selection: new Set(['A']),
      exclude: true,
    });
    expect(filterSelectionExclude('A')).toBe(false);
    expect(filterSelectionExclude('B')).toBe(true);
  });

  it('builds expected sort function', () => {
    const column = CategoricalColumn({title: 'column'});
    const input = ['A', 'B', 'C', 'C', 'B', 'A'];
    input.sort(column.sortFn);

    const output = ['A', 'A', 'B', 'B', 'C', 'C'];
    for (let i = 0; i < input.length; i++) {
      expect(input[i]).toBe(output[i]);
    }
  });
});
