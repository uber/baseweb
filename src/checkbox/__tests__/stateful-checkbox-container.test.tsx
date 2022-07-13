/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { StatefulContainer } from '..';

describe('Stateful container', function () {
  it('should provide all needed props to children render func', function () {
    const children = jest.fn((arg) => null);
    // @ts-expect-error - Point of this test is to check a missing prop
    render(<StatefulContainer foo="bar">{children}</StatefulContainer>);
    const props = children.mock.calls[0][0];
    expect(props.foo).toBe('bar');
  });

  it('should provide initial state as part of state', function () {
    const children = jest.fn((arg) => null);
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
        // @ts-expect-error - Point of this test is to check a missing prop
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {({
          onMouseEnter,
          onMouseLeave,
          // @ts-expect-error - Point of this test is to check a missing prop
          onMouseUp,
          // @ts-expect-error - Point of this test is to check a missing prop
          onMouseDown,
          onFocus,
          onBlur,
        }) => (
          // @ts-expect-error incorrect prop types
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
