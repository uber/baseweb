// @flow
import React from 'react';
import {mount} from 'enzyme';
import {BaseInput} from './index';

test('BaseInput - basic functionality', () => {
  const props = {
    value: 'input value',
    placeholder: 'Placeholder',
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    onChange: jest.fn(),
    override: {
      Before: jest.fn().mockImplementation(() => <span />),
      After: jest.fn().mockImplementation(() => <span />),
    },
  };

  // $FlowFixMe
  const wrapper = mount(<BaseInput {...props} />);
  expect(wrapper.instance().state.isFocused).toBe(false);

  // Renders input, before and after
  const renderedInput = wrapper.find('input').first();
  expect(renderedInput).toExist();
  expect(renderedInput.props()).toMatchSnapshot('Base input has correct props');

  expect(renderedInput.props().onFocus).toEqual(wrapper.instance().onFocus);
  expect(renderedInput.props().onBlur).toEqual(wrapper.instance().onBlur);

  const renderedBefore = wrapper.find(props.override.Before);
  expect(renderedBefore).toHaveLength(1);
  expect(renderedBefore.props()).toMatchSnapshot('Before gets correct props');

  const renderedAfter = wrapper.find(props.override.After);
  expect(renderedAfter).toHaveLength(1);
  expect(renderedAfter.props()).toMatchSnapshot('After gets correct props');

  // onFocus handler from props is called
  renderedInput.simulate('focus');
  expect(props.onFocus).toBeCalled();
  expect(wrapper.instance().state.isFocused).toBe(true);

  // onBlur handler from props is called
  renderedInput.simulate('blur');
  expect(props.onBlur).toBeCalled();
  expect(wrapper.instance().state.isFocused).toBe(false);

  // onChange handler from props is called
  renderedInput.simulate('change');
  expect(props.onChange).toBeCalled();

  wrapper.setProps({error: true});

  const updatedBefore = wrapper.find(props.override.Before);
  expect(updatedBefore.props()).toMatchSnapshot(
    'Before gets correct error prop',
  );

  const updatedAfter = wrapper.find(props.override.After);
  expect(updatedAfter.props()).toMatchSnapshot('After gets correct error prop');
});
