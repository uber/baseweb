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
import { getOverrides } from '../helpers/overrides';

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}
const formatTime = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${padTo2Digits(seconds)}`;
};

const ButtonTimed = ({
  initialTime,
  timeRemaining,
  onClick,
  disabled,
  children,
  overrides = {},
  ...restProps
}: ButtonTimedProps) => {
  const {
    BaseButtonTimed: BaseButtonTimedOverride,
    TimerContainer: TimerContainerOverride,
    ...buttonOverrides
  } = overrides;

  const [BaseButtonTimed, baseButtonTimedProps] = getOverrides(
    BaseButtonTimedOverride,
    StyledBaseButtonTimed
  );
  const [TimerContainer, timerContainerProps] = getOverrides(
    TimerContainerOverride,
    StyledTimerContainer
  );

  return (
    <Button
      {...restProps}
      overrides={{
        BaseButton: {
          component: BaseButtonTimed,
          props: {
            $initialTime: initialTime,
            $timeElapsed: initialTime - timeRemaining,
            ...baseButtonTimedProps,
          },
        },
        ...buttonOverrides,
      }}
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
