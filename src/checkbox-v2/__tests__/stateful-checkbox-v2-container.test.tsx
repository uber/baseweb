/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StatefulContainer, StatefulCheckbox } from '..';
import '@testing-library/jest-dom';

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

  it('calls provided event handlers', async () => {
    const user = userEvent.setup();

    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseDown = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    const { container } = render(
      <StatefulCheckbox
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        label
      </StatefulCheckbox>
    );

    const input = container.querySelector('input');
    if (input) {
      // Hover triggers: mouseEnter
      await user.hover(input);
      expect(onMouseEnter).toHaveBeenCalledTimes(1);

      // Unhover triggers: mouseLeave
      await user.unhover(input);
      expect(onMouseLeave).toHaveBeenCalledTimes(1);

      // Mouse down / up
      await user.pointer({ target: input, keys: '[MouseLeft]' });
      expect(onMouseDown).toHaveBeenCalledTimes(1);
      expect(onMouseUp).toHaveBeenCalledTimes(1);

      // Focus (via tab)
      await user.tab();
      expect(onFocus).toHaveBeenCalledTimes(1);

      // Blur
      await user.tab(); // move focus away
      expect(onBlur).toHaveBeenCalledTimes(1);
    }
  });

  it('updates checked state on change', async () => {
    const user = userEvent.setup();
    const { container } = render(<StatefulCheckbox>label</StatefulCheckbox>);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
  });

  it('updates checked state on change(keyboard)', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<StatefulCheckbox>label</StatefulCheckbox>);
    const input = getByRole('checkbox');

    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
    await user.keyboard(' ');
    expect(input).not.toBeChecked();
    await user.keyboard('{Enter}');
    expect(input).toBeChecked();
  });
});
