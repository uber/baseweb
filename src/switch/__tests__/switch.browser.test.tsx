
/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Switch } from '../';

/**
 * Setting up a typical implementation scenario for Switch
 */
const SwitchForm = () => {
  const [switches, setSwitches] = React.useState([false, false]);

  return (
    <form>
      <Switch
        checked={switches[0]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const isChecked = e.currentTarget.checked;
          setSwitches((prevSwitches) => {
            return prevSwitches.map((val, idx) => (idx === 0 ? isChecked : val));
          });
        }}
      >
        Label 1
      </Switch>

      <Switch
        checked={switches[1]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const isChecked = e.currentTarget.checked;
          setSwitches((prevSwitches) => {
            return prevSwitches.map((val, idx) => (idx === 1 ? isChecked : val));
          });
        }}
      >
        Label 2
      </Switch>
    </form>
  );
};

describe('Switch', function () {
  it('updates checked state on click', async () => {
    const user = userEvent.setup();
    render(<SwitchForm />);
    const input = screen.getByLabelText('Label 1');

    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
  });

  it('updates checked state on change(keyboard)', async () => {
    const user = userEvent.setup();
    render(<SwitchForm />);
    const input = screen.getByLabelText('Label 2');

    expect(input).not.toBeChecked();
    await user.click(input);
    expect(input).toBeChecked();
    await user.keyboard(' ');
    expect(input).not.toBeChecked();
    await user.keyboard('{Enter}');
    expect(input).toBeChecked();
  });
});
