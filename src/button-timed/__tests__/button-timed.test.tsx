/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { render, getByTestId, act } from '@testing-library/react';

import { ButtonTimed } from '..';

describe('ButtonTimed Component', () => {
  test('onClick called when time runs out', async () => {
    const onClick = jest.fn();
    render(<ButtonTimed initialTime={1} onClick={onClick} />);
    await act(async () => {
      await new Promise((r) => setTimeout(r, 2000));
    });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('timeRemaining pauses correctly', async () => {
    const onClick = jest.fn();
    const { container, rerender } = render(
      <ButtonTimed
        initialTime={3}
        paused={true}
        onClick={onClick}
        overrides={{
          TimerContainer: { props: { 'data-testid': 'timer-container' } },
        }}
      >
        content
      </ButtonTimed>
    );
    expect(getByTestId(container, 'timer-container').textContent).toBe('(0:03)');

    rerender(
      <ButtonTimed
        initialTime={3}
        paused={false}
        onClick={onClick}
        overrides={{
          TimerContainer: { props: { 'data-testid': 'timer-container' } },
        }}
      >
        content
      </ButtonTimed>
    );
    await act(async () => {
      await new Promise((r) => setTimeout(r, 1300));
    });
    expect(getByTestId(container, 'timer-container').textContent).toBe('(0:02)');
  });
});
