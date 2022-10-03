/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Button, SIZE, KIND, SHAPE } from '../button';
import type { ButtonTimedProps } from './types';
import {
  BaseButtonTimed as StyledBaseButtonTimed,
  TimerContainer as StyledTimerContainer,
} from './styled-components';
import { getOverrides, mergeOverrides } from '../helpers/overrides';

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${padTo2Digits(seconds)}`;
};
function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
function useInterval(callback, delay) {
  const intervalRef = React.useRef(null);
  const savedCallback = React.useRef(callback);
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  React.useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current);
    }
  }, [delay]);
  return intervalRef;
}

const ButtonTimed = ({
  initialTime,
  timeRemaining,
  onClick,
  disabled,
  children,
  overrides = {},
  ...restProps
}: ButtonTimedProps) => {
  const [paused, setPaused] = React.useState<boolean>(false);
  const prevTimeRemaining = usePrevious(timeRemaining);

  useInterval(() => {
    if (!paused && timeRemaining === prevTimeRemaining) {
      setPaused(true);
    }
  }, 1000);

  if (paused && timeRemaining !== prevTimeRemaining) {
    setPaused(false);
  }

  const { TimerContainer: TimerContainerOverride, ...buttonOverrides } = overrides;
  const [TimerContainer, timerContainerProps] = getOverrides(
    TimerContainerOverride,
    StyledTimerContainer
  );

  const buttonMergedOverrides = mergeOverrides(
    {
      BaseButton: {
        component: StyledBaseButtonTimed,
        props: {
          $initialTime: initialTime,
          $timeElapsed: initialTime - timeRemaining,
        },
        style: {
          ':after': {
            animationPlayState: paused ? 'paused' : 'running',
          },
        },
      },
    },
    buttonOverrides
  );

  return (
    <Button
      {...restProps}
      overrides={buttonMergedOverrides}
      onClick={onClick}
      size={SIZE.large}
      kind={KIND.primary}
      shape={SHAPE.default}
      disabled={disabled || timeRemaining === 0}
    >
      {children}
      <TimerContainer {...timerContainerProps}>{`(${formatTime(timeRemaining)})`}</TimerContainer>
    </Button>
  );
};

export default ButtonTimed;
