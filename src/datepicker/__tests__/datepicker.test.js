/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
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
} from '@testing-library/react';

import {TestBaseProvider} from '../../test/test-utils.js';
import {addDays} from 'date-fns';
import {Datepicker, ORIENTATION} from '../index.js';

describe('Datepicker', () => {
  beforeEach(() => {
    MockDate.set('2021-11-25 10:30');
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('opens calendar on down arrow press', () => {
    const {container} = render(
      <TestBaseProvider>
        <Datepicker
          overrides={{CalendarContainer: {props: {'data-testid': 'calendar'}}}}
        />
      </TestBaseProvider>,
    );

    const before = queryByTestId(container, 'calendar');
    expect(before).toBeNull();

    const input = container.querySelector('input');
    fireEvent.keyDown(input, {keyCode: 40});

    const after = queryByTestId(container, 'calendar');
    expect(after).not.toBeNull();
  });

  it('opens calendar on input focus', () => {
    const {container} = render(
      <TestBaseProvider>
        <Datepicker
          overrides={{CalendarContainer: {props: {'data-testid': 'calendar'}}}}
        />
      </TestBaseProvider>,
    );

    const before = queryByTestId(container, 'calendar');
    expect(before).toBeNull();

    const input = container.querySelector('input');
    fireEvent.focus(input);

    const after = queryByTestId(container, 'calendar');
    expect(after).not.toBeNull();
  });

  it('calls provided onChange handler', () => {
    const onChange = jest.fn();
    const {container} = render(
      <TestBaseProvider>
        <Datepicker onChange={onChange} />
      </TestBaseProvider>,
    );
    const input = container.querySelector('input');
    fireEvent.change(input, {target: {value: '2011/11/04'}});
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('calls onChange with single date if not range datepicker', () => {
    const onChange = jest.fn();
    const {container} = render(
      <TestBaseProvider>
        <Datepicker
          onChange={onChange}
          value={null}
          overrides={{
            Input: {
              props: {overrides: {Input: {props: {'data-testid': 'input'}}}},
            },
            MonthYearSelectButton: {
              props: {'data-testid': 'month-year-select-buttons'},
            },
            CalendarContainer: {props: {'data-testid': 'calendar'}},
          }}
        />
      </TestBaseProvider>,
    );

    fireEvent.focus(getByTestId(container, 'input'));
    const [month, year] = getAllByTestId(
      container,
      'month-year-select-buttons',
    );
    fireEvent.click(month);
    fireEvent.click(getByText(month, 'November'));
    fireEvent.click(year);
    fireEvent.click(getByText(container, '2019'));
    fireEvent.click(getByText(container, '1'));

    expect(onChange.mock.calls[1][0].date).toEqual(new Date('2019/11/1'));
  });

  it('does not close calendar if single date from range is selected', () => {
    const onChange = jest.fn();
    const {container} = render(
      <TestBaseProvider>
        <Datepicker
          range
          onChange={onChange}
          value={[]}
          overrides={{
            Input: {
              props: {overrides: {Input: {props: {'data-testid': 'input'}}}},
            },
            MonthYearSelectButton: {
              props: {'data-testid': 'month-year-select-buttons'},
            },
            CalendarContainer: {props: {'data-testid': 'calendar'}},
          }}
        />
      </TestBaseProvider>,
    );

    const input = getByTestId(container, 'input');
    fireEvent.focus(input);

    const before = queryByTestId(container, 'calendar');
    expect(before).not.toBeNull();

    const [month, year] = getAllByTestId(
      container,
      'month-year-select-buttons',
    );

    fireEvent.click(month);
    fireEvent.click(getByText(month, 'November'));
    fireEvent.click(year);
    fireEvent.click(getByText(container, '2019'));

    const day = getByText(container, '1');
    fireEvent.click(day);

    // $FlowFixMe
    expect(onChange.mock.calls[1][0].date.length).toBe(1);
    // $FlowFixMe
    expect(onChange.mock.calls[1][0].date[0]).toEqual(new Date('2019/11/1'));

    const after = queryByTestId(container, 'calendar');
    expect(after).not.toBeNull();
  });

  it('closes calendar if both dates from range are selected', () => {
    function TestCase() {
      const [value, setValue] = React.useState([]);
      return (
        <TestBaseProvider>
          <Datepicker
            range
            onChange={({date}) => setValue(date)}
            value={value}
            overrides={{
              Input: {
                props: {overrides: {Input: {props: {'data-testid': 'input'}}}},
              },
              MonthYearSelectButton: {
                props: {'data-testid': 'month-year-select-buttons'},
              },
              CalendarContainer: {props: {'data-testid': 'calendar'}},
            }}
          />
        </TestBaseProvider>
      );
    }

    const {container} = render(<TestCase />);

    const input = getByTestId(container, 'input');
    fireEvent.focus(input);

    const before = queryByTestId(container, 'calendar');
    expect(before).not.toBeNull();

    const [month, year] = getAllByTestId(
      container,
      'month-year-select-buttons',
    );
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
    const {container} = render(
      <TestBaseProvider>
        <Datepicker value={new Date(dateString)} />
      </TestBaseProvider>,
    );

    const input = container.querySelector('input');
    expect(input.value).toBe(dateString);
  });

  it('renders range input value in expected default format', () => {
    const date = new Date('2019 01 01');
    const value = [date, addDays(date, 3)];
    const {container} = render(
      <TestBaseProvider>
        <Datepicker range value={value} />
      </TestBaseProvider>,
    );

    const input = container.querySelector('input');
    expect(input.value).toBe('2019/01/01 – 2019/01/04');
  });

  it('converts hyphen to en dashes', () => {
    const date = new Date('2019 01 01');
    const mask = '9999/99/99 - 9999/99/99';
    const value = [date, addDays(date, 3)];
    const {container} = render(<Datepicker mask={mask} value={value} />);
    const input = container.querySelector('input');
    expect(input.value).toBe('2019/01/01 – 2019/01/04');
  });

  it('converts em dash to en dashes', () => {
    const date = new Date('2019 01 01');
    const mask = '9999/99/99 — 9999/99/99';
    const value = [date, addDays(date, 3)];
    const {container} = render(<Datepicker mask={mask} value={value} />);
    const input = container.querySelector('input');
    expect(input.value).toBe('2019/01/01 – 2019/01/04');
  });

  it('handles space replacement correctly in formatString', () => {
    const formatString = 'dd MM yyyy';
    const date = new Date('2019/10/21');
    const {container} = render(
      <Datepicker value={date} formatString={formatString} />,
    );
    const input = container.querySelector('input');
    expect(input.value).toBe('21 10 2019');
  });

  it('does not call onChange if input is shorter than default date format', () => {
    const onChange = jest.fn();
    const {container} = render(<Datepicker onChange={onChange} />);
    const input = container.querySelector('input');
    fireEvent.change(input, {currentTarget: {value: '1'}});
    expect(onChange.mock.calls).toHaveLength(0);
  });

  it('disables pagination buttons and month dropdown with multiple months', () => {
    const date = new Date('2019 01 01');
    const monthsShown = 3;
    const {container} = render(
      <TestBaseProvider>
        <Datepicker
          monthsShown={monthsShown}
          orientation={ORIENTATION.horizontal}
          value={date}
          overrides={{
            CalendarContainer: {props: {'data-testid': 'calendar'}},
            PrevButton: {props: {'data-testid': 'prev-button'}},
            NextButton: {props: {'data-testid': 'next-button'}},
            MonthYearSelectButton: {
              props: {'data-testid': 'month-year-select-buttons'},
            },
          }}
        />
      </TestBaseProvider>,
    );

    const input = container.querySelector('input');
    fireEvent.focus(input);

    const calendar = queryAllByTestId(container, 'calendar');
    expect(calendar.length).toBe(monthsShown);

    const prev = queryAllByTestId(container, 'prev-button').filter(
      el => !el.disabled,
    );
    expect(prev.length).toBe(1);

    const next = queryAllByTestId(container, 'next-button').filter(
      el => !el.disabled,
    );
    expect(next.length).toBe(1);

    const selectButton = queryAllByTestId(
      container,
      'month-year-select-buttons',
    );
    expect(selectButton.length).toBe(0);
  });
});
