/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';

import { StatefulContainer, PLACEMENT, TRIGGER_TYPE } from '../index.js';

describe('StatefulPopoverContainer', () => {
  it('basic render', () => {
    const props = {
      overrides: {
        Body: function CustomBody() {
          return <span />;
        },
      },
      content: jest.fn(),
      onMouseEnterDelay: 100,
      onMouseLeaveDelay: 200,
      placement: PLACEMENT.topLeft,
      popperOptions: {},
      showArrow: true,
      triggerType: TRIGGER_TYPE.hover,
      dismissOnClickOutside: true,
      dismissOnEsc: true,
      initialState: {
        isOpen: true,
      },
      onClose: jest.fn(),
      onOpen: jest.fn(),
      stateReducer: jest.fn(),
    };
    const children = jest.fn(() => null);

    render(<StatefulContainer {...props}>{children}</StatefulContainer>);
    expect(children).toHaveBeenCalledTimes(1);
  });

  it('dismisses on click outside', () => {
    const props = {
      content: jest.fn(),
      initialState: {
        isOpen: true,
      },
    };
    const children = jest.fn(() => null);

    render(<StatefulContainer {...props}>{children}</StatefulContainer>);

    // dismissOnClickOutside should default to true - onClickOutside should be set
    const firstRender = children.mock.calls[0][0];
    expect(firstRender).toHaveProperty('isOpen', true);
    expect(firstRender).toHaveProperty('onClickOutside');

    // Check that onClickOutside callback properly updates component state
    // $FlowFixMe - Flow can't infer that expect() above ensures non-nullity
    act(() => firstRender.onClickOutside());
    const secondRender = children.mock.calls[1][0];
    expect(secondRender).toHaveProperty('isOpen', false);
  });

  it('disables dismiss on click outside', () => {
    const props = {
      dismissOnClickOutside: false,
      content: jest.fn(),
      initialState: {
        isOpen: true,
      },
    };
    const children = jest.fn(() => null);

    render(<StatefulContainer {...props}>{children}</StatefulContainer>);

    // dismissOnClickOutside should default to true - onClickOutside should be set
    const firstRender = children.mock.calls[0][0];
    expect(firstRender).not.toHaveProperty('onClickOutside');
  });

  it('dismiss on escape', () => {
    const props = {
      content: jest.fn(),
      initialState: {
        isOpen: true,
      },
    };
    const children = jest.fn(() => null);

    render(<StatefulContainer {...props}>{children}</StatefulContainer>);

    // dismissOnEsc should default to true - onEsc should be set
    const firstRender = children.mock.calls[0][0];
    expect(firstRender).toHaveProperty('onEsc');

    // Check that onEsc callback properly updates component state
    // $FlowFixMe - Flow can't use expect() to refine type to non-null
    act(() => firstRender.onEsc());
    const secondRender = children.mock.calls[1][0];
    expect(secondRender).toHaveProperty('isOpen', false);
  });

  it('disables dismiss on escape', () => {
    const props = {
      dismissOnEsc: false,
      content: jest.fn(),
      initialState: {
        isOpen: true,
      },
    };
    const children = jest.fn(() => null);

    render(<StatefulContainer {...props}>{children}</StatefulContainer>);

    // dismissOnClickOutside should default to true - onClickOutside should be set
    const firstRender = children.mock.calls[0][0];
    expect(firstRender).not.toHaveProperty('onEsc');
  });

  it('hover trigger type events', () => {
    const props = {
      content: jest.fn(),
      triggerType: TRIGGER_TYPE.hover,
    };
    const children = jest.fn(() => null);

    render(<StatefulContainer {...props}>{children}</StatefulContainer>);

    // Should have hover-related callbacks
    const first = children.mock.calls[0][0];
    expect(first).toHaveProperty('isOpen', false);
    expect(first).toHaveProperty('onMouseEnter');
    expect(first).toHaveProperty('onMouseLeave');
    expect(first).toHaveProperty('onFocus');
    expect(first).toHaveProperty('onBlur');
    expect(first).toHaveProperty('onClick', undefined);

    // $FlowFixMe - Flow can't use expect() to refine type to non-null
    act(() => first.onMouseEnter());
    const second = children.mock.calls[1][0];
    expect(second).toHaveProperty('isOpen', true);

    // $FlowFixMe - Flow can't use expect() to refine type to non-null
    act(() => second.onMouseLeave());
    const third = children.mock.calls[2][0];
    expect(third).toHaveProperty('isOpen', false);

    // $FlowFixMe - Flow can't use expect() to refine type to non-null
    act(() => third.onFocus());
    const fourth = children.mock.calls[3][0];
    expect(fourth).toHaveProperty('isOpen', true);

    // $FlowFixMe - Flow can't use expect() to refine type to non-null
    act(() => fourth.onBlur());
    const fifth = children.mock.calls[4][0];
    expect(fifth).toHaveProperty('isOpen', false);
  });

  it('click trigger type events', () => {
    const props = {
      content: jest.fn(),
      triggerType: TRIGGER_TYPE.click,
    };
    const children = jest.fn(() => null);

    render(<StatefulContainer {...props}>{children}</StatefulContainer>);

    const first = children.mock.calls[0][0];
    expect(first).toHaveProperty('isOpen', false);
    expect(first).toHaveProperty('onClick');
    expect(first).toHaveProperty('onMouseEnter', undefined);
    expect(first).toHaveProperty('onMouseLeave', undefined);
    expect(first).toHaveProperty('onFocus', undefined);
    expect(first).toHaveProperty('onBlur', undefined);

    // $FlowFixMe
    act(() => first.onClick());
    const second = children.mock.calls[1][0];
    expect(second).toHaveProperty('isOpen', true);

    // $FlowFixMe
    act(() => second.onClick());
    const third = children.mock.calls[2][0];
    expect(third).toHaveProperty('isOpen', false);
  });

  it('calls onOpen/onClose callbacks', () => {
    const props = {
      onOpen: jest.fn(),
      onClose: jest.fn(),
    };
    const children = jest.fn(() => null);

    render(<StatefulContainer {...props}>{children}</StatefulContainer>);

    // $FlowFixMe
    act(() => children.mock.calls[0][0].onClick());
    expect(props.onOpen).toHaveBeenCalledTimes(1);
    expect(props.onClose).toHaveBeenCalledTimes(0);

    props.onOpen.mockClear();
    props.onClose.mockClear();

    // $FlowFixMe
    act(() => children.mock.calls[0][0].onClick());
    expect(props.onOpen).toHaveBeenCalledTimes(0);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('null stateReducer', () => {
    const props = {
      content: jest.fn(),
      stateReducer: null,
    };
    const children = jest.fn(() => null);

    render(
      // $FlowFixMe - Allow null stateReducer for the sake of testing
      <StatefulContainer {...props}>{children}</StatefulContainer>
    );

    expect(children.mock.calls[0][0]).toHaveProperty('isOpen', false);
    // $FlowFixMe
    act(() => children.mock.calls[0][0].onClick());
    expect(children.mock.calls[1][0]).toHaveProperty('isOpen', true);
  });
});
