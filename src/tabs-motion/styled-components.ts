/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { styled } from '../styles';
import { ORIENTATION, FILL } from './constants';
import { isHorizontal, isVertical, isRTL, isIntrinsic, isFixed } from './utils';

import type { StyleObject } from 'styletron-standard';
import type { Orientation, Fill } from './types';

export const StyledRoot = styled<
  'div',
  {
    $orientation?: Orientation;
  }
>('div', ({ $theme, $orientation = ORIENTATION.horizontal }) => {
  const style: StyleObject = {
    // Creates a stacking context so we can use z-index on the TabHighlight
    // without affecting anything outside of this element.
    transform: 'scale(1)',
  };
  if (isVertical($orientation)) {
    style.display = 'flex';
  }
  return style;
});

export const StyledTabList = styled<
  'div',
  {
    $orientation?: Orientation;
    $fill?: Fill;
  }
>('div', ({ $theme, $fill = FILL.intrinsic, $orientation = ORIENTATION.horizontal }) => {
  const style: StyleObject = {
    position: 'relative',
    display: 'flex',
    flexWrap: 'nowrap',
  };
  if (isHorizontal($orientation)) {
    style.flexDirection = 'row';
    style.paddingBottom = '5px';
    style.marginBottom = '-5px';
  } else {
    style.flexDirection = 'column';
    if (isRTL($theme.direction)) {
      style.paddingLeft = '5px';
      style.marginLeft = '-5px';
    } else {
      style.paddingRight = '5px';
      style.marginRight = '-5px';
    }
  }
  if (isIntrinsic($fill)) {
    style['::-webkit-scrollbar'] = { display: 'none' };
    style['-ms-overflow-style'] = 'none';
    style.scrollbarWidth = 'none';
    if (isHorizontal($orientation)) {
      style.overflowX = 'scroll';
    } else {
      style.overflowY = 'scroll';
    }
  }
  return style;
});

export const StyledTab = styled<
  'button',
  {
    $orientation?: Orientation;
    $fill?: Fill;
    $focusVisible?: boolean;
    $isActive?: boolean;
  }
>(
  'button',
  ({
    $theme,
    $orientation = ORIENTATION.horizontal,
    $fill = FILL.intrinsic,
    $focusVisible = false,
    $isActive = false,
  }) => {
    const style: StyleObject = {
      cursor: 'pointer',
      WebkitAppearance: 'none',
      marginLeft: '0',
      marginRight: '0',
      marginTop: '0',
      marginBottom: '0',
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      paddingLeft: $theme.sizing.scale600,
      paddingTop: $theme.sizing.scale600,
      paddingRight: $theme.sizing.scale600,
      paddingBottom: $theme.sizing.scale600,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderLeftStyle: 'none',
      borderTopStyle: 'none',
      borderRightStyle: 'none',
      borderBottomStyle: 'none',
      color: $theme.colors.contentPrimary,
      background: $theme.colors.backgroundPrimary,
      transitionProperty: 'background',
      transitionDuration: $theme.animation.timing200,
      transitionTimingFunction: $theme.animation.linearCurve,
      outline: 'none',
      outlineOffset: '-3px',
      ':disabled': {
        cursor: 'not-allowed',
        color: $theme.colors.contentStateDisabled,
      },
      ':hover': {
        background: $theme.colors.backgroundSecondary,
      },
      ':disabled:hover': {
        background: 'none',
      },
      ...$theme.typography.LabelSmall,
    };
    if ($focusVisible) {
      style.outline = `3px solid ${$theme.colors.accent}`;
    }
    if (isFixed($fill)) {
      style.flexGrow = 1;
      style.flexBasis = 0;
    }
    if (isHorizontal($orientation)) {
      style.justifyContent = 'center';
    } else {
      style.justifyContent = 'flex-end';
    }
    return style;
  }
);

export const StyledArtworkContainer = styled<
  'div',
  {
    $orientation?: Orientation;
  }
>('div', ({ $theme, $orientation = ORIENTATION.horizontal }) => {
  const style: StyleObject = {
    display: 'flex',
  };
  if (isRTL($theme.direction)) {
    style.marginLeft = $theme.sizing.scale300;
  } else {
    style.marginRight = $theme.sizing.scale300;
  }
  return style;
});

export const StyledTabBorder = styled<
  'div',
  {
    $orientation?: Orientation;
  }
>('div', ({ $theme, $orientation = ORIENTATION.horizontal }) => {
  const style: StyleObject = {
    backgroundColor: $theme.colors.borderOpaque,
    position: 'relative',
  };
  if (isHorizontal($orientation)) {
    style.height = '5px';
  } else {
    style.width = '5px';
  }
  return style;
});

export const StyledTabHighlight = styled<
  'div',
  {
    $orientation?: Orientation;
    $length?: number;
    $distance?: number;
    $animate?: boolean;
  }
>(
  'div',
  ({
    $theme,
    $orientation = ORIENTATION.horizontal,
    $length = 0,
    $distance = 0,
    $animate = false,
  }) => {
    const style: StyleObject = {
      backgroundColor: $theme.colors.borderSelected,
      position: 'absolute',
      zIndex: 1,
    };
    if (isHorizontal($orientation)) {
      style.bottom = '0px';
      style.left = '0px';
      style.height = '5px';
      style.width = `${$length}px`;
      style.transform = `translateX(${$distance}px)`;
    } else {
      style.transform = `translateY(${$distance}px)`;
      style.width = '5px';
      style.height = `${$length}px`;
      if (isRTL($theme.direction)) {
        style.left = '0px';
      } else {
        style.right = '0px';
      }
    }
    if ($animate) {
      style.transitionProperty = 'all';
      style.transitionDuration = $theme.animation.timing400;
      style.transitionTimingFunction = $theme.animation.easeInOutQuinticCurve;
    }
    return style;
  }
);

export const StyledTabPanel = styled<
  'div',
  {
    $pad: boolean;
  }
>('div', ({ $theme, $pad = true }) => {
  const style: StyleObject = {
    flexGrow: 1, // only used in vertical orientation
    outline: 'none',
  };
  if ($pad) {
    style.paddingTop = $theme.sizing.scale600;
    style.paddingRight = $theme.sizing.scale600;
    style.paddingBottom = $theme.sizing.scale600;
    style.paddingLeft = $theme.sizing.scale600;
  }
  return style;
});
