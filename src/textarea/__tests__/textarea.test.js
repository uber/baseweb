/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {mount} from 'enzyme';
import Textarea from '../textarea.js';
import {StyledTextarea} from '../styled-components.js';
import {BaseInput} from '../../input/index.js';

describe('Textarea', () => {
  test('Basic functionality', () => {
    const props = {
      value: 'textarea value',
      placeholder: 'Placeholder',
      onFocus: jest.fn(),
      onBlur: jest.fn(),
      onChange: jest.fn(),
    };

    const wrapper = mount(<Textarea {...props} />);
    //$FlowFixMe
    const baseInput = wrapper.find(BaseInput);
    expect(baseInput).toExist();
    expect(baseInput.instance().state.isFocused).toEqual(false);
    expect(baseInput.props()).toMatchSnapshot(
      'textarea renders BaseInput with correct props passed',
    );

    // Renders Textarea
    const renderedTextarea = wrapper.find('textarea').first();
    expect(renderedTextarea).toExist();
    expect(renderedTextarea.props()).toMatchSnapshot(
      'Textarea has correct props',
    );

    expect(renderedTextarea.props().onFocus).toEqual(
      baseInput.instance().onFocus,
    );
    expect(renderedTextarea.props().onFocus).not.toEqual(props.onFocus);
    expect(renderedTextarea.props().onBlur).toEqual(
      baseInput.instance().onBlur,
    );
    expect(renderedTextarea.props().onBlur).not.toEqual(props.onBlur);

    // onFocus handler from props is called
    renderedTextarea.simulate('focus');
    expect(props.onFocus).toBeCalled();
    expect(baseInput.instance().state.isFocused).toEqual(true);

    // onBlur handler from props is called
    renderedTextarea.simulate('blur');
    expect(props.onBlur).toBeCalled();
    expect(baseInput.instance().state.isFocused).toEqual(false);

    // onChange handler from props is called
    renderedTextarea.simulate('change');
    expect(props.onChange).toBeCalled();
  });

  test('autoFocus sets the initial focus state', () => {
    const props = {
      autoFocus: true,
      onChange: jest.fn(),
    };

    const wrapper = mount(<Textarea {...props} />);
    //$FlowFixMe
    const baseInput = wrapper.find(BaseInput);
    // Is focused when mount
    expect(baseInput.instance().state.isFocused).toEqual(true);
  });

  test('With component overrides', () => {
    const CustomContainer = React.forwardRef((props, ref) => (
      <span ref={ref} id="test-container">
        {props.children}
      </span>
    ));
    const CustomTextarea = React.forwardRef((props, ref) => (
      <span ref={ref} id="test-input">
        <StyledTextarea {...props} />
      </span>
    ));

    const props = {
      value: 'textarea value',
      placeholder: 'Placeholder',
      onFocus: jest.fn(),
      onBlur: jest.fn(),
      onChange: jest.fn(),
      overrides: {
        InputContainer: CustomContainer,
        Input: CustomTextarea,
      },
    };

    const wrapper = mount(<Textarea {...props} />);
    //$FlowFixMe
    const baseInput = wrapper.find(BaseInput);
    expect(baseInput.props()).toMatchSnapshot(
      'components overrides get passed to the BaseInput',
    );

    const customContainer = wrapper.find('span#test-container');
    expect(customContainer).toExist();

    const customInput = wrapper.find('span#test-input');
    expect(customInput).toExist();

    const customTextarea = wrapper.find('span#test-input textarea');
    expect(customTextarea).toExist();

    customTextarea.simulate('focus');
    expect(baseInput.instance().state.isFocused).toEqual(true);
    expect(props.onFocus).toHaveBeenCalled();
  });
});
