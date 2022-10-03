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
import { usePaused } from './use-paused';
import { formatTime } from './utils';
import { getOverrides, mergeOverrides } from '../helpers/overrides';

const ButtonTimed = ({
  initialTime,
  timeRemaining,
  onClick,
  disabled,
  children,
  overrides = {},
  ...restProps
}: ButtonTimedProps) => {
  const paused = usePaused(timeRemaining);

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
