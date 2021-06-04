/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env node */

import * as React from 'react';
import {render, fireEvent, getByText} from '@testing-library/react';

import {Checkbox} from '../index.js';

describe('Stateless checkbox', function() {
  it('renders provided label', function() {
    const {container} = render(<Checkbox>label</Checkbox>);
    getByText(container, 'label');
  });

  it('calls provided event handlers', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseDown = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    const {container} = render(
      <Checkbox
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        label
      </Checkbox>,
    );

    const input = container.querySelector('input');

    fireEvent.mouseEnter(input);
    fireEvent.mouseLeave(input);
    fireEvent.mouseUp(input);
    fireEvent.mouseDown(input);
    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(onMouseEnter.mock.calls.length).toBe(1);
    expect(onMouseLeave.mock.calls.length).toBe(1);
    expect(onMouseUp.mock.calls.length).toBe(1);
    expect(onMouseDown.mock.calls.length).toBe(1);
    expect(onFocus.mock.calls.length).toBe(1);
    expect(onBlur.mock.calls.length).toBe(1);
  });

  it('only fires one click event', () => {
    const onAncestorClick = jest.fn();
    const {container} = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div onClick={onAncestorClick}>
        <Checkbox>label</Checkbox>
      </div>,
    );
    const label = container.querySelector('label');
    fireEvent.click(label);
    expect(onAncestorClick.mock.calls.length).toBe(1);
  });
});
