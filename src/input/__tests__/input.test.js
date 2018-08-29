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
import {Input, StyledInputContainer} from '../index';

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
  expect(wrapper).toHaveState('isFocused', false);

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
  expect(wrapper).toHaveState('isFocused', true);

  // onBlur handler from props is called
  renderedInput.simulate('blur');
  expect(props.onBlur).toBeCalled();
  expect(wrapper).toHaveState('isFocused', false);

  // onChange handler from props is called
  renderedInput.simulate('change');
  expect(props.onChange).toBeCalled();
});

test('Input - renders enhancers', () => {
  const props = {
    onChange: jest.fn(),
    startEnhancer: 'pre',
    endEnhancer: 'post',
  };

  const wrapper = mount(<Input {...props} />);
  expect(wrapper).toHaveState('isFocused', false);

  // Renders input, label and caption
  const renderedInput = wrapper.find(StyledInputContainer).first();
  expect(renderedInput).toExist();
  expect(renderedInput.props()).toMatchSnapshot(
    'input has correct props when enhancers added',
  );

  wrapper.setProps({startEnhancer: 'pre', endEnhancer: null});
  const renderedInput2 = wrapper.find(StyledInputContainer).first();
  expect(renderedInput2).toExist();
  expect(renderedInput2.props()).toMatchSnapshot(
    'input has correct props when start enhancers added',
  );
  wrapper.setProps({startEnhancer: null, endEnhancer: 'post'});
  const renderedInput3 = wrapper.find(StyledInputContainer).first();
  expect(renderedInput3).toExist();
  expect(renderedInput3.props()).toMatchSnapshot(
    'input has correct props when end enhancers added',
  );
});
