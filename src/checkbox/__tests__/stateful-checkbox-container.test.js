/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { StatefulContainer } from '../index.js';

describe('Stateful container', function () {
  it('should provide all needed props to children render func', function () {
    const children = jest.fn(() => null);
    render(<StatefulContainer foo="bar">{children}</StatefulContainer>);
    const props = children.mock.calls[0][0];
    //$FlowExpectedError[prop-missing] - Point of this test is to check a missing prop
    expect(props.foo).toBe('bar');
  });

  it('should provide initial state as part of state', function () {
    const children = jest.fn(() => null);
    render(<StatefulContainer initialState={{ checked: true }}>{children}</StatefulContainer>);
    const props = children.mock.calls[0][0];
    expect(props.checked).toBe(true);
  });

  it('calls provided event handlers', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseDown = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    const { container } = render(
      <StatefulContainer
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {({
          onMouseEnter,
          onMouseLeave,
          //$FlowExpectedError[prop-missing] - Point of this test is to check a missing prop
          onMouseUp,
          //$FlowExpectedError[prop-missing] - Point of this test is to check a missing prop
          onMouseDown,
          onFocus,
          onBlur,
        }) => (
          <input
            {...{
              onMouseEnter,
              onMouseLeave,
              onMouseUp,
              onMouseDown,
              onFocus,
              onBlur,
            }}
          />
        )}
      </StatefulContainer>
    );

    const input = container.querySelector('input');
    if (input) {
      fireEvent.mouseEnter(input);
      fireEvent.mouseLeave(input);
      fireEvent.mouseUp(input);
      fireEvent.mouseDown(input);
      fireEvent.focus(input);
      fireEvent.blur(input);
    }
    expect(onMouseEnter.mock.calls.length).toBe(1);
    expect(onMouseLeave.mock.calls.length).toBe(1);
    expect(onMouseUp.mock.calls.length).toBe(1);
    expect(onMouseDown.mock.calls.length).toBe(1);
    expect(onFocus.mock.calls.length).toBe(1);
    expect(onBlur.mock.calls.length).toBe(1);
  });
});
