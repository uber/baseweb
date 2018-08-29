// @flow
import React from 'react';
import {mount} from 'enzyme';
import Textarea from '../textarea';
import {Textarea as StyledTextarea} from '../styled-components';
import {BaseInput} from '../../input';

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

    // $FlowFixMe
    const wrapper = mount(<Textarea {...props} />);
    const baseInput = wrapper.find(BaseInput);
    // Is focused when mount
    expect(baseInput.instance().state.isFocused).toEqual(true);
  });

  test('inputRef from props', () => {
    const focus = jest.fn();
    const props = {
      autoFocus: true,
      onFocus: jest.fn(),
      onChange: jest.fn(),
      inputRef: {current: {focus}},
    };

    // $FlowFixMe
    const wrapper = mount(<Textarea {...props} />);
    const baseInput = wrapper.find(BaseInput);
    // Is focused when mount
    expect(baseInput.instance().state.isFocused).toEqual(true);
    // ref's focus method is called
    expect(focus).toBeCalled();
  });

  test('With component overrides', () => {
    const props = {
      value: 'textarea value',
      placeholder: 'Placeholder',
      onFocus: jest.fn(),
      onBlur: jest.fn(),
      onChange: jest.fn(),
      overrides: {
        InputContainer: {
          component: function CustomContainer(props: {children: *}) {
            return <span id="test-container">{props.children}</span>;
          },
        },
        Input: function CustomTextarea(props) {
          return (
            <span id="test-input">
              <StyledTextarea {...props} />
            </span>
          );
        },
      },
    };

    // $FlowFixMe
    const wrapper = mount(<Textarea {...props} />);

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
