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

const DIALOG_WIDTHS = {
  [SIZE.xSmall]: '480px',
  [SIZE.small]: '640px',
  [SIZE.medium]: '800px',
  [SIZE.large]: '100%',
};
export const StyledRoot = styled<
  'dialog',
  { $size: Size; $placement: Placement; $isOpen: boolean }
>('dialog', ({ $theme, $size, $placement = PLACEMENT.center, $isOpen }) => {
  const narrowViewportGutter = '16px';
  const wideViewportGutter = '40px';

  return {
    position: 'fixed',
    maxHeight: `calc(100vh - 2 * ${wideViewportGutter})`,
    maxWidth: `calc(100% - 2 * ${wideViewportGutter})`,
    borderRadius: $theme.borders.radius500,
    boxShadow: $theme.lighting.shallowBelow,
    backgroundColor: $theme.colors.backgroundPrimary,
    color: $theme.colors.contentPrimary,
    overflow: 'hidden',
    border: 'none',
    width: DIALOG_WIDTHS[$size],
    ...getPlacementStyles($placement, wideViewportGutter),
    '@media (max-width: 599px)': {
      width: `calc(100% - 2 * ${narrowViewportGutter})`,
      ...getPlacementStyles(PLACEMENT.bottomCenter, narrowViewportGutter),
    },
    '::backdrop': {
      backgroundColor: $theme.colors.backgroundOverlay,
    },

    // Dialog style resets
    marginTop: '0px',
    marginRight: '0px',
    marginBottom: '0px',
    marginLeft: '0px',
    paddingTop: '0px',
    paddingRight: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',

    // modifying the default `display` value for a closed dialog element causes unexpected behavior
    ...($isOpen
      ? {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }
      : {}),
  };
});
StyledRoot.displayName = 'StyledRoot';

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
