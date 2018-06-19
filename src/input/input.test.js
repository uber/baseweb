// @flow
import React from 'react';
import {mount} from 'enzyme';
import {Input} from './index';

test('Input - basic functionality', () => {
  const props = {
    value: 'input value',
    label: 'This is label',
    caption: 'This is caption',
    placeholder: 'Placeholder',
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    onChange: jest.fn(),
  };

  const wrapper = mount(<Input {...props} />);
  expect(wrapper.instance().state.isFocused).toBe(false);

  // Renders input, label and caption
  const renderedInput = wrapper.find('input').first();
  expect(renderedInput).toExist();
  expect(renderedInput.props()).toMatchSnapshot('input has correct props');

  const renderedLabel = wrapper.find('label').first();
  expect(renderedLabel).toExist();
  expect(renderedLabel).toHaveText('This is label');

  const renderedCaption = wrapper.find('div').last();
  expect(renderedCaption).toExist();
  expect(renderedCaption).toHaveText('This is caption');

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
});
