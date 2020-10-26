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
    display: 'inline-block',
    marginBottom: 0,
    marginTop: 0,
    paddingTop: $theme.sizing.scale300,
    paddingRight: $theme.sizing.scale100,
    paddingLeft: $theme.sizing.scale100,
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

export const StyledIconContainer = styled<StylePropsT>(
  'div',
  ({$theme, $isActive, $isCompleted, $disabled}) => {
    let currentColor = $theme.colors.backgroundPrimary;
    let size = $theme.sizing.scale500;
    let marginLeft = '26px';
    let marginRight = '26px';
    let font = $theme.typography.LabelMedium;
    let titlePad = $theme.sizing.scale800;

    if ($isActive) {
      size = $theme.sizing.scale700;
      marginLeft = $theme.sizing.scale750;
      marginRight = $theme.sizing.scale750;
    }

    const marginTop = `calc(${titlePad} + (${font.lineHeight} - ${size}) / 2)`;
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
      backgroundColor: currentColor,
      float: $theme.direction === 'rtl' ? 'right' : 'left',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  },
);

export const StyledIcon = styled<StylePropsT>(
  'div',
  ({$theme, $isActive, $isCompleted, $disabled}) => {
    let currentColor = $theme.colors.mono400;
    let size = $theme.sizing.scale300;

    if ($isCompleted) {
      currentColor = $theme.colors.primary;
    } else if ($isActive) {
      currentColor = $theme.colors.progressStepsActiveFill;
    }

    if ($isActive) {
      size = $theme.sizing.scale600;
    }

    return {
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
    width: $theme.sizing.scale300,
    height: $theme.sizing.scale300,
    lineHeight: $theme.sizing.scale300,
    borderTopLeftRadius: $theme.sizing.scale300,
    borderTopRightRadius: $theme.sizing.scale300,
    borderBottomRightRadius: $theme.sizing.scale300,
    borderBottomLeftRadius: $theme.sizing.scale300,
    backgroundColor: $theme.colors.progressStepsActiveText,
    textAlign: 'center',
  };
});

export const StyledContent = styled<StylePropsT>('div', ({$theme}) => {
  const marginDir: string =
    $theme.direction === 'rtl' ? 'marginRight' : 'marginLeft';
  return {
    [marginDir]: $theme.sizing.scale1600,
  };
});

export const StyledContentTitle = styled<StylePropsT>(
  'div',
  ({$theme, $isActive, $isCompleted}) => {
    let color = $theme.colors.primary400;
    if ($isCompleted) {
      color = $theme.colors.contentSecondary;
    } else if ($isActive) {
      color = $theme.colors.contentPrimary;
    }
    let font = $theme.typography.LabelMedium;

    return {
      ...font,
      color,
      paddingTop: $theme.sizing.scale800,
      paddingBottom: $theme.sizing.scale800,
    };
  },
);

export const StyledContentTail = styled<StylePropsT>(
  'div',
  ({$theme, $isCompleted, $isActive}) => {
    let currentColor = $theme.colors.mono400;
    let size = $theme.sizing.scale500;
    let font = $theme.typography.LabelMedium;
    let titlePad = $theme.sizing.scale800;

    if ($isActive) {
      size = $theme.sizing.scale700;
    }

    if ($isCompleted) {
      currentColor = $theme.colors.primary;
    }

    const dir: string = $theme.direction === 'rtl' ? 'right' : 'left';

    return {
      position: 'absolute',
      [dir]: '31px',
      top: 0,
      height: `calc(100% + ${$theme.sizing.scale500})`,
      marginBottom: 0,
      width: $theme.sizing.scale0,
      marginTop: `calc(${titlePad} + (${font.lineHeight} + ${size}) / 2)`,
      display: 'inline-block',
      backgroundColor: currentColor,
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
    let color = $theme.colors.contentStateDisabled;
    let size = $theme.sizing.scale950;
    let font = $theme.typography.ParagraphMedium;
    let marginLeft = $theme.sizing.scale550;
    let marginRight = $theme.sizing.scale550;
    let titlePad = $theme.sizing.scale800;
    let titleFont = $theme.typography.LabelMedium;

    if ($isCompleted) {
      color = $theme.colors.progressStepsCompletedText;
      backgroundColor = $theme.colors.progressStepsCompletedFill;
    } else if ($isActive) {
      color = $theme.colors.progressStepsActiveText;
      backgroundColor = $theme.colors.progressStepsActiveFill;
    }

    const marginTop = `calc(${titlePad} + (${titleFont.lineHeight} - ${size}) / 2)`;

    return {
      marginLeft,
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
    let size = $theme.sizing.scale950;
    let titleFont = $theme.typography.LabelMedium;
    let titlePad = $theme.sizing.scale800;

    if ($isCompleted) {
      currentColor = $theme.colors.primary;
    }
    const marginTop = `calc(${titlePad} + ${size} + (${titleFont.lineHeight} - ${size}) / 2)`;
    const dir: string = $theme.direction === 'rtl' ? 'right' : 'left';
    return {
      position: 'absolute',
      [dir]: '31px',
      top: 0,
      height: `calc(100% - ${$theme.sizing.scale500})`,
      paddingBottom: 0,
      marginTop,
      width: $theme.sizing.scale0,
      backgroundColor: currentColor,
      display: 'inline-block',
    };
  },
);
