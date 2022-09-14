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

const ButtonTimed = (props: ButtonTimedProps) => {
  const { time, onClick: onClickProp, disabled, children, overrides = {}, ...restProps } = props;
  const {
    BaseButtonTimed: BaseButtonTimedOverride,
    TimerContainer: TimerContainerOverride,
    ...buttonOverrides
  } = overrides;

  const [secondsRemaining, setSecondsRemaining] = React.useState<number>(time);

  React.useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      if (secondsRemaining > 0) {
        setSecondsRemaining((seconds) => seconds - 1);
      }
    }, 1000);
    if (secondsRemaining === 0) {
      onClickProp();
    }
    return () => clearInterval(interval);
  }, [secondsRemaining]);

  const [BaseButtonTimed, baseButtonTimedProps] = getOverrides(
    BaseButtonTimedOverride,
    StyledBaseButtonTimed
  );
  const [TimerContainer, timerContainerProps] = getOverrides(
    TimerContainerOverride,
    StyledTimerContainer
  );

  const onClick = () => {
    setSecondsRemaining(0);
  };

  return (
    <Button
      {...restProps}
      overrides={
        secondsRemaining > 0
          ? {
              BaseButton: {
                component: BaseButtonTimed,
                props: {
                  $duration: time,
                  ...baseButtonTimedProps,
                },
              },
              ...buttonOverrides,
            }
          : {}
      }
      onClick={onClick}
      size={SIZE.large}
      kind={KIND.primary}
      shape={SHAPE.default}
      disabled={disabled || secondsRemaining === 0}
    >
      {children}
      <TimerContainer {...timerContainerProps}>{`(${formatTime(
        secondsRemaining
      )})`}</TimerContainer>
    </Button>
  );
};

export default ButtonTimed;
