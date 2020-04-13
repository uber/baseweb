/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render, getByTestId} from '@testing-library/react';
import {mount} from 'enzyme';
import {Toast, StyledBody, StyledCloseIcon, KIND} from '../index.js';

describe('Toast', () => {
  beforeEach(async () => {
    jest.useFakeTimers();
  });

  test('basic toast functionality', () => {
    const wrapper = mount(<Toast>Notification</Toast>);

    expect(wrapper.instance().state.isRendered).toBe(true);
    expect(wrapper.instance().state.isVisible).toBe(false);

    expect(wrapper.find(StyledBody).first()).toExist();
    expect(wrapper.find(StyledCloseIcon).first()).toExist();
  });

  test('Body component props', () => {
    let renderedRoot;
    const wrapper = mount(<Toast>Notification</Toast>);

    renderedRoot = wrapper.find(StyledBody).first();
    expect(renderedRoot).toExist();
    expect(renderedRoot.props().$kind).toBe(KIND.info);
    expect(renderedRoot.props().$closeable).toBe(true);
    expect(renderedRoot.props().$isRendered).toBe(true);
    expect(renderedRoot.props().$isVisible).toBe(false);

    // pass new kind value set to KIND.positive
    // and closeable set to false
    wrapper.setProps({kind: KIND.positive, closeable: false});
    renderedRoot = wrapper.find(StyledBody).first();
    expect(renderedRoot.props().$kind).toBe(KIND.positive);
    expect(renderedRoot.props().$closeable).toBe(false);

    // pass new kind value set to KIND.warning
    wrapper.setProps({kind: KIND.warning});
    renderedRoot = wrapper.find(StyledBody).first();
    expect(renderedRoot.props().$kind).toBe(KIND.warning);

    // pass new kind value set to KIND.negative
    wrapper.setProps({kind: KIND.negative});
    renderedRoot = wrapper.find(StyledBody).first();
    expect(renderedRoot.props().$kind).toBe(KIND.negative);
  });

  test('close icon rendering', () => {
    let renderedCloseButton;
    const wrapper = mount(<Toast>Notification</Toast>);

    renderedCloseButton = wrapper.find(StyledCloseIcon).first();
    expect(renderedCloseButton).toExist();

    // pass new closeable value set to false
    wrapper.setProps({closeable: false});
    renderedCloseButton = wrapper.find(StyledCloseIcon).first();
    expect(renderedCloseButton).not.toExist();
  });

  test('close icon props', () => {
    let renderedCloseButton;
    const wrapper = mount(<Toast>Notification</Toast>);

    renderedCloseButton = wrapper.find(StyledCloseIcon).first();
    expect(renderedCloseButton.props().onClick).toBe(
      wrapper.instance().dismiss,
    );
    expect(renderedCloseButton.props().$kind).toBe(KIND.info);

    // pass new kind value set to KIND.positive
    wrapper.setProps({kind: KIND.positive});
    renderedCloseButton = wrapper.find(StyledCloseIcon).first();
    expect(renderedCloseButton.props().$kind).toBe(KIND.positive);

    // pass new kind value set to KIND.warning
    wrapper.setProps({kind: KIND.warning});
    renderedCloseButton = wrapper.find(StyledCloseIcon).first();
    expect(renderedCloseButton.props().$kind).toBe(KIND.warning);

    // pass new kind value set to KIND.negative
    wrapper.setProps({kind: KIND.negative});
    renderedCloseButton = wrapper.find(StyledCloseIcon).first();
    expect(renderedCloseButton.props().$kind).toBe(KIND.negative);
  });

  test('onClose handler', () => {
    const props = {
      onClose: jest.fn(),
    };
    const wrapper = mount(<Toast {...props}>Notification</Toast>);
    const closeButton = wrapper.find(StyledCloseIcon).first();
    expect(closeButton).toExist();

    closeButton.simulate('click');

    expect(wrapper.instance().state.isRendered).toBe(true);
    expect(wrapper.instance().state.isVisible).toBe(false);
    expect(props.onClose).not.toHaveBeenCalled();

    jest.runAllTimers();
    expect(wrapper.instance().state.isRendered).toBe(false);
    expect(props.onClose).toHaveBeenCalled();
  });

  test('onMouseEnter handler', () => {
    const props = {
      onMouseEnter: jest.fn(),
    };
    const wrapper = mount(<Toast {...props}>Notification</Toast>);

    const renderedRoot = wrapper.find(StyledBody).first();
    const toastOnMouseEnterHandler = wrapper.instance().onMouseEnter;

    expect(renderedRoot.props().onMouseEnter).toBe(toastOnMouseEnterHandler);
    expect(renderedRoot.props().onMouseEnter).not.toBe(props.onMouseEnter);
    // $FlowFixMe
    toastOnMouseEnterHandler({});
    expect(props.onMouseEnter).toHaveBeenCalled();
  });

  test('onMouseLeave handler', () => {
    const props = {
      onMouseLeave: jest.fn(),
    };
    const wrapper = mount(<Toast {...props}>Notification</Toast>);

    const renderedRoot = wrapper.find(StyledBody).first();
    const toastOnMouseLeaveHandler = wrapper.instance().onMouseLeave;

    expect(renderedRoot.props().onMouseLeave).not.toBe(props.onMouseLeave);
    expect(renderedRoot.props().onMouseLeave).toBe(toastOnMouseLeaveHandler);
    // $FlowFixMe
    toastOnMouseLeaveHandler({});
    expect(props.onMouseLeave).toHaveBeenCalled();
  });

  test('onFocus handler', () => {
    const props = {
      onFocus: jest.fn(),
    };
    const wrapper = mount(<Toast {...props}>Notification</Toast>);

    const renderedRoot = wrapper.find(StyledBody).first();
    const toastOnFocusHandler = wrapper.instance().onFocus;

    expect(renderedRoot.props().onFocus).not.toBe(props.onFocus);
    expect(renderedRoot.props().onFocus).toBe(toastOnFocusHandler);
    // $FlowFixMe
    toastOnFocusHandler({});
    expect(props.onFocus).toHaveBeenCalled();
  });

  test('onFocus clears autoHideTimeout and animateOutCompleteTimer timers only', () => {
    const wrapper = mount(<Toast>Notification</Toast>);
    const renderedRoot = wrapper.find(StyledBody).first();
    const toastOnFocusHandler = wrapper.instance().onFocus;
    expect(renderedRoot.props().onFocus).toBe(toastOnFocusHandler);
    jest.runAllTimers();
    // $FlowFixMe
    toastOnFocusHandler({});
    expect(clearTimeout).toHaveBeenCalledTimes(2);
    // $FlowFixMe
    expect(clearTimeout.mock.calls[0][0]).toEqual(
      wrapper.instance().autoHideTimeout,
    );
    // $FlowFixMe
    expect(clearTimeout.mock.calls[1][0]).toEqual(
      wrapper.instance().animateOutCompleteTimer,
    );
  });

  test('onBlur handler', () => {
    const props = {
      onBlur: jest.fn(),
    };
    const wrapper = mount(<Toast {...props}>Notification</Toast>);

    const renderedRoot = wrapper.find(StyledBody).first();
    const toastOnBlurHandler = wrapper.instance().onBlur;

    expect(renderedRoot.props().onBlur).not.toBe(props.onBlur);
    expect(renderedRoot.props().onBlur).toBe(toastOnBlurHandler);
    // $FlowFixMe
    toastOnBlurHandler({});
    expect(props.onBlur).toHaveBeenCalled();
  });

  it('accepts overrides', () => {
    const overrides = {
      Body: {
        component: function BodyComponentOverride({children}) {
          return <div data-testid="body">{children}</div>;
        },
      },
      InnerContainer: {
        component: function InnerContainerOverride({children}) {
          return <div data-testid="inner">{children}</div>;
        },
      },
      CloseIcon: {
        props: {size: '54px', 'data-testid': 'icon'},
        style: {color: 'red'},
      },
    };

    const {container} = render(
      <Toast overrides={overrides}>Toast content</Toast>,
    );
    const body = getByTestId(container, 'body');
    expect(body).not.toBeNull();
    const inner = getByTestId(container, 'inner');
    expect(inner).not.toBeNull();
    const icon = getByTestId(container, 'icon');
    expect(icon).not.toBeNull();
    const iconStyle = JSON.parse(icon.getAttribute('test-style'));
    expect(iconStyle.height).toBe('54px');
    expect(iconStyle.width).toBe('54px');
    expect(iconStyle.color).toBe('red');
  });
});
