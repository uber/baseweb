/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled, withStyle } from '../styles/index';
import { StyledBaseButton } from '../button';
import { hexToRgb as hexToRgba } from '../styles/util';

export const StyledBaseButtonTimed = withStyle<
  typeof StyledBaseButton,
  { $initialTime: number; $timeElapsed: number }
>(StyledBaseButton, ({ $theme, $initialTime, $timeElapsed }) => {
  const completionPercentage = ($timeElapsed / $initialTime) * 100;
  const timeLeft = $initialTime - $timeElapsed;
  return {
    position: 'relative',
    ...($initialTime > 0
      ? {
          ':after': {
            animationDuration: `${timeLeft}s`,
            animationName: {
              from: {
                transform: `translateX(${completionPercentage}%)`,
              },
              to: {
                transform: 'translateX(100%)',
              },
            },
            animationTimingFunction: 'linear',
            display: 'inline-block',
            content: '""',
            width: '100%',
            height: '100%',
            zIndex: '1',
            position: 'absolute',
            backgroundColor: hexToRgba($theme.colors.backgroundPrimary, '0.2'),
          },
        }
      : {}),
  };
});
StyledBaseButtonTimed.displayName = 'StyledBaseButtonTimed';

export const StyledTimerContainer = styled<'span', {}>('span', {
  // minWidth to ensure button width stays consistent as timeRemaining changes
  minWidth: '53px',
});
StyledTimerContainer.displayName = 'StyledTimerContainer';
