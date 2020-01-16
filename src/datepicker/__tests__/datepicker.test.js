/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import {Datepicker, Calendar, ORIENTATION} from '../index.js';
import {Input} from '../../input/index.js';
import {Popover} from '../../popover/index.js';
import {addDays} from 'date-fns';
import CalendarHeader from '../calendar-header.js';
import ArrowLeft from '../../icon/arrow-left.js';
import ArrowRight from '../../icon/arrow-right.js';
import {StyledMonthYearSelectButton} from '../styled-components.js';

jest.useFakeTimers();

describe('Datepicker', () => {
  test('basic render', () => {
    const onChange = jest.fn();
    const component = mount(<Datepicker onChange={onChange} />);
    const renderedPopover = component.find(Popover).first();
    const renderedInput = component.find(Input).first();

    expect(renderedPopover).toExist();
    expect(renderedInput).toExist();

    expect(component).toHaveState('isOpen', false);

    // onKeyDown handler is passed to Input
    expect(renderedInput.props().onKeyDown).toEqual(
      component.instance().handleKeyDown,
    );
    // onFocus handler is passed to Input
    expect(renderedInput.props().onFocus).toEqual(component.instance().open);
    // default placeholder string is passed to Input
    expect(renderedInput.props().placeholder).toEqual('YYYY/MM/DD');

    // isOpen state value is passed to Popover
    expect(renderedPopover.props().isOpen).toEqual(component.state().isOpen);
    expect(renderedPopover.props().onEsc).toEqual(
      component.instance().handleEsc,
    );
  });

  test('popover content renders calendar', () => {
    const onChange = jest.fn();
    const onDayClick = jest.fn();
    const date = new Date('2019 01 01');
    const component = mount(
      <Datepicker onChange={onChange} value={date} onDayClick={onDayClick} />,
    );
    const renderedPopover = component.find(Popover).first();
    const PopoverContent = () => renderedPopover.props().content;

    const renderedCal = mount(<PopoverContent />);
    const renderedCalendar = renderedCal.find(Calendar).first();

    expect(renderedCalendar).toExist();

    expect(renderedCalendar.props().value).toEqual(date);
    expect(renderedCalendar.props().onDayClick).toEqual(onDayClick);
    expect(renderedCalendar.props().onChange).toEqual(
      component.instance().onChange,
    );
  });

  test('isOpen state change on down arrow keydown event', () => {
    const onChange = jest.fn();
    const component = mount(<Datepicker onChange={onChange} />);
    let renderedPopover = component.find(Popover).first();
    const renderedInput = component.find(Input).first();

    expect(component).toHaveState('isOpen', false);

    renderedInput.props().onKeyDown({keyCode: 40});
    expect(component).toHaveState('isOpen', true);

    // isOpen state value is passed to Popover
    component.update();
    renderedPopover = component.find(Popover).first();
    expect(renderedPopover.props().isOpen).toEqual(true);
  });

  test('isOpen state change on input focus', () => {
    const onChange = jest.fn();
    const component = mount(<Datepicker onChange={onChange} />);
    let renderedPopover = component.find(Popover).first();
    const renderedInput = component.find(Input).first();

    expect(component).toHaveState('isOpen', false);

    renderedInput.props().onFocus();
    expect(component).toHaveState('isOpen', true);

    // isOpen state value is passed to Popover
    component.update();
    renderedPopover = component.find(Popover).first();
    expect(renderedPopover.props().isOpen).toEqual(true);
  });

  test('onChange handler from props is called', () => {
    const onChange = jest.fn();
    const data = {date: new Date('2019 01 01')};
    const component = mount(<Datepicker onChange={onChange} />);

    component.instance().onChange(data);
    expect(onChange).toBeCalledWith(data);
    expect(component).toHaveState('isOpen', false);
  });

  test('does not set isOpen state to false if a single date from a range selected', () => {
    const onChange = jest.fn();
    const data = {date: [new Date('2019 01 01')]};
    const component = mount(
      <Datepicker onChange={onChange} range value={[]} />,
    );

    component.instance().onChange(data);
    expect(onChange).toBeCalledWith(data);
    expect(component).toHaveState('isOpen', true);
  });

  test('sets isOpen state to false if a range selected', () => {
    const onChange = jest.fn();
    const date = new Date('2019 01 01');
    const data = {date: [date, addDays(date, 3)]};
    const component = mount(
      <Datepicker onChange={onChange} range value={[]} />,
    );

    component.instance().onChange(data);
    expect(onChange).toBeCalledWith(data);
    expect(component).toHaveState('isOpen', false);
  });

  test('default format input value', () => {
    const onChange = jest.fn();
    const date = new Date('2019 01 01');
    const component = mount(<Datepicker onChange={onChange} value={date} />);
    const renderedInput = component.find(Input).first();

    expect(renderedInput.props().value).toEqual('2019/01/01');
  });

  test('default format input range value', () => {
    const onChange = jest.fn();
    const date = new Date('2019 01 01');
    const value = [date, addDays(date, 3)];
    const component = mount(<Datepicker onChange={onChange} value={value} />);
    const renderedInput = component.find(Input).first();

    expect(renderedInput.props().value).toEqual('2019/01/01 – 2019/01/04');
  });

  test('converts hyphen to en dashes', () => {
    const onChange = jest.fn();
    const date = new Date('2019 01 01');
    const mask = '9999/99/99 - 9999/99/99';
    const value = [date, addDays(date, 3)];
    const component = mount(
      <Datepicker mask={mask} onChange={onChange} value={value} />,
    );
    const renderedInput = component.find(Input).first();

    expect(renderedInput.props().value).toEqual('2019/01/01 – 2019/01/04');
  });

  test('converts emdash to en dashes', () => {
    const onChange = jest.fn();
    const date = new Date('2019 01 01');
    const mask = '9999/99/99 — 9999/99/99';
    const value = [date, addDays(date, 3)];
    const component = mount(
      <Datepicker mask={mask} onChange={onChange} value={value} />,
    );
    const renderedInput = component.find(Input).first();

    expect(renderedInput.props().value).toEqual('2019/01/01 – 2019/01/04');
  });

  test('returns a single date object on input change', () => {
    const onChange = jest.fn();
    const date = new Date('2019 01 01');
    const newDate = '2019/10/10';
    const component = mount(<Datepicker onChange={onChange} value={date} />);

    // $FlowFixMe
    component.instance().handleInputChange({
      currentTarget: {
        value: newDate,
      },
    });

    expect(onChange.mock.calls[0][0]).toEqual({
      date: new Date(newDate),
    });
    expect(onChange.mock.calls).toHaveLength(1);
  });

  test('returns an array of date objects on input change', () => {
    const onChange = jest.fn();
    const date = new Date('2019 01 01');
    const value = [date, addDays(date, 3)];
    const component = mount(
      <Datepicker range onChange={onChange} value={value} />,
    );

    // $FlowFixMe
    component.instance().handleInputChange({
      currentTarget: {
        value: '2019/10/10 – 2019/10/12',
      },
    });

    expect(onChange.mock.calls[0][0]).toEqual({
      date: [new Date('2019/10/10'), new Date('2019/10/12')],
    });
    expect(onChange.mock.calls).toHaveLength(1);
  });

  test('returns a null date on input clear', () => {
    const onChange = jest.fn();
    const date = new Date('2019 01 01');
    const component = mount(<Datepicker onChange={onChange} value={date} />);

    // $FlowFixMe
    component.instance().handleInputChange({
      currentTarget: {
        value: '',
      },
    });

    expect(onChange.mock.calls[0][0]).toEqual({
      date: null,
    });
    expect(onChange.mock.calls).toHaveLength(1);
  });

  test('returns an empty array on input clear', () => {
    const onChange = jest.fn();
    const date = new Date('2019 01 01');
    const value = [date, addDays(date, 3)];
    const component = mount(
      <Datepicker range onChange={onChange} value={value} />,
    );

    // $FlowFixMe
    component.instance().handleInputChange({
      currentTarget: {
        value: '',
      },
    });

    expect(onChange.mock.calls[0][0]).toEqual({
      date: [],
    });
    expect(onChange.mock.calls).toHaveLength(1);
  });

  test('calendar popover renders multiple months', () => {
    const date = new Date('2019 01 01');
    const monthsShown = 2;
    const component = mount(
      <Datepicker monthsShown={monthsShown} value={date} />,
    );
    const renderedPopover = component.find(Popover).first();
    const PopoverContent = () => renderedPopover.props().content;

    const renderedCal = mount(<PopoverContent />);

    const renderedMonthHeaders = renderedCal.find(CalendarHeader);
    expect(renderedMonthHeaders.length).toEqual(monthsShown);
  });

  test('hide pagination buttons and month drowndown with mutliple months', () => {
    const date = new Date('2019 01 01');
    const monthsShown = 3;
    const component = mount(
      <Datepicker
        monthsShown={monthsShown}
        orientation={ORIENTATION.horizontal}
        value={date}
      />,
    );
    const renderedPopover = component.find(Popover).first();
    const PopoverContent = () => renderedPopover.props().content;

    const renderedCal = mount(<PopoverContent />);

    const renderedMonthHeaders = renderedCal.find(CalendarHeader);
    const renderedPreviousButton = renderedMonthHeaders.find(ArrowLeft);
    expect(renderedPreviousButton.length).toEqual(1);
    const renderedNextButton = renderedMonthHeaders.find(ArrowRight);
    expect(renderedNextButton.length).toEqual(1);

    const renderedMonthYearSelectButton = renderedMonthHeaders.find(
      StyledMonthYearSelectButton,
    );
    expect(renderedMonthYearSelectButton.length).toEqual(0);
  });
});
