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
import React from 'react';
import {mount} from 'enzyme';
import {BaseInput} from '../index';

test('BaseInput - basic functionality', () => {
  const props = {
    value: 'input value',
    placeholder: 'Placeholder',
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    onChange: jest.fn(),
    overrides: {
      Before: jest.fn().mockImplementation(() => <span />),
      After: jest.fn().mockImplementation(() => <span />),
    },
  };

  // $FlowFixMe
  const wrapper = mount(<BaseInput {...props} />);
  expect(wrapper).toHaveState('isFocused', false);

  // Renders input, before and after
  const renderedInput = wrapper.find('input').first();
  expect(renderedInput).toExist();
  expect(renderedInput.props()).toMatchSnapshot('Base input has correct props');

  expect(renderedInput.props().onFocus).toEqual(wrapper.instance().onFocus);
  expect(renderedInput.props().onBlur).toEqual(wrapper.instance().onBlur);

  const renderedBefore = wrapper.find(props.overrides.Before);
  expect(renderedBefore).toHaveLength(1);
  expect(renderedBefore.props()).toMatchSnapshot('Before gets correct props');

  const renderedAfter = wrapper.find(props.overrides.After);
  expect(renderedAfter).toHaveLength(1);
  expect(renderedAfter.props()).toMatchSnapshot('After gets correct props');

  // onFocus handler from props is called
  renderedInput.simulate('focus');
  expect(props.onFocus).toBeCalled();
  expect(wrapper).toHaveState('isFocused', true);

  // onBlur handler from props is called
  renderedInput.simulate('blur');
  expect(props.onBlur).toBeCalled();
  expect(wrapper).toHaveState('isFocused', false);

  // onChange handler from props is called
  renderedInput.simulate('change');
  expect(props.onChange).toBeCalled();

  // Correct props passed when error state
  wrapper.setProps({error: true});

  const updatedBefore = wrapper.find(props.overrides.Before);
  expect(updatedBefore.props()).toMatchSnapshot(
    'Before gets correct error prop',
  );

  const updatedAfter = wrapper.find(props.overrides.After);
  expect(updatedAfter.props()).toMatchSnapshot('After gets correct error prop');
});

test('BaseInput - autoFocus sets the initial focus state', () => {
  const props = {
    autoFocus: true,
    onFocus: jest.fn(),
    onChange: jest.fn(),
  };

  // $FlowFixMe
  const wrapper = mount(<BaseInput {...props} />);
  // Is focused when mount
  expect(wrapper).toHaveState('isFocused', true);
});

test('BaseInput - inputRef from props', () => {
  const focus = jest.fn();
  const props = {
    autoFocus: true,
    onFocus: jest.fn(),
    onChange: jest.fn(),
    inputRef: {current: {focus}},
  };

  // $FlowFixMe
  const wrapper = mount(<BaseInput {...props} />);
  // Is focused when mount
  expect(wrapper).toHaveState('isFocused', true);
  // ref's focus methos is called
  expect(focus).toBeCalled();
});
