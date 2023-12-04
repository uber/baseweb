/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { styled } from '../styles';
import { FILL } from './constants';
import { isIntrinsic, isFixed } from './utils';

import type { StyleObject } from 'styletron-standard';
import type { Fill } from './types';

export const StyledRoot = styled<
  'div',
  {
    $fill?: Fill;
    $height?: string;
    $width?: string;
  }
>('div', ({ $theme, $fill = FILL.intrinsic, $height = 'fit-content', $width = 'fit-content' }) => {
  const style: StyleObject = {
    backgroundColor: $theme.colors.backgroundSecondary,
    borderRadius: $theme.sizing.scale500,
    boxSizing: 'border-box',
    isolation: 'isolate',
    padding: $theme.sizing.scale100,
    position: 'relative',
    overflow: 'hidden',
    height: $height,
    width: $width,
  };
  if (isIntrinsic($fill)) {
    style['::-webkit-scrollbar'] = { display: 'none' };
    style['-ms-overflow-style'] = 'none';
    style.scrollbarWidth = 'none';
  }
  return style;
});

StyledRoot.displayName = 'StyledRoot';

export const StyledSegmentList = styled<'div', {}>('div', ({ $theme }) => {
  const style: StyleObject = {
    backgroundColor: $theme.colors.backgroundSecondary,
    boxSizing: 'border-box',
    display: 'flex',
    height: '100%',
    justifyContent: 'space-evenly',
    position: 'relative',
    width: '100%',
    zIndex: -2,
    flexDirection: 'row',
    overflow: 'hidden',
    minHeight: '40px',
  };
  return style;
});

StyledSegmentList.displayName = 'StyledSegmentList';

export const StyledSegment = styled<
  'button',
  {
    $fill?: Fill;
    $focusVisible?: boolean;
    $isActive?: boolean;
  }
>(
  'button',
  ({
    $theme,
    $fill = FILL.intrinsic,
    $focusVisible = false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    $isActive = false,
  }) => {
    const style: StyleObject = {
      cursor: 'pointer',
      position: 'relative',
      WebkitAppearance: 'none',
      marginLeft: '0',
      marginRight: '0',
      marginTop: '0',
      marginBottom: '0',
      boxSizing: 'border-box',
      display: 'grid',
      alignItems: 'center',
      paddingInline: $theme.sizing.scale500,
      paddingBlock: $theme.sizing.scale300,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderRadius: $theme.sizing.scale300,
      color: $isActive ? $theme.colors.contentPrimary : $theme.colors.contentTertiary,
      backgroundColor: 'transparent',
      flexGrow: 1,
      transitionProperty: 'box-shadow, color',
      transitionDuration: $theme.animation.timing200,
      transitionTimingFunction: $theme.animation.linearCurve,
      outline: 'none',
      outlineOffset: '-3px',
      justifyContent: 'center',
      overflow: 'hidden',
      ':hover': {
        boxShadow: $isActive ? 'none' : $theme.lighting.overlay100,
      },
      ':disabled': {
        cursor: 'not-allowed',
        color: $theme.colors.contentStateDisabled,
        ':hover': {
          boxShadow: 'none',
        },
      },
      ':disabled:hover': {
        background: 'none',
      },
    };
    if ($focusVisible) {
      style.outline = `3px solid ${$theme.colors.accent}`;
    }
    if (isFixed($fill)) {
      style.flexGrow = 1;
      style.flexBasis = 0;
    }
    return style;
  }
);

StyledSegment.displayName = 'StyledSegment';

export const StyledArtworkContainer = styled<'div', {}>('div', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const style: StyleObject = {
    display: 'flex',
    height: '14px',
    width: '14px',
    alignItems: 'center',
  };
  return style;
});

StyledArtworkContainer.displayName = 'StyledArtworkContainer';

export const StyledActive = styled<
  'div',
  {
    $length?: number;
    $distance?: number;
    $animate?: boolean;
  }
>('div', ({ $theme, $length = 0, $distance = 0, $animate = false }) => {
  const style: StyleObject = {
    position: 'absolute',
    borderRadius: $theme.sizing.scale300,
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
    border: `${$theme.sizing.scale0} solid ${$theme.colors.primary}`,
    backgroundColor: $theme.colors.backgroundPrimary,
    zIndex: -1,
  };
  style.bottom = '0px';
  style.left = '0px';
  style.width = `${$length}px`;
  style.transform = `translateX(${$distance}px)`;
  if ($animate) {
    style.transitionProperty = 'all';
    style.transitionDuration = $theme.animation.timing400;
    style.transitionTimingFunction = $theme.animation.easeInOutQuinticCurve;
  }
  return style;
});

StyledActive.displayName = 'StyledActive';

export const StyledSegmentPanel = styled<
  'div',
  {
    $pad: boolean;
  }
>('div', ({ $theme, $pad = true }) => {
  const style: StyleObject = {
    flexGrow: 1,
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
StyledSegmentPanel.displayName = 'StyledSegmentPanel';

export const StyledLabel = styled<'div', { $hasArtwork: boolean }>('div', ({ $theme }) => {
  const style: StyleObject = {
    ...$theme.typography.LabelSmall,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    position: 'relative',
  };
  return style;
});

export const StyledDescription = styled<'div', {}>('div', ({ $theme }) => ({
  ...$theme.typography.ParagraphXSmall,
  padding: 0,
  margin: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  position: 'relative',
}));

export const StyledLabelBlock = styled<'div', {}>('div', ({ $theme }) => ({
  display: 'flex',
  gridGap: $theme.sizing.scale100,
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  overflow: 'hidden',
}));

export const StyledBadge = styled<'div', {}>('div', ({ $theme }) => ({
  ...$theme.typography.ParagraphXSmall,
  width: '16px',
  height: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  backgroundColor: $theme.colors.accent,
  color: $theme.colors.white,
}));

export const StyledBadgeHint = styled<'div', {}>('div', ({ $theme }) => ({
  width: '8px',
  height: '8px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  backgroundColor: $theme.colors.accent,
  color: $theme.colors.accent,
  alignSelf: 'start',
  marginLeft: '-2px',
}));
