/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {styled} from '../styles/index';
import type {
  StyledProgressStepsPropsT,
  StyledStepPropsT,
  StyledNumberIconPropsT,
  StyledNumberContentTailPropsT,
  StyledNumberStepPropsT,
} from './types';

export const StyledProgressSteps = styled(
  'div',
  ({$theme}: StyledProgressStepsPropsT) => {
    return {
      paddingTop: $theme.sizing.scale300,
      paddingBottom: $theme.sizing.scale300,
    };
  },
);
StyledProgressSteps.displayName = 'StyledProgressSteps';

export const StyledStep = styled('div', ({$theme}: StyledStepPropsT) => {
  return {
    position: 'relative',
    overflow: 'visible',
  };
});
StyledStep.displayName = 'StyledStep';

export const StyledIcon = styled(
  'div',
  ({$theme, $isActive, $isCompleted, $disabled}: StyledStepPropsT) => {
    let currentColor = $theme.colors.mono400;
    let size = $theme.sizing.scale300;
    let marginRight = $theme.sizing.scale500;
    let marginLeft = $theme.sizing.scale100;
    let font = $theme.typography.font400;

    if ($isCompleted) {
      currentColor = $theme.colors.primary400;
    } else if ($isActive) {
      font = $theme.typography.font450;
      currentColor = $theme.colors.primary100;
    }

    if ($isActive) {
      size = $theme.sizing.scale600;
      marginLeft = 0;
      marginRight = $theme.sizing.scale300;
    }

    const marginTop = `calc((${font.lineHeight} - ${size}) / 2)`;

    return {
      marginRight,
      marginLeft,
      marginTop,
      width: size,
      height: size,
      lineHeight: size,
      borderRadius: size,
      backgroundColor: currentColor,
      float: 'left',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  },
);
StyledIcon.displayName = 'StyledIcon';

export const StyledInnerIcon = styled('div', ({$theme}: StyledStepPropsT) => {
  return {
    width: $theme.sizing.scale100,
    height: $theme.sizing.scale100,
    lineHeight: $theme.sizing.scale100,
    borderRadius: $theme.sizing.scale100,
    backgroundColor: $theme.colors.primary400,
    textAlign: 'center',
  };
});
StyledInnerIcon.displayName = 'StyledInnerIcon';

export const StyledContent = styled('div', ({$theme}: StyledStepPropsT) => {
  return {
    overflow: 'hidden',
  };
});
StyledContent.displayName = 'StyledContent';

export const StyledContentTitle = styled(
  'div',
  ({$theme, $isActive}: StyledStepPropsT) => {
    let color = $theme.colors.foregroundAlt;
    let font = $theme.typography.font400;

    if ($isActive) {
      color = $theme.colors.foreground;
      font = $theme.typography.font450;
    }

    return {
      ...font,
      color,
    };
  },
);
StyledContentTitle.displayName = 'StyledContentTitle';

export const StyledContentTail = styled(
  'div',
  ({$theme, $isCompleted}: StyledStepPropsT) => {
    let currentColor = $theme.colors.mono400;

    if ($isCompleted) {
      currentColor = $theme.colors.primary400;
    }

    return {
      position: 'absolute',
      left: '7px',
      top: 0,
      height: '100%',
      zIndex: -1,
      paddingBottom: '0px',
      width: $theme.sizing.scale0,
      paddingTop: $theme.sizing.scale600,
      ':after': {
        content: '""',
        display: 'inline-block',
        height: '100%',
        width: '100%',
        backgroundColor: currentColor,
      },
    };
  },
);
StyledContentTail.displayName = 'StyledContentTail';

export const StyledContentDescription = styled(
  'div',
  ({$theme}: StyledStepPropsT) => {
    return {
      marginBottom: $theme.sizing.scale700,
    };
  },
);
StyledContentDescription.displayName = 'StyledContentDescription';

export const StyledNumberStep = styled(
  'div',
  ({$theme}: StyledNumberStepPropsT) => {
    return {
      position: 'relative',
      overflow: 'visible',
    };
  },
);
StyledNumberStep.displayName = 'StyledNumberStep';

export const StyledNumberIcon = styled(
  'div',
  ({$theme, $isActive, $isCompleted, $disabled}: StyledNumberIconPropsT) => {
    let backgroundColor = $theme.colors.mono400;
    let color = $theme.colors.primary400;
    let size = $theme.sizing.scale800;
    let marginRight = $theme.sizing.scale300;
    let font = $theme.typography.font350;
    let titleFont = $theme.typography.font400;

    if ($isCompleted) {
      backgroundColor = $theme.colors.primary400;
      color = $theme.colors.mono100;
    } else if ($isActive) {
      titleFont = $theme.typography.font450;
      backgroundColor = $theme.colors.primary100;
    }

    const marginTop = `calc((${titleFont.lineHeight} - ${size}) / 2)`;

    return {
      marginRight,
      marginTop,
      width: size,
      height: size,
      borderRadius: size,
      backgroundColor,
      color,
      float: 'left',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...font,
    };
  },
);
StyledNumberIcon.displayName = 'StyledNumberIcon';

export const StyledNumberContentTail = styled(
  'div',
  ({
    $theme,
    $isActive,
    $isCompleted,
    $disabled,
  }: StyledNumberContentTailPropsT) => {
    let currentColor = $theme.colors.mono400;

    if ($isCompleted) {
      currentColor = $theme.colors.primary400;
    }

    return {
      position: 'absolute',
      left: '11px',
      top: 0,
      height: '100%',
      zIndex: -1,
      paddingBottom: '0px',
      width: $theme.sizing.scale0,
      paddingTop: $theme.sizing.scale600,
      ':after': {
        content: '""',
        display: 'inline-block',
        height: '100%',
        width: '100%',
        backgroundColor: currentColor,
      },
    };
  },
);
StyledNumberContentTail.displayName = 'StyledNumberContentTail';
