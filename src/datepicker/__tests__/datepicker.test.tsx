/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import MockDate from 'mockdate';
import {
  render,
  fireEvent,
  getByTestId,
  getAllByTestId,
  queryByTestId,
  queryAllByTestId,
  getByText,
  findByTestId,
  findAllByTestId,
  waitFor,
  queryByText,
} from '@testing-library/react';

import { TestBaseProvider } from '../../test/test-utils';
import { addDays } from 'date-fns';
import { Datepicker, ORIENTATION } from '..';

describe('Datepicker', () => {
  beforeEach(() => {
    MockDate.set('2021-11-25 10:30');
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('opens calendar modal on button press', async () => {
    const { container } = render(
      <TestBaseProvider>
        <Datepicker
          overrides={{
            CalendarContainer: { props: { 'data-testid': 'calendar' } },
            CalendarButton: {
              props: { 'data-testid': 'calendar-button' },
            },
          }}
        />
      </TestBaseProvider>
    );

    const before = queryByTestId(container, 'calendar');
    expect(before).toBeNull();

    const calendarButton = getByTestId(container, 'calendar-button');
    fireEvent.click(calendarButton);

    const after = await findByTestId(container, 'calendar');
    expect(after).not.toBeNull();
  });

  it('calls provided onChange handler', () => {
    const onChange = jest.fn();
    const { container } = render(
      <TestBaseProvider>
        <Datepicker onChange={onChange} />
      </TestBaseProvider>
    );
    const input = container.querySelector('input');
    if (input) fireEvent.change(input, { target: { value: '2011/11/04' } });
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('calls onChange with single date if not range datepicker', () => {
    const onChange = jest.fn();
    const { container } = render(
      <TestBaseProvider>
        <Datepicker
          onChange={onChange}
          value={null}
          overrides={{
            MonthYearSelectButton: {
              props: { 'data-testid': 'month-year-select-buttons' },
            },
            CalendarContainer: { props: { 'data-testid': 'calendar' } },
            CalendarButton: {
              props: { 'data-testid': 'calendar-button' },
            },
          }}
        />
      </TestBaseProvider>
    );

    const calendarButton = getByTestId(container, 'calendar-button');
    fireEvent.click(calendarButton);
    const [month, year] = getAllByTestId(container, 'month-year-select-buttons');
    fireEvent.click(month);
    fireEvent.click(getByText(month, 'November'));
    fireEvent.click(year);
    fireEvent.click(getByText(container, '2019'));
    fireEvent.click(getByText(container, '1'));

    expect(onChange.mock.calls[0][0].date).toEqual(new Date('2019/11/1'));
  });

  it('does not close calendar if single date from range is selected', async () => {
    const onChange = jest.fn();
    const { container } = render(
      <TestBaseProvider>
        <Datepicker
          range
          onChange={onChange}
          value={[]}
          overrides={{
            MonthYearSelectButton: {
              props: { 'data-testid': 'month-year-select-buttons' },
            },
            CalendarContainer: { props: { 'data-testid': 'calendar' } },
            CalendarButton: {
              props: { 'data-testid': 'calendar-button' },
            },
          }}
        />
      </TestBaseProvider>
    );

    const calendarButton = getByTestId(container, 'calendar-button');
    fireEvent.click(calendarButton);

    const before = await findByTestId(container, 'calendar');
    expect(before).not.toBeNull();

    const [month, year] = getAllByTestId(container, 'month-year-select-buttons');

    await waitFor(() => {
      fireEvent.click(month);
      const november = queryByText(month, 'November');
      fireEvent.click(november);
      fireEvent.click(year);
      fireEvent.click(getByText(container, '2019'));
    });

    const day = getByText(container, '1');
    fireEvent.click(day);

    expect(onChange.mock.calls[0][0].date.length).toBe(1);
    expect(onChange.mock.calls[0][0].date[0]).toEqual(new Date('2019/11/1'));

    const after = queryByTestId(container, 'calendar');
    expect(after).not.toBeNull();
  });

  it('closes calendar if both dates from range are selected', async () => {
    function TestCase() {
      const [value, setValue] = React.useState([]);
      return (
        <TestBaseProvider>
          <Datepicker
            range
            // @ts-ignore
            onChange={({ date }) => setValue(date)}
            value={value}
            overrides={{
              MonthYearSelectButton: {
                props: { 'data-testid': 'month-year-select-buttons' },
              },
              CalendarContainer: { props: { 'data-testid': 'calendar' } },
              CalendarButton: {
                props: { 'data-testid': 'calendar-button' },
              },
            }}
          />
        </TestBaseProvider>
      );
    }

    const { container } = render(<TestCase />);

    const calendarButton = getByTestId(container, 'calendar-button');
    fireEvent.click(calendarButton);

    const before = await findByTestId(container, 'calendar');
    expect(before).not.toBeNull();

    const [month, year] = getAllByTestId(container, 'month-year-select-buttons');
    fireEvent.click(month);
    fireEvent.click(getByText(month, 'November'));
    fireEvent.click(year);
    fireEvent.click(getByText(container, '2019'));
    fireEvent.click(getByText(container, '1'));
    fireEvent.click(getByText(container, '2'));

    const after = queryByTestId(container, 'calendar');
    expect(after).toBeNull();
  });

  it('renders input value in expected default format', () => {
    const dateString = '2011/11/04';
    const { container } = render(
      <TestBaseProvider>
        <Datepicker value={new Date(dateString)} />
      </TestBaseProvider>
    );

    const input = container.querySelector('input');
    expect(input?.value).toBe(dateString);
  });

  it('renders range input value in expected default format', () => {
    const date = new Date('2019 01 01');
    const value = [date, addDays(date, 3)];
    const { container } = render(
      <TestBaseProvider>
        <Datepicker range value={value} />
      </TestBaseProvider>
    );

    const input = container.querySelector('input');
    expect(input?.value).toBe('2019/01/01 – 2019/01/04');
  });

  it('converts hyphen to en dashes', () => {
    const date = new Date('2019 01 01');
    const mask = '99/99/9999 - 99/99/9999';
    const value = [date, addDays(date, 3)];
    const { container } = render(<Datepicker mask={mask} value={value} />);
    const input = container.querySelector('input');
    expect(input?.value).toBe('20/19/0101 – 20/19/0104');
  });

  it('converts em dash to en dashes', () => {
    const date = new Date('2019 01 01');
    const mask = '99/99/9999 — 99/99/9999';
    const value = [date, addDays(date, 3)];
    const { container } = render(<Datepicker mask={mask} value={value} />);
    const input = container.querySelector('input');
    expect(input?.value).toBe('20/19/0101 – 20/19/0104');
  });

  it('handles space replacement correctly in formatString', () => {
    const formatString = 'dd MM yyyy';
    const date = new Date('2019/10/21');
    const { container } = render(<Datepicker value={date} formatString={formatString} />);
    const input = container.querySelector('input');
    expect(input?.value).toBe('21 10 2019');
  });

  it('does not call onChange if input is shorter than default date format', () => {
    const onChange = jest.fn();
    const { container } = render(<Datepicker onChange={onChange} />);
    const input = container.querySelector('input');
    if (input) fireEvent.change(input, { currentTarget: { value: '1' } });
    expect(onChange.mock.calls).toHaveLength(0);
  });

  it('disables pagination buttons with multiple months', async () => {
    const date = new Date('2019 01 01');
    const monthsShown = 3;
    const { container } = render(
      <TestBaseProvider>
        <Datepicker
          monthsShown={monthsShown}
          orientation={ORIENTATION.horizontal}
          value={date}
          overrides={{
            CalendarContainer: { props: { 'data-testid': 'calendar' } },
            PrevButton: { props: { 'data-testid': 'prev-button' } },
            NextButton: { props: { 'data-testid': 'next-button' } },
            MonthYearSelectButton: {
              props: { 'data-testid': 'month-year-select-buttons' },
            },
            CalendarButton: {
              props: { 'data-testid': 'calendar-button' },
            },
          }}
        />
      </TestBaseProvider>
    );

    const calendarButton = getByTestId(container, 'calendar-button');
    fireEvent.click(calendarButton);

    const calendar = await findAllByTestId(container, 'calendar');
    expect(calendar.length).toBe(monthsShown);

    const prev = queryAllByTestId(container, 'prev-button').filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (el) => !(el as any as HTMLButtonElement).disabled
    );
    expect(prev.length).toBe(1);

    const next = queryAllByTestId(container, 'next-button').filter(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (el) => !(el as any as HTMLButtonElement).disabled
    );
    expect(next.length).toBe(1);
  });
});
