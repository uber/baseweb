/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { StatefulSwitch } from '..';

describe('Switch', function () {
  it('calls provided event handlers', async () => {
    const user = userEvent.setup();

    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseDown = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();

    const { getByRole } = render(
      <StatefulSwitch
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        label
      </StatefulSwitch>
    );

    const input = getByRole('switch');

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
  });

  it('updates checked state on change', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<StatefulSwitch>label</StatefulSwitch>);
    const input = getByRole('switch');

    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
  });

  it('updates checked state on change(keyboard)', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(<StatefulSwitch>label</StatefulSwitch>);
    const input = getByRole('switch');

    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
    await user.keyboard(' ');
    expect(input).not.toBeChecked();
    await user.keyboard('{Enter}');
    expect(input).toBeChecked();
  });
});
