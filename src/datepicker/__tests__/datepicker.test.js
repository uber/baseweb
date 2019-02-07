/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount} from 'enzyme';
import {
  NavigationContainer,
  Unstable_Datepicker as Datepicker,
  Unstable_Calendar as Calendar,
} from '../index.js';
import {Input} from '../../input/index.js';
import {Popover} from '../../popover/index.js';
import {addDays} from 'date-fns';

jest.useFakeTimers();

describe('Datepicker', () => {
  test('basic render', () => {
    const onChange = jest.fn();
    // $FlowFixMe
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
      // $FlowFixMe
      <Datepicker onChange={onChange} value={date} onDayClick={onDayClick} />,
    );
    const renderedPopover = component.find(Popover).first();
    const PopoverContent = () => renderedPopover.props().content;

    const renderedCal = mount(<PopoverContent />);
    const renderedContainer = renderedCal.find(NavigationContainer).first();
    const renderedCalendar = renderedCal.find(Calendar).first();

    expect(renderedContainer).toExist();
    expect(renderedCalendar).toExist();

    expect(renderedCalendar.props().value).toEqual(date);
    expect(renderedCalendar.props().onDayClick).toEqual(onDayClick);
    expect(renderedContainer.props().onChange).toEqual(
      component.instance().onChange,
    );
  });

  test('isOpen state change on down arrow keydown event', () => {
    const onChange = jest.fn();
    // $FlowFixMe
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
    // $FlowFixMe
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
    // $FlowFixMe
    const component = mount(<Datepicker onChange={onChange} />);

    component.instance().onChange(data);
    expect(onChange).toBeCalledWith(data);
    expect(component).toHaveState('isOpen', false);
  });

  test('does not set isOpen state to false if a single date from a range selected', () => {
    const onChange = jest.fn();
    const data = {date: [new Date('2019 01 01')]};
    const component = mount(
      // $FlowFixMe
      <Datepicker onChange={onChange} isRange value={[]} />,
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
      // $FlowFixMe
      <Datepicker onChange={onChange} isRange value={[]} />,
    );

    component.instance().onChange(data);
    expect(onChange).toBeCalledWith(data);
    expect(component).toHaveState('isOpen', false);
  });

  test('default format input value', () => {
    const onChange = jest.fn();
    const date = new Date('2019 01 01');
    // $FlowFixMe
    const component = mount(<Datepicker onChange={onChange} value={date} />);
    const renderedInput = component.find(Input).first();

    expect(renderedInput.props().value).toEqual('2019/01/01');
  });

  test('default format input range value', () => {
    const onChange = jest.fn();
    const date = new Date('2019 01 01');
    const value = [date, addDays(date, 3)];
    // $FlowFixMe
    const component = mount(<Datepicker onChange={onChange} value={value} />);
    const renderedInput = component.find(Input).first();

    expect(renderedInput.props().value).toEqual('2019/01/01 - 2019/01/04');
  });
});
