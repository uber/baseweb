/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { render, getByTestId, act } from '@testing-library/react';

import { ButtonTimed } from '..';

describe('ButtonTimed Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
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
    act(() => {
      jest.advanceTimersByTime(1300);
    });
    expect(getByTestId(container, 'timer-container').textContent).toBe('(0:02)');
  });

  test('onClick called when time runs out', async () => {
    const onClick = jest.fn();
    render(<ButtonTimed initialTime={1} onClick={onClick} />);
    act(() => {
      jest.advanceTimersByTime(1300);
    });
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
