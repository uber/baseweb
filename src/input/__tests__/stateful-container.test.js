/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global document */
import * as React from 'react';
import {shallow} from 'enzyme';
import {StatefulContainer, STATE_CHANGE_TYPE} from '../index.js';

test('StatefulContainer - basic render', () => {
  const props = {
    initialState: {value: 'initial value'},
    onChange: jest.fn(),
    stateReducer: jest.fn(),
    value: 'value prop',
  };
  const children = jest.fn();

  const component = shallow(
    <StatefulContainer {...props}>{children}</StatefulContainer>,
  );

  expect(children).toHaveBeenCalledTimes(1);
  expect(children.mock.calls[0]).toMatchSnapshot(
    'function-as-child called with correct args',
  );

  // state.value passed to children as a prop
  const childrenValueProp = children.mock.calls[0][0].value;
  expect(childrenValueProp).toBe(component.instance().state.value);
  expect(childrenValueProp).not.toBe(props.value);
});

test('StatefulContainer - children function receives onChange handler', () => {
  const input = document.createElement('input');
  input.type = 'text';
  const event = {target: input};

  const props = {
    onChange: jest.fn(),
    stateReducer: jest.fn(),
  };
  const children = jest.fn();

  const component = shallow(
    <StatefulContainer {...props}>{children}</StatefulContainer>,
  );

  expect(children).toHaveBeenCalledTimes(1);

  // onChange is passed to children function
  const childrenOnChangeProp = children.mock.calls[0][0].onChange;
  expect(childrenOnChangeProp).toBe(component.instance().onChange);
  expect(childrenOnChangeProp).not.toBe(props.onChange);

  // user's onChange handler is called
  childrenOnChangeProp(event);
  expect(props.onChange).toHaveBeenCalledTimes(1);
  expect(props.onChange).toHaveBeenLastCalledWith(event);
});

test('StatefulContainer - stateReducer', () => {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = 'input value';
  const event = {target: input};

  const props = {
    stateReducer: jest.fn(),
    initialState: {value: 'initial value'},
  };
  const children = jest.fn();

  const component = shallow(
    <StatefulContainer {...props}>{children}</StatefulContainer>,
  );

  // onChange event happens
  props.stateReducer.mockReturnValueOnce({value: 'new value'});
  // $FlowFixMe
  component.instance().onChange(event);

  expect(props.stateReducer).toHaveBeenCalledTimes(1);
  expect(props.stateReducer).toHaveBeenLastCalledWith(
    STATE_CHANGE_TYPE.change,
    {value: 'input value'},
    {value: 'initial value'},
  );
  expect(component).toHaveState('value', 'new value');
});

test('StatefulContainer - no stateReducer passed in', () => {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = 'input value';
  const event = {target: input};

  const props = {
    initialState: {value: 'initial value'},
  };
  const children = jest.fn();

  const component = shallow(
    <StatefulContainer {...props}>{children}</StatefulContainer>,
  );

  // $FlowFixMe
  component.instance().onChange(event);
  expect(component).toHaveState('value', 'input value');
});
