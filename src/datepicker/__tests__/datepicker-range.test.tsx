/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import MockDate from 'mockdate';
import { render, fireEvent, queryByTestId, getByText } from '@testing-library/react';

import { TestBaseProvider } from '../../test/test-utils';
import { Datepicker } from '..';
import { TimePicker } from '../../timepicker';

function ComposedRangePicker({
  initialDates = [] as Array<Date | null>,
  minDate,
  maxDate,
  onDatesChange,
}: {
  initialDates?: Array<Date | null>;
  minDate?: Date;
  maxDate?: Date;
  onDatesChange?: (dates: Array<Date | null>) => void;
}) {
  const [dates, setDates] = React.useState<Array<Date | undefined | null>>(initialDates);

  const update = (next: Array<Date | undefined | null>) => {
    setDates(next);
    onDatesChange?.(next as Array<Date | null>);
  };

  return (
    <TestBaseProvider>
      <Datepicker
        value={dates}
        onChange={({ date }) => update(date as any)}
        range
        displayValueAtRangeIndex={0}
        mask="9999/99/99"
        minDate={minDate}
        maxDate={maxDate}
        timeSelectStart
        overrides={{
          CalendarContainer: { props: { 'data-testid': 'start-calendar' } },
          TimeSelectContainer: { props: { 'data-testid': 'start-time-select' } },
        }}
      />
      <Datepicker
        value={dates}
        onChange={({ date }) => update(date as any)}
        range
        displayValueAtRangeIndex={1}
        mask="9999/99/99"
        minDate={minDate}
        maxDate={maxDate}
        timeSelectEnd
        overrides={{
          CalendarContainer: { props: { 'data-testid': 'end-calendar' } },
          TimeSelectContainer: { props: { 'data-testid': 'end-time-select' } },
        }}
      />
      <button data-testid="clear-btn" onClick={() => update([])}>
        clear
      </button>
      <span data-testid="start-date">{dates[0] ? dates[0].toISOString() : 'null'}</span>
      <span data-testid="end-date">{dates[1] ? dates[1].toISOString() : 'null'}</span>
    </TestBaseProvider>
  );
}

describe('Composed range datepicker', () => {
  beforeEach(() => {
    MockDate.set('2021-11-25 10:30');
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('fires onChange with partial range on first click so parent state updates', () => {
    const onDatesChange = jest.fn();
    const { container } = render(<ComposedRangePicker onDatesChange={onDatesChange} />);

    const inputs = container.querySelectorAll('input');
    fireEvent.focus(inputs[0]);

    const calendar = queryByTestId(container, 'start-calendar');
    expect(calendar).not.toBeNull();

    fireEvent.click(getByText(calendar!, '15'));

    const lastCall = onDatesChange.mock.calls[onDatesChange.mock.calls.length - 1][0];
    expect(Array.isArray(lastCall)).toBe(true);
    expect(lastCall[0]).toBeTruthy();
    expect(lastCall[0].getDate()).toBe(15);
  });

  it('popover stays open after first click for second click', () => {
    const startDate = new Date(2021, 10, 10, 12, 0, 0);
    const { container } = render(<ComposedRangePicker initialDates={[startDate, null]} />);

    const inputs = container.querySelectorAll('input');
    fireEvent.focus(inputs[0]);

    expect(queryByTestId(container, 'start-calendar')).not.toBeNull();

    // With value=[Nov10, null], clicking Nov 20 completes the range.
    const calendar = queryByTestId(container, 'start-calendar')!;
    fireEvent.click(getByText(calendar, '20'));

    // Both dates set → popover closes
    expect(queryByTestId(container, 'start-calendar')).toBeNull();
  });

  it('two-click range selection from cleared state', () => {
    const onDatesChange = jest.fn();
    const { container } = render(<ComposedRangePicker onDatesChange={onDatesChange} />);

    const inputs = container.querySelectorAll('input');
    fireEvent.focus(inputs[0]);

    const calendar = queryByTestId(container, 'start-calendar');
    expect(calendar).not.toBeNull();

    fireEvent.click(getByText(calendar!, '10'));

    expect(onDatesChange).toHaveBeenCalled();
    const firstCall = onDatesChange.mock.calls[onDatesChange.mock.calls.length - 1][0];
    expect(firstCall[0]).toBeTruthy();
    expect(firstCall[0].getDate()).toBe(10);

    expect(queryByTestId(container, 'start-calendar')).not.toBeNull();
  });

  it('clearing end date input preserves start date', () => {
    const startDate = new Date(2021, 10, 10, 12, 0, 0);
    const endDate = new Date(2021, 10, 20, 12, 0, 0);
    const onDatesChange = jest.fn();
    const { container } = render(
      <ComposedRangePicker initialDates={[startDate, endDate]} onDatesChange={onDatesChange} />
    );

    const inputs = container.querySelectorAll('input');
    fireEvent.focus(inputs[1]);
    fireEvent.change(inputs[1], { target: { value: '' } });

    const lastCall = onDatesChange.mock.calls[onDatesChange.mock.calls.length - 1][0];
    expect(lastCall[0]).toBeTruthy();
    expect(lastCall[0].getDate()).toBe(10);
    expect(lastCall[1]).toBeNull();
  });

  it('clearing start date input preserves end date', () => {
    const startDate = new Date(2021, 10, 10, 12, 0, 0);
    const endDate = new Date(2021, 10, 20, 12, 0, 0);
    const onDatesChange = jest.fn();
    const { container } = render(
      <ComposedRangePicker initialDates={[startDate, endDate]} onDatesChange={onDatesChange} />
    );

    const inputs = container.querySelectorAll('input');
    fireEvent.focus(inputs[0]);
    fireEvent.change(inputs[0], { target: { value: '' } });

    const lastCall = onDatesChange.mock.calls[onDatesChange.mock.calls.length - 1][0];
    expect(lastCall[0]).toBeNull();
    expect(lastCall[1]).toBeTruthy();
    expect(lastCall[1].getDate()).toBe(20);
  });

  it('end time picker works when only start date is set', () => {
    const startDate = new Date(2021, 10, 10, 12, 0, 0);
    const onDatesChange = jest.fn();
    const { container } = render(
      <ComposedRangePicker initialDates={[startDate, null]} onDatesChange={onDatesChange} />
    );

    const inputs = container.querySelectorAll('input');
    fireEvent.focus(inputs[1]);

    const endCalendar = queryByTestId(container, 'end-calendar');
    expect(endCalendar).not.toBeNull();

    const endTimeSelect = queryByTestId(container, 'end-time-select');
    expect(endTimeSelect).not.toBeNull();

    const selectInput = endTimeSelect!.querySelector('[data-baseweb="select"]');
    if (selectInput?.firstChild) {
      fireEvent.click(selectInput.firstChild as HTMLElement);
    }

    const listbox = document.body.querySelector('[role="listbox"]');
    expect(listbox).not.toBeNull();
    const option3pm = Array.from(listbox!.querySelectorAll('[role="option"]')).find(
      (o) => o.textContent === '3:00 PM'
    );
    expect(option3pm).toBeTruthy();
    fireEvent.click(option3pm!);

    expect(onDatesChange).toHaveBeenCalled();
    const lastCall = onDatesChange.mock.calls[onDatesChange.mock.calls.length - 1][0];
    expect(lastCall[0]).toBeTruthy();
    expect(lastCall[1]).toBeTruthy();
    expect(lastCall[1].getHours()).toBe(15);
  });
});

describe('Calendar time select with minDate/maxDate', () => {
  beforeEach(() => {
    MockDate.set('2021-11-25 10:30');
  });

  afterEach(() => {
    MockDate.reset();
  });

  const minDate = new Date(2021, 10, 5, 9, 0, 0);
  const maxDate = new Date(2021, 10, 25, 17, 0, 0);

  it('constrains time options when selected date matches minDate', () => {
    const startDate = new Date(2021, 10, 5, 10, 0, 0);
    const endDate = new Date(2021, 10, 20, 12, 0, 0);
    const { container } = render(
      <ComposedRangePicker
        initialDates={[startDate, endDate]}
        minDate={minDate}
        maxDate={maxDate}
      />
    );

    const inputs = container.querySelectorAll('input');
    fireEvent.focus(inputs[0]);

    const timeSelect = queryByTestId(container, 'start-time-select');
    expect(timeSelect).not.toBeNull();

    const selectInput = timeSelect!.querySelector('[data-baseweb="select"]');
    if (selectInput?.firstChild) {
      fireEvent.click(selectInput.firstChild as HTMLElement);
    }

    const listbox = document.body.querySelector('[role="listbox"]');
    expect(listbox).not.toBeNull();
    const texts = Array.from(listbox!.querySelectorAll('[role="option"]')).map(
      (o) => o.textContent
    );
    expect(texts).not.toContain('8:00 AM');
    expect(texts).toContain('10:00 AM');
  });

  it('does not constrain time when date is between min and max', () => {
    const startDate = new Date(2021, 10, 15, 10, 0, 0);
    const endDate = new Date(2021, 10, 20, 12, 0, 0);
    const { container } = render(
      <ComposedRangePicker
        initialDates={[startDate, endDate]}
        minDate={minDate}
        maxDate={maxDate}
      />
    );

    const inputs = container.querySelectorAll('input');
    fireEvent.focus(inputs[0]);

    const timeSelect = queryByTestId(container, 'start-time-select');
    expect(timeSelect).not.toBeNull();

    const selectInput = timeSelect!.querySelector('[data-baseweb="select"]');
    if (selectInput?.firstChild) {
      fireEvent.click(selectInput.firstChild as HTMLElement);
    }

    const listbox = document.body.querySelector('[role="listbox"]');
    expect(listbox).not.toBeNull();
    const texts = Array.from(listbox!.querySelectorAll('[role="option"]')).map(
      (o) => o.textContent
    );
    expect(texts).toContain('12:00 AM');
    expect(texts).toContain('8:00 AM');
    expect(texts).toContain('6:00 PM');
  });

  it('constrains both ends when minDate and maxDate are the same day', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const sameDayMin = new Date(2021, 10, 15, 10, 0, 0);
    const sameDayMax = new Date(2021, 10, 15, 16, 0, 0);
    const startDate = new Date(2021, 10, 15, 12, 0, 0);
    const { container } = render(
      <ComposedRangePicker
        initialDates={[startDate, null]}
        minDate={sameDayMin}
        maxDate={sameDayMax}
      />
    );

    const inputs = container.querySelectorAll('input');
    fireEvent.focus(inputs[0]);

    const timeSelect = queryByTestId(container, 'start-time-select');
    expect(timeSelect).not.toBeNull();

    const selectInput = timeSelect!.querySelector('[data-baseweb="select"]');
    if (selectInput?.firstChild) {
      fireEvent.click(selectInput.firstChild as HTMLElement);
    }

    const listbox = document.body.querySelector('[role="listbox"]');
    expect(listbox).not.toBeNull();
    const texts = Array.from(listbox!.querySelectorAll('[role="option"]')).map(
      (o) => o.textContent
    );
    expect(texts).not.toContain('9:00 AM');
    expect(texts).not.toContain('5:00 PM');
    expect(texts).toContain('10:00 AM');
    expect(texts).toContain('12:00 PM');
    expect(texts).toContain('4:00 PM');
    warnSpy.mockRestore();
  });
});

describe('TimePicker with null value', () => {
  beforeEach(() => {
    MockDate.set('2021-11-25 10:30');
  });

  afterEach(() => {
    MockDate.reset();
  });

  const minTime = new Date(2021, 10, 5, 9, 0, 0);
  const maxTime = new Date(2021, 10, 25, 17, 0, 0);

  it('shows all times when value is null', () => {
    const { container } = render(
      <TestBaseProvider>
        <TimePicker value={null} minTime={minTime} maxTime={maxTime} nullable />
      </TestBaseProvider>
    );

    const selectInput = container.querySelector('[data-baseweb="select"]');
    if (selectInput?.firstChild) {
      fireEvent.click(selectInput.firstChild as HTMLElement);
    }

    const listbox = document.body.querySelector('[role="listbox"]');
    expect(listbox).not.toBeNull();
    const texts = Array.from(listbox!.querySelectorAll('[role="option"]')).map(
      (o) => o.textContent
    );
    expect(texts).toContain('12:00 AM');
    expect(texts).toContain('8:00 PM');
    expect(texts).toContain('11:45 PM');
  });

  it('uses minTime date as fallback when value is null', () => {
    const onChange = jest.fn();
    const { container } = render(
      <TestBaseProvider>
        <TimePicker value={null} minTime={minTime} maxTime={maxTime} nullable onChange={onChange} />
      </TestBaseProvider>
    );

    const selectInput = container.querySelector('[data-baseweb="select"]');
    if (selectInput?.firstChild) {
      fireEvent.click(selectInput.firstChild as HTMLElement);
    }

    const listbox = document.body.querySelector('[role="listbox"]');
    expect(listbox).not.toBeNull();
    const option3pm = Array.from(listbox!.querySelectorAll('[role="option"]')).find(
      (o) => o.textContent === '3:00 PM'
    );
    expect(option3pm).toBeTruthy();
    fireEvent.click(option3pm!);

    expect(onChange).toHaveBeenCalled();
    const result = onChange.mock.calls[0][0];
    expect(result).toBeTruthy();
    expect(result.getDate()).toBe(5);
    expect(result.getHours()).toBe(15);
  });

  it('clamps to maxTime when selected time exceeds it and value is null', () => {
    const sameDayMin = new Date(2021, 10, 15, 10, 0, 0);
    const sameDayMax = new Date(2021, 10, 15, 16, 0, 0);
    const onChange = jest.fn();
    const { container } = render(
      <TestBaseProvider>
        <TimePicker
          value={null}
          minTime={sameDayMin}
          maxTime={sameDayMax}
          nullable
          onChange={onChange}
        />
      </TestBaseProvider>
    );

    const selectInput = container.querySelector('[data-baseweb="select"]');
    if (selectInput?.firstChild) {
      fireEvent.click(selectInput.firstChild as HTMLElement);
    }

    const listbox = document.body.querySelector('[role="listbox"]');
    expect(listbox).not.toBeNull();
    const option8pm = Array.from(listbox!.querySelectorAll('[role="option"]')).find(
      (o) => o.textContent === '8:00 PM'
    );
    expect(option8pm).toBeTruthy();
    fireEvent.click(option8pm!);

    expect(onChange).toHaveBeenCalled();
    const result = onChange.mock.calls[0][0];
    expect(result).toBeTruthy();
    expect(result.getDate()).toBe(15);
    expect(result.getHours()).toBe(16);
    expect(result.getMinutes()).toBe(0);
  });

  it('clamps to minTime when selected time is before it and value is null', () => {
    const sameDayMin = new Date(2021, 10, 15, 10, 0, 0);
    const sameDayMax = new Date(2021, 10, 15, 16, 0, 0);
    const onChange = jest.fn();
    const { container } = render(
      <TestBaseProvider>
        <TimePicker
          value={null}
          minTime={sameDayMin}
          maxTime={sameDayMax}
          nullable
          onChange={onChange}
        />
      </TestBaseProvider>
    );

    const selectInput = container.querySelector('[data-baseweb="select"]');
    if (selectInput?.firstChild) {
      fireEvent.click(selectInput.firstChild as HTMLElement);
    }

    const listbox = document.body.querySelector('[role="listbox"]');
    expect(listbox).not.toBeNull();
    const option8am = Array.from(listbox!.querySelectorAll('[role="option"]')).find(
      (o) => o.textContent === '8:00 AM'
    );
    expect(option8am).toBeTruthy();
    fireEvent.click(option8am!);

    expect(onChange).toHaveBeenCalled();
    const result = onChange.mock.calls[0][0];
    expect(result).toBeTruthy();
    expect(result.getDate()).toBe(15);
    expect(result.getHours()).toBe(10);
    expect(result.getMinutes()).toBe(0);
  });

  it('rebuilds steps when value transitions from set to null', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const onChange = jest.fn();
    function Case() {
      const [value, setValue] = React.useState<Date | null>(new Date(2021, 10, 25, 15, 0, 0));
      return (
        <TestBaseProvider>
          <TimePicker
            value={value}
            minTime={minTime}
            maxTime={maxTime}
            nullable
            onChange={(t) => {
              setValue(t);
              onChange(t);
            }}
          />
          <button data-testid="clear" onClick={() => setValue(null)}>
            clear
          </button>
        </TestBaseProvider>
      );
    }

    const { container } = render(<Case />);

    fireEvent.click(queryByTestId(container, 'clear')!);

    const selectEl = container.querySelector('[data-baseweb="select"]');
    expect(selectEl).not.toBeNull();
    const input = selectEl!.querySelector('input');
    if (input) {
      fireEvent.focus(input);
      fireEvent.click(input);
    }

    const listbox = document.body.querySelector('[role="listbox"]');
    expect(listbox).not.toBeNull();
    const texts = Array.from(listbox!.querySelectorAll('[role="option"]')).map(
      (o) => o.textContent
    );
    expect(texts).toContain('6:00 PM');
    expect(texts).toContain('8:00 PM');
    expect(texts).toContain('12:00 AM');

    warnSpy.mockRestore();
  });
});
