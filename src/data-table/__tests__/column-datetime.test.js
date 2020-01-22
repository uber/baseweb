/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {isEqual, isSameDay, isSameHour, isSameMinute} from 'date-fns';

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
    const date = new Date('2011-04-11T10:20:30Z');
    const column = DatetimeColumn({
      title: 'column',
      mapDataToValue: () => date,
    });
    const Cell = column.renderCell;
    const {container} = render(<Cell value={date} />);
    const cell = container.querySelector('div');
    expect(cell.textContent).toBe('11-04-2011 03:20 30:00');
  });

  it('cell renders provided value based on formatString', () => {
    const date = new Date('2011-04-11T10:20:30Z');
    const column = DatetimeColumn({
      title: 'column',
      mapDataToValue: () => date,
      formatString: 'MM/dd/yyyy',
    });
    const Cell = column.renderCell;
    const {container} = render(<Cell value={date} />);
    const cell = container.querySelector('div');
    expect(cell.textContent).toBe('04/11/2011');
  });

  it('sets filter params for range of datetimes', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
      return new Date(`2011-04-${padZero(i)}T10:${10 + i}:30Z`);
    });
    const column = DatetimeColumn({
      title: 'column',
      mapDataToValue: () => new Date(),
      formatString: 'MM/dd/yyyy',
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
    expect(Array.isArray(filterParams.dateRange)).toBe(true);
    if (Array.isArray(filterParams.dateRange)) {
      const [left, right] = filterParams.dateRange;
      expect(isEqual(left, data[0])).toBe(true);
      expect(isEqual(right, data[data.length - 1])).toBe(true);
    }
  });

  it('sets filter params for range of dates', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
      return new Date(`2011-04-${padZero(i)}T10:${10 + i}:30Z`);
    });
    const column = DatetimeColumn({
      title: 'column',
      mapDataToValue: () => new Date(),
      formatString: 'MM/dd/yyyy',
    });
    const mockSetFilter = jest.fn();
    const Filter = column.renderFilter;
    const {container, getByText} = render(
      <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
      {container: document.body},
    );

    const select = container.querySelector("[data-baseweb='select'] div div");
    fireEvent.click(select);
    const options = container.querySelectorAll('li');
    fireEvent.click(options[1]);
    fireEvent.click(getByText('Apply'));

    expect(mockSetFilter.mock.calls.length).toBe(1);
    const [filterParams] = mockSetFilter.mock.calls[0];
    expect(filterParams.operation).toBe(DATETIME_OPERATIONS.RANGE_DATE);
    expect(Array.isArray(filterParams.dateRange)).toBe(true);
    if (Array.isArray(filterParams.dateRange)) {
      const [left, right] = filterParams.dateRange;
      expect(isSameDay(left, data[0])).toBe(true);
      expect(isSameDay(right, data[data.length - 1])).toBe(true);
    }
  });

  it('sets filter params for range of times', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => {
      return new Date(`2011-04-${padZero(i)}T10:${10 + i}:30Z`);
    });
    const column = DatetimeColumn({
      title: 'column',
      mapDataToValue: () => new Date(),
      formatString: 'MM/dd/yyyy',
    });
    const mockSetFilter = jest.fn();
    const Filter = column.renderFilter;
    const {container, getByText} = render(
      <Filter setFilter={mockSetFilter} close={() => {}} data={data} />,
      {container: document.body},
    );

    const select = container.querySelector("[data-baseweb='select'] div div");
    fireEvent.click(select);
    const options = container.querySelectorAll('li');
    fireEvent.click(options[2]);
    fireEvent.click(getByText('Apply'));

    expect(mockSetFilter.mock.calls.length).toBe(1);
    const [filterParams] = mockSetFilter.mock.calls[0];
    expect(filterParams.operation).toBe(DATETIME_OPERATIONS.RANGE_TIME);
    expect(Array.isArray(filterParams.dateRange)).toBe(true);
    if (Array.isArray(filterParams.dateRange)) {
      const [left, right] = filterParams.dateRange;
      expect(isSameHour(left, data[0])).toBe(true);
      expect(isSameHour(right, data[data.length - 1])).toBe(true);
      expect(isSameMinute(left, data[0])).toBe(true);
      expect(isSameMinute(right, data[data.length - 1])).toBe(true);
    }
  });
});
