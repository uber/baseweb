/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import isEqual from 'date-fns/isEqual/index.js';
import isSameDay from 'date-fns/isSameDay/index.js';
import isSameHour from 'date-fns/isSameHour/index.js';
import isSameMinute from 'date-fns/isSameMinute/index.js';

import {TestBaseProvider} from '../../test/test-utils.js';

import {DatetimeColumn, DATETIME_OPERATIONS} from '../index.js';

const padZero = n => (n < 10 ? `0${n}` : n);

describe('datetime column', () => {
  it('is sortable by default', () => {
    const column = DatetimeColumn({
      title: 'column',
      mapDataToValue: () => new Date(),
    });
    expect(column.sortable).toBe(true);
  });

  it('is filterable by default', () => {
    const column = DatetimeColumn({
      title: 'column',
      mapDataToValue: () => new Date(),
    });
    expect(column.filterable).toBe(true);
  });

  it('applies provided sortable value', () => {
    const column = DatetimeColumn({
      title: 'column',
      sortable: false,
      mapDataToValue: () => new Date(),
    });
    expect(column.sortable).toBe(false);
  });

  it('cell renders provided value', () => {
    const date = new Date('2011-04-11T10:20:30');
    const column = DatetimeColumn({
      title: 'column',
      mapDataToValue: () => date,
    });
    const Cell = column.renderCell;
    const {container} = render(<Cell value={date} x={0} y={0} />);
    const cell = container.querySelector('div');
    expect(cell.textContent).toBe('04-11-2011 10:20 30:00');
  });

  it('cell renders provided value based on formatString', () => {
    const date = new Date('2011-04-11T10:20:30');
    const column = DatetimeColumn({
      title: 'column',
      mapDataToValue: () => date,
      formatString: 'dd/MM/yyyy',
    });
    const Cell = column.renderCell;
    const {container} = render(<Cell value={date} x={0} y={0} />);
    const cell = container.querySelector('div');
    expect(cell.textContent).toBe('11/04/2011');
  });

  it('sets filter params for range of datetimes', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
      return new Date(`2011-04-${padZero(i)}T10:${10 + i}:30`);
    });
    const column = DatetimeColumn({
      title: 'column',
      mapDataToValue: () => new Date(),
    });
    const mockSetFilter = jest.fn();
    const Filter = column.renderFilter;
    const {getByText} = render(
      <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
    );
    fireEvent.click(getByText('Apply'));

    expect(mockSetFilter.mock.calls.length).toBe(1);
    const [filterParams] = mockSetFilter.mock.calls[0];
    expect(filterParams.operation).toBe(DATETIME_OPERATIONS.RANGE_DATETIME);
    const [left, right] = filterParams.range;
    expect(isEqual(left, data[0])).toBe(true);
    expect(isEqual(right, data[data.length - 1])).toBe(true);
  });

  it('sets filter params for range of dates', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
      return new Date(`2011-04-${padZero(i)}T10:${10 + i}:30`);
    });
    const column = DatetimeColumn({
      title: 'column',
      mapDataToValue: () => new Date(),
    });
    const mockSetFilter = jest.fn();
    const Filter = column.renderFilter;
    const {container, getByText} = render(
      <TestBaseProvider>
        <Filter setFilter={mockSetFilter} close={() => {}} data={data} />
      </TestBaseProvider>,
    );

    const select = container.querySelector("[data-baseweb='select'] div div");
    fireEvent.click(select);
    const options = container.querySelectorAll('li');
    fireEvent.click(options[1]);
    fireEvent.click(getByText('Apply'));

    expect(mockSetFilter.mock.calls.length).toBe(1);
    const [filterParams] = mockSetFilter.mock.calls[0];
    expect(filterParams.operation).toBe(DATETIME_OPERATIONS.RANGE_DATE);
    const [left, right] = filterParams.range;
    expect(isSameDay(left, data[0])).toBe(true);
    expect(isSameDay(right, data[data.length - 1])).toBe(true);
  });

  it('sets filter params for range of times', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
      return new Date(`2011-04-${padZero(i)}T10:${10 + i}:30`);
    });
    const column = DatetimeColumn({
      title: 'column',
      mapDataToValue: () => new Date(),
    });
    const mockSetFilter = jest.fn();
    const Filter = column.renderFilter;
    const {container, getByText} = render(
      <TestBaseProvider>
        <Filter setFilter={mockSetFilter} close={() => {}} data={data} />
      </TestBaseProvider>,
    );

    const select = container.querySelector("[data-baseweb='select'] div div");
    fireEvent.click(select);
    const options = container.querySelectorAll('li');
    fireEvent.click(options[2]);
    fireEvent.click(getByText('Apply'));

    expect(mockSetFilter.mock.calls.length).toBe(1);
    const [filterParams] = mockSetFilter.mock.calls[0];
    expect(filterParams.operation).toBe(DATETIME_OPERATIONS.RANGE_TIME);
    const [left, right] = filterParams.range;
    expect(isSameHour(left, data[0])).toBe(true);
    expect(isSameHour(right, data[data.length - 1])).toBe(true);
    expect(isSameMinute(left, data[0])).toBe(true);
    expect(isSameMinute(right, data[data.length - 1])).toBe(true);
  });

  it('sets filter params for selected weekdays', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
      return new Date(`2011-04-${padZero(i)}T10:${10 + i}:30`);
    });
    const column = DatetimeColumn({
      title: 'column',
      mapDataToValue: () => new Date(),
    });
    const mockSetFilter = jest.fn();
    const Filter = column.renderFilter;
    const {container, getByText} = render(
      <TestBaseProvider>
        <Filter setFilter={mockSetFilter} close={() => {}} data={data} />
      </TestBaseProvider>,
    );

    fireEvent.click(getByText('Categorical'));

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    fireEvent.click(checkboxes[2]);

    fireEvent.click(getByText('Apply'));

    expect(mockSetFilter.mock.calls.length).toBe(1);
    const [filterParams] = mockSetFilter.mock.calls[0];
    expect(filterParams.operation).toBe(DATETIME_OPERATIONS.WEEKDAY);
    expect(filterParams.selection.length).toBe(1);
    expect(filterParams.selection[0]).toBe(2);
  });

  it('sets filter params for selected months', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
      return new Date(`2011-04-${padZero(i)}T10:${10 + i}:30`);
    });
    const column = DatetimeColumn({
      title: 'column',
      mapDataToValue: () => new Date(),
    });
    const mockSetFilter = jest.fn();
    const Filter = column.renderFilter;
    const {container, getByText} = render(
      <TestBaseProvider>
        <Filter setFilter={mockSetFilter} close={() => {}} data={data} />
      </TestBaseProvider>,
    );

    fireEvent.click(getByText('Categorical'));

    const select = container.querySelector("[data-baseweb='select'] div div");
    fireEvent.click(select);
    const options = container.querySelectorAll('li');
    fireEvent.click(options[1]);

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    fireEvent.click(checkboxes[2]);
    fireEvent.click(checkboxes[3]);

    fireEvent.click(getByText('Apply'));

    expect(mockSetFilter.mock.calls.length).toBe(1);
    const [filterParams] = mockSetFilter.mock.calls[0];
    expect(filterParams.operation).toBe(DATETIME_OPERATIONS.MONTH);
    expect(filterParams.selection.length).toBe(2);
    expect(filterParams.selection[0]).toBe(2);
    expect(filterParams.selection[1]).toBe(3);
  });

  it('sets filter params for selected quarters', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
      return new Date(`2011-04-${padZero(i)}T10:${10 + i}:30`);
    });
    const column = DatetimeColumn({
      title: 'column',
      mapDataToValue: () => new Date(),
    });
    const mockSetFilter = jest.fn();
    const Filter = column.renderFilter;
    const {container, getByText} = render(
      <TestBaseProvider>
        <Filter setFilter={mockSetFilter} close={() => {}} data={data} />
      </TestBaseProvider>,
    );

    fireEvent.click(getByText('Categorical'));

    const select = container.querySelector("[data-baseweb='select'] div div");
    fireEvent.click(select);
    const options = container.querySelectorAll('li');
    fireEvent.click(options[2]);

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);

    fireEvent.click(getByText('Apply'));

    expect(mockSetFilter.mock.calls.length).toBe(1);
    const [filterParams] = mockSetFilter.mock.calls[0];
    expect(filterParams.operation).toBe(DATETIME_OPERATIONS.QUARTER);
    expect(filterParams.selection.length).toBe(2);
    expect(filterParams.selection[0]).toBe(0);
    expect(filterParams.selection[1]).toBe(1);
  });

  it('sets filter params for selected halves', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
      return new Date(`2011-04-${padZero(i)}T10:${10 + i}:30`);
    });
    const column = DatetimeColumn({
      title: 'column',
      mapDataToValue: () => new Date(),
    });
    const mockSetFilter = jest.fn();
    const Filter = column.renderFilter;
    const {container, getByText} = render(
      <TestBaseProvider>
        <Filter setFilter={mockSetFilter} close={() => {}} data={data} />
      </TestBaseProvider>,
    );

    fireEvent.click(getByText('Categorical'));

    const select = container.querySelector("[data-baseweb='select'] div div");
    fireEvent.click(select);
    const options = container.querySelectorAll('li');
    fireEvent.click(options[3]);

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    fireEvent.click(checkboxes[1]);

    fireEvent.click(getByText('Apply'));

    expect(mockSetFilter.mock.calls.length).toBe(1);
    const [filterParams] = mockSetFilter.mock.calls[0];
    expect(filterParams.operation).toBe(DATETIME_OPERATIONS.HALF);
    expect(filterParams.selection.length).toBe(1);
    expect(filterParams.selection[0]).toBe(1);
  });

  it('sets filter params for selected years', () => {
    const data = [1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9].map(i => {
      return new Date(`200${i}-04-10T10:${10 + i}:30`);
    });
    const column = DatetimeColumn({
      title: 'column',
      mapDataToValue: () => new Date(),
    });
    const mockSetFilter = jest.fn();
    const Filter = column.renderFilter;
    const {container, getByText} = render(
      <TestBaseProvider>
        <Filter setFilter={mockSetFilter} close={() => {}} data={data} />
      </TestBaseProvider>,
    );

    fireEvent.click(getByText('Categorical'));

    const select = container.querySelector("[data-baseweb='select'] div div");
    fireEvent.click(select);
    const options = container.querySelectorAll('li');
    fireEvent.click(options[4]);

    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    // 9 years, plus the exclude toggle
    expect(checkboxes.length).toBe(10);
    fireEvent.click(checkboxes[2]);
    fireEvent.click(checkboxes[6]);

    fireEvent.click(getByText('Apply'));

    expect(mockSetFilter.mock.calls.length).toBe(1);
    const [filterParams] = mockSetFilter.mock.calls[0];
    expect(filterParams.operation).toBe(DATETIME_OPERATIONS.YEAR);
    expect(filterParams.selection.length).toBe(2);
    expect(filterParams.selection[0]).toBe(2003);
    expect(filterParams.selection[1]).toBe(2007);
  });
});
