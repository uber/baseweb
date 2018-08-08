/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
/* global document */
import React from 'react';
import {shallow} from 'enzyme';
import {StatefulContainer, STATE_CHANGE_TYPE} from '../index';

test('StatefulContainer - basic render', () => {
  const props = {
    components: {
      Label: function CustomLabel() {
        return <span />;
      },
    },
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
  // $FlowFixMe
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
  // $FlowFixMe
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

  component.instance().onChange(event);
  expect(component).toHaveState('value', 'input value');
});
