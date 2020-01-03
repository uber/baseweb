/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global document */
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import {BaseInput} from '../index.js';

test('BaseInput - basic functionality', () => {
  const props = {
    placeholder: 'Placeholder',
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onKeyDown: jest.fn(),
    onKeyPress: jest.fn(),
    onKeyUp: jest.fn(),
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

  // $FlowFixMe
  const renderedBefore = wrapper.find(props.overrides.Before);
  expect(renderedBefore).toHaveLength(1);
  expect(renderedBefore.props()).toMatchSnapshot('Before gets correct props');

  // $FlowFixMe
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

  // onKeyDown handler from props is called
  renderedInput.simulate('keyDown', {keyCode: 40});
  expect(props.onKeyDown).toBeCalled();

  // onKeyPress handler from props is called
  renderedInput.simulate('keyPress', {keyCode: 40});
  expect(props.onKeyPress).toBeCalled();

  // onKeyUp handler from props is called
  renderedInput.simulate('keyUp', {keyCode: 40});
  expect(props.onKeyUp).toBeCalled();

  // Correct props passed when error state
  wrapper.setProps({error: true});

  // $FlowFixMe
  const updatedBefore = wrapper.find(props.overrides.Before);
  expect(updatedBefore.props()).toMatchSnapshot(
    'Before gets correct error prop',
  );

  // $FlowFixMe
  const updatedAfter = wrapper.find(props.overrides.After);
  expect(updatedAfter.props()).toMatchSnapshot('After gets correct error prop');
});

test('BaseInput - should not take default value prop', () => {
  // $FlowFixMe
  const wrapper = mount(<BaseInput />);
  // Guard against passing default value prop
  expect(wrapper.prop('value')).not.toBeDefined();
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
  const ref = React.createRef();
  const props = {
    autoFocus: true,
    onFocus: jest.fn(),
    onChange: jest.fn(),
    inputRef: ref,
  };

  // $FlowFixMe
  const wrapper = mount(<BaseInput {...props} />);
  // Is focused when mount
  expect(wrapper).toHaveState('isFocused', true);
  expect(wrapper.find('input').getDOMNode() === document.activeElement).toBe(
    true,
  );
});
