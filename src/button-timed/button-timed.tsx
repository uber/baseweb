/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Button, SIZE, KIND, SHAPE } from '../button';
import type { ButtonTimedProps } from './types';
import { StyledBaseButtonTimed, StyledTimerContainer } from './styled-components';
import { formatTime } from './utils';
import { getOverrides, mergeOverrides } from '../helpers/overrides';

const ButtonTimed = (props: ButtonTimedProps) => {
  const {
    initialTime, // in seconds
    paused = false,
    onClick: onClickProp,
    disabled,
    children,
    overrides = {},
    ...restProps
  } = props;
  const [timeRemaining, setTimeRemaining] = React.useState<number>(initialTime * 1000);

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      if (timeRemaining > 0 && !paused) {
        setTimeRemaining((seconds) => seconds - 100);
      }
    }, 100);
    if (timeRemaining === 0) {
      onClickProp();
    }
    return () => clearTimeout(timerId);
  }, [timeRemaining, paused]);

  const onClick = () => {
    setTimeRemaining(0);
    onClickProp();
  };

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
          $timeElapsed: (initialTime * 1000 - timeRemaining) / 1000,
        },
        style: {
          ':after': {
            animationPlayState: paused ? 'paused' : 'running',
          },
        },
      },
    },
    {
      Root: buttonOverrides.Root || {},
      BaseButton: buttonOverrides.BaseButton,
      StartEnhancer: buttonOverrides.StartEnhancer || {},
      EndEnhancer: buttonOverrides.EndEnhancer || {},
      LoadingSpinnerContainer: buttonOverrides.LoadingSpinnerContainer || {},
      LoadingSpinner: buttonOverrides.LoadingSpinner || {},
    }
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
