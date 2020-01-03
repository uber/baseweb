/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {styled} from '../styles/index.js';
import type {StylePropsT} from './types.js';

export const StyledProgressSteps = styled<{}>('ol', ({$theme}) => {
  return {
    backgroundColor: $theme.colors.listHeaderFill,
    display: 'inline-block',
    marginBottom: 0,
    marginTop: 0,
    paddingTop: $theme.sizing.scale300,
    paddingRight: $theme.sizing.scale500,
    paddingLeft: $theme.sizing.scale500,
    paddingBottom: $theme.sizing.scale300,
  };
});

export const StyledStep = styled<StylePropsT>('li', ({$theme}) => {
  return {
    listStyleType: 'none',
    position: 'relative',
    overflow: 'visible',
  };
});

export const StyledIcon = styled<StylePropsT>(
  'div',
  ({$theme, $isActive, $isCompleted, $disabled}) => {
    let currentColor = $theme.colors.mono400;
    let size = $theme.sizing.scale300;
    let marginRight = $theme.sizing.scale500;
    let marginLeft = $theme.sizing.scale100;
    let font = $theme.typography.font300;

    if ($isCompleted) {
      currentColor = $theme.colors.primary;
    } else if ($isActive) {
      font = $theme.typography.font350;
      currentColor = $theme.colors.progressStepsActiveFill;
    }

    if ($isActive) {
      size = $theme.sizing.scale600;
      marginLeft = 0;
      marginRight = $theme.sizing.scale300;
    }

    const marginTop = `calc((${font.lineHeight} - ${size}) / 2)`;

    if ($theme.direction === 'rtl') {
      [marginLeft, marginRight] = [marginRight, marginLeft];
    }

    return {
      marginRight,
      marginLeft,
      marginTop,
      width: size,
      height: size,
      lineHeight: size,
      borderTopLeftRadius: size,
      borderTopRightRadius: size,
      borderBottomRightRadius: size,
      borderBottomLeftRadius: size,
      backgroundColor: currentColor,
      float: $theme.direction === 'rtl' ? 'right' : 'left',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  },
);

export const StyledInnerIcon = styled<StylePropsT>('div', ({$theme}) => {
  return {
    width: $theme.sizing.scale100,
    height: $theme.sizing.scale100,
    lineHeight: $theme.sizing.scale100,
    borderTopLeftRadius: $theme.sizing.scale100,
    borderTopRightRadius: $theme.sizing.scale100,
    borderBottomRightRadius: $theme.sizing.scale100,
    borderBottomLeftRadius: $theme.sizing.scale100,
    backgroundColor: $theme.colors.progressStepsActiveText,
    textAlign: 'center',
  };
});

export const StyledContent = styled<StylePropsT>('div', ({$theme}) => {
  return {
    [$theme.direction === 'rtl' ? 'marginRight' : 'marginLeft']: $theme.sizing
      .scale900,
  };
});

export const StyledContentTitle = styled<StylePropsT>(
  'div',
  ({$theme, $isActive}) => {
    let color = $theme.colors.contentSecondary;
    let font = $theme.typography.font300;

    if ($isActive) {
      color = $theme.colors.contentPrimary;
      font = $theme.typography.font350;
    }

    return {
      ...font,
      color,
    };
  },
);

export const StyledContentTail = styled<StylePropsT>(
  'div',
  ({$theme, $isCompleted, $isActive}) => {
    let currentColor = $theme.colors.mono400;

    if ($isCompleted) {
      currentColor = $theme.colors.primary;
    }

    return {
      position: 'absolute',
      [$theme.direction === 'rtl' ? 'right' : 'left']: '7px',
      top: 0,
      height: '100%',
      paddingBottom: 0,
      width: $theme.sizing.scale0,
      paddingTop: $isActive ? $theme.sizing.scale700 : $theme.sizing.scale600,
      ':after': {
        content: '""',
        display: 'inline-block',
        height: `calc(100% + ${$theme.sizing.scale500})`,
        width: '100%',
        backgroundColor: currentColor,
      },
    };
  },
);

export const StyledContentDescription = styled<StylePropsT>(
  'div',
  ({$theme}) => {
    return {
      marginBottom: $theme.sizing.scale700,
    };
  },
);

export const StyledNumberStep = styled<StylePropsT>('li', ({$theme}) => {
  return {
    listStyleType: 'none',
    position: 'relative',
    overflow: 'visible',
  };
});

export const StyledNumberIcon = styled<StylePropsT>(
  'div',
  ({$theme, $isActive, $isCompleted, $disabled}) => {
    let backgroundColor = $theme.colors.mono400;
    let color = $theme.colors.contentSecondary;
    let size = $theme.sizing.scale800;
    let marginRight = $theme.sizing.scale300;
    let font = $theme.typography.font250;
    let titleFont = $theme.typography.font300;

    if ($isCompleted) {
      color = $theme.colors.progressStepsCompletedText;
      backgroundColor = $theme.colors.progressStepsCompletedFill;
    } else if ($isActive) {
      titleFont = $theme.typography.font350;
      color = $theme.colors.progressStepsActiveText;
      backgroundColor = $theme.colors.progressStepsActiveFill;
    }

    const marginTop = `calc((${titleFont.lineHeight} - ${size}) / 2)`;

    return {
      marginRight,
      marginTop,
      width: size,
      height: size,
      borderTopLeftRadius: size,
      borderTopRightRadius: size,
      borderBottomRightRadius: size,
      borderBottomLeftRadius: size,
      backgroundColor,
      color,
      float: $theme.direction === 'rtl' ? 'right' : 'left',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...font,
    };
  },
);

export const StyledNumberContentTail = styled<StylePropsT>(
  'div',
  ({$theme, $isActive, $isCompleted, $disabled}) => {
    let currentColor = $theme.colors.mono300;

    if ($isCompleted) {
      currentColor = $theme.colors.primary;
    }

    return {
      position: 'absolute',
      left: '11px',
      top: 0,
      height: '100%',
      paddingBottom: 0,
      width: $theme.sizing.scale0,
      paddingTop: $theme.sizing.scale800,
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
