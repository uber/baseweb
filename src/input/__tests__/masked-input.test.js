/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {mount} from 'enzyme';
import {MaskedInput} from '../index.js';

import {styled} from '../../styles/index.js';

test('MaskedInput - basic functionality', () => {
  const props = {
    value: '(123) 456-7890',
    mask: '(999) 999-9999',
    placeholder: 'Placeholder',
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onKeyDown: jest.fn(),
    onKeyPress: jest.fn(),
    onKeyUp: jest.fn(),
    overrides: {
      Before: styled('span', {}),
      After: styled('span', {}),
    },
  };

  const wrapper = mount(<MaskedInput {...props} />);

  // Renders input, before and after
  const renderedInput = wrapper.find('input').first();
  expect(renderedInput).toExist();
  expect(renderedInput.props()).toMatchSnapshot(
    'Masked input has correct props',
  );

  const renderedBefore = wrapper.find(props.overrides.Before);
  expect(renderedBefore).toHaveLength(1);
  expect(renderedBefore.props()).toMatchSnapshot('Before gets correct props');

  const renderedAfter = wrapper.find(props.overrides.After);
  expect(renderedAfter).toHaveLength(1);
  expect(renderedAfter.props()).toMatchSnapshot('After gets correct props');

  // onFocus handler from props is called
  renderedInput.simulate('focus');
  expect(props.onFocus).toBeCalled();

  // onBlur handler from props is called
  renderedInput.simulate('blur');
  expect(props.onBlur).toBeCalled();

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

  const updatedBefore = wrapper.find(props.overrides.Before);
  expect(updatedBefore.props()).toMatchSnapshot(
    'Before gets correct error prop',
  );

  const updatedAfter = wrapper.find(props.overrides.After);
  expect(updatedAfter.props()).toMatchSnapshot('After gets correct error prop');
});
