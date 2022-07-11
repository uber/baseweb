/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, fireEvent, getAllByRole, getByText } from '@testing-library/react';

import { TestBaseProvider } from '../../test/test-utils';
import {
  StatefulDataTable,
  BooleanColumn,
  CategoricalColumn,
  NumericalColumn,
  StringColumn,
} from '../index';

// NOTE: data-table waits for container dimension measurements before rendering. Jsdom only
// returns 0 for dimension properties and methods. Mocking here so that cell rendering proceeds.
// An integration test will be more accurate.
if (__BROWSER__) {
  const originalOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight'
  );
  const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { value: 1 });
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { value: 1 });
  });
  afterAll(() => {
    if (originalOffsetHeight) {
      Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
    }
    if (originalOffsetWidth) {
      Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
    }
  });
}

type RowDataT = [boolean, string, number, string];

const COLUMNS = [
  BooleanColumn({
    title: 'boolean',
    mapDataToValue: (data: RowDataT) => data[0],
  }),

  CategoricalColumn({
    title: 'color',
    mapDataToValue: (data: RowDataT) => data[1],
  }),

  NumericalColumn({
    title: 'number',
    mapDataToValue: (data: RowDataT) => data[2],
  }),

  StringColumn({
    title: 'description',
    mapDataToValue: (data: RowDataT) => data[3],
  }),
];

const ROWS = [
  { id: 1, data: [true, 'green', 2, 'bright'] },
  { id: 2, data: [false, 'blue', 1, 'glossy'] },
  { id: 3, data: [true, 'black', 4, 'dry'] },
  { id: 4, data: [false, 'pink', 3, 'brittle'] },
  { id: 5, data: [false, 'blue', 5, 'big'] },
  { id: 6, data: [true, 'pink', 6, 'spicey'] },
  { id: 7, data: [false, 'blue', 3, 'mild'] },
  { id: 8, data: [false, 'blue', 3, 'pointy'] },
  { id: 9, data: [true, 'blue', 3, 'soft'] },
  { id: 10, data: [false, 'pink', 1, 'worn'] },
  { id: 11, data: [true, 'blue', 1, 'brittle'] },
  { id: 12, data: [true, 'blue', 3, 'glossy'] },
  { id: 13, data: [false, 'purple', 3, 'big'] },
  { id: 14, data: [false, 'blue', 1, 'worn'] },
  { id: 15, data: [false, 'blue', 3, 'dry'] },
  { id: 16, data: [false, 'orange', 5, 'spicey'] },
  { id: 17, data: [false, 'orange', 7, 'big'] },
  { id: 18, data: [false, 'blue', 8, 'glossy'] },
  { id: 19, data: [false, 'magenta', 4, 'brittle'] },
  { id: 20, data: [true, 'blue', 3, 'dry'] },
];

describe('Data Table', () => {
  it('renders expected number of rows', async () => {
    const controlRef = React.createRef();
    const { container } = render(
      <TestBaseProvider>
        <div style={{ height: '800px', width: '900px' }}>
          <StatefulDataTable columns={COLUMNS} rows={ROWS} controlRef={controlRef} />
        </div>
      </TestBaseProvider>
    );

    let rows;

    // getRows should return the initial rows passed into DataTable
    rows = controlRef.current?.getRows();
    expect(Array.isArray(rows) && rows.length).toBe(20);
    expect(Array.isArray(rows) && rows[0].data).toEqual([true, 'green', 2, 'bright']);
    expect(Array.isArray(rows) && rows[1].data).toEqual([false, 'blue', 1, 'glossy']);

    // getRows should return filtered rows
    await fireEvent.click(getByText(container, 'Add Filter'));
    await fireEvent.click(getAllByRole(container, 'option')[0]);
    await fireEvent.click(getByText(container, 'true'));
    await fireEvent.click(getByText(container, 'Apply'));

    rows = controlRef.current?.getRows();
    expect(Array.isArray(rows) && rows.length).toBe(7);
    expect(Array.isArray(rows) && rows[0].data).toEqual([true, 'green', 2, 'bright']);
    expect(Array.isArray(rows) && rows[1].data).toEqual([true, 'black', 4, 'dry']);

    // getRows should return sorts rows
    await fireEvent.click(getByText(container, 'number'));

    rows = controlRef.current?.getRows();
    expect(Array.isArray(rows) && rows.length).toBe(7);
    expect(Array.isArray(rows) && rows[0].data).toEqual([true, 'blue', 1, 'brittle']);
    expect(Array.isArray(rows) && rows[1].data).toEqual([true, 'green', 2, 'bright']);
  });
});
