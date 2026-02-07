/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */

import * as React from 'react';
import { render, fireEvent, getByText, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '..';
import '@testing-library/jest-dom';

/**
 * Setting up a typical implementation scenario for Checkbox
 */
const SwitchForm = () => {
  const [checkboxes, setCheckboxes] = React.useState([false, false]);

  return (
    <form>
      <Checkbox
        checked={checkboxes[0]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const isChecked = e.currentTarget.checked;
          setCheckboxes((prevCheckboxes) => {
            return prevCheckboxes.map((val, idx) => (idx === 0 ? isChecked : val));
          });
        }}
      >
        Label 1
      </Checkbox>

      <Checkbox
        checked={checkboxes[1]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const isChecked = e.currentTarget.checked;
          setCheckboxes((prevCheckboxes) => {
            return prevCheckboxes.map((val, idx) => (idx === 1 ? isChecked : val));
          });
        }}
      >
        Label 2
      </Checkbox>
    </form>
  );
};

describe('Stateless checkbox', function () {
  it('renders provided label', function () {
    const { container } = render(<Checkbox>label</Checkbox>);
    getByText(container, 'label');
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
      <Checkbox
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        label
      </Checkbox>
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

  it('only fires one click event', () => {
    const onAncestorClick = jest.fn();
    const { container } = render(
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
      <div onClick={onAncestorClick}>
        <Checkbox>label</Checkbox>
      </div>
    );
    const label = container.querySelector('label');
    if (label) {
      fireEvent.click(label.parentElement!);
    }
    expect(onAncestorClick).toHaveBeenCalledTimes(1);
  });

  it('test with a real stateless checkbox use case', async () => {
    const user = userEvent.setup();
    render(<SwitchForm />);
    const input = screen.getByLabelText('Label 1');

    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();

    const input2 = screen.getByLabelText('Label 2');

    expect(input2).not.toBeChecked();
    await user.click(input2);
    expect(input2).toBeChecked();
    await user.keyboard(' ');
    expect(input2).not.toBeChecked();
    await user.keyboard('{Enter}');
    expect(input2).toBeChecked();
  });
});
