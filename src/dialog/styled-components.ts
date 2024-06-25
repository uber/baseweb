/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import { SIZE, PLACEMENT } from './constants';
import type { Size, Placement } from './types';

const getPlacementStyles = (placement: Placement, gutter: string) => {
  const defaultStyles = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };

  switch (placement) {
    case PLACEMENT.topLeft:
      return { ...defaultStyles, top: gutter, left: gutter };
    case PLACEMENT.topCenter:
      return { ...defaultStyles, top: gutter, left: '50%', transform: 'translateX(-50%)' };
    case PLACEMENT.topRight:
      return { ...defaultStyles, top: gutter, right: gutter };
    case PLACEMENT.bottomLeft:
      return { ...defaultStyles, bottom: gutter, left: gutter };
    case PLACEMENT.bottomCenter:
      return { ...defaultStyles, bottom: gutter, left: '50%', transform: 'translateX(-50%)' };
    case PLACEMENT.bottomRight:
      return { ...defaultStyles, bottom: gutter, right: gutter };
    case PLACEMENT.center:
      return { ...defaultStyles, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    default:
      return defaultStyles;
  }
};

const getAnimationStyles = (placement: Placement) => {
  const transformValuesByPlacement = {
    [PLACEMENT.topLeft]: ['translateY(16px)', 'translateY(0px)'],
    [PLACEMENT.topCenter]: [
      'translateX(-50%) translateY(16px)',
      'translateX(-50%) translateY(0px)',
    ],
    [PLACEMENT.topRight]: ['translateY(16px)', 'translateY(0px)'],
    [PLACEMENT.bottomLeft]: ['translateY(16px)', 'translateY(0px)'],
    [PLACEMENT.bottomCenter]: [
      'translateX(-50%) translateY(16px)',
      'translateX(-50%) translateY(0px)',
    ],
    [PLACEMENT.bottomRight]: ['translateY(16px)', 'translateY(0px)'],
    [PLACEMENT.center]: [
      'translateX(-50%) translateY(calc(-50% + 16px))',
      'translateX(-50%) translateY(-50%)',
    ],
  };

  return {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
    animationName: {
      from: {
        opacity: 0,
        transform: transformValuesByPlacement[placement][0],
      },
      to: {
        opacity: 1,
        transform: transformValuesByPlacement[placement][1],
      },
    },
  };
};

const DIALOG_WIDTHS = {
  [SIZE.xSmall]: '480px',
  [SIZE.small]: '640px',
  [SIZE.medium]: '800px',
  [SIZE.large]: '100%',
};
export const StyledRoot = styled<'div', { $size: Size; $placement: Placement }>(
  'div',
  ({ $theme, $size, $placement = PLACEMENT.center }) => {
    const narrowViewportGutter = '16px';
    const wideViewportGutter = '40px';

    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'fixed',
      maxHeight: `calc(100vh - (2 * ${wideViewportGutter}))`,
      maxWidth: `calc(100% - (2 * ${wideViewportGutter}))`,
      borderRadius: $theme.borders.radius500,
      boxShadow: $theme.lighting.shallowBelow,
      backgroundColor: $theme.colors.backgroundPrimary,
      color: $theme.colors.contentPrimary,
      overflow: 'hidden',
      border: 'none',
      width: DIALOG_WIDTHS[$size],
      ...getPlacementStyles($placement, wideViewportGutter),
      ...getAnimationStyles($placement),
      '@media (max-width: 599px)': {
        width: `calc(100% - (2 * ${narrowViewportGutter}))`,
        maxWidth: 'none',
        ...getPlacementStyles(PLACEMENT.bottomCenter, narrowViewportGutter),
        ...getAnimationStyles(PLACEMENT.bottomCenter),
      },
    };
  }
);
StyledRoot.displayName = 'StyledRoot';

export const StyledOverlay = styled('div', ({ $theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: $theme.colors.backgroundOverlay,
  animationDuration: '100ms',
  animationName: {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
}));
StyledOverlay.displayName = 'StyledOverlay';

export const StyledScrollContainer = styled<'div', {}>('div', () => {
  return {
    flex: 1,
    overflowY: 'auto',
    position: 'relative',
    width: '100%',
  };
});

function getLineWrapStyle(numHeadingLines) {
  if (numHeadingLines === 1) {
    return {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    };
  }
  return {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: `${numHeadingLines}`,
    WebkitBoxOrient: 'vertical',
  };
}

export const StyledHeading = styled<'div', { $numHeadingLines: number }>(
  'div',
  // @ts-ignore-next-line - TODO: StyledObject does not support whiteSpace property?
  ({ $theme, $numHeadingLines = 2 }) => {
    return {
      position: 'sticky',
      top: 0,
      paddingTop: $theme.sizing.scale800,
      paddingLeft: $theme.sizing.scale800,
      paddingRight: $theme.sizing.scale800,
      '@media (max-width: 599px)': {
        paddingLeft: $theme.sizing.scale600,
        paddingRight: $theme.sizing.scale600,
      },
      backgroundColor: $theme.colors.backgroundPrimary,
      ...getLineWrapStyle($numHeadingLines),
      ...$theme.typography.HeadingMedium,
    };
  }
);
StyledHeading.displayName = 'StyledHeading';

export const StyledBody = styled<'div', {}>('div', ({ $theme }) => {
  return {
    marginTop: $theme.sizing.scale300,
    marginBottom: $theme.sizing.scale800,
    paddingLeft: $theme.sizing.scale800,
    paddingRight: $theme.sizing.scale800,
    '@media (max-width: 599px)': {
      paddingLeft: $theme.sizing.scale600,
      paddingRight: $theme.sizing.scale600,
    },
    ...$theme.typography.ParagraphLarge,
  };
});
StyledBody.displayName = 'StyledBody';
