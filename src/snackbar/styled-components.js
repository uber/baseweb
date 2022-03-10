/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {Spinner} from '../spinner/index.js';
import {styled, withStyle} from '../styles/index.js';

import {PLACEMENT} from './constants.js';
import type {PlacementT} from './types.js';

export const StyledRoot = styled<{}>('div', ({$theme}) => {
  return {
    backgroundColor: $theme.colors.backgroundInverseSecondary,
    borderTopLeftRadius: $theme.borders.radius400,
    borderTopRightRadius: $theme.borders.radius400,
    borderBottomRightRadius: $theme.borders.radius400,
    borderBottomLeftRadius: $theme.borders.radius400,
    boxShadow: '0px 16px 48px rgba(0, 0, 0, 0.22)',
    color: $theme.colors.contentInversePrimary,
    display: 'inline-block',
    maxWidth: '540px',
    minWidth: '320px',
  };
});

export const StyledContent = styled('div', {
  alignItems: 'center',
  display: 'inline-flex',
  width: '100%',
});

export const StyledStartEnhancerContainer = styled<{}>('span', ({$theme}) => {
  const paddingDir: string =
    $theme.direction === 'rtl' ? 'paddingRight' : 'paddingLeft';
  return {
    alignItems: 'center',
    display: 'flex',
    [paddingDir]: $theme.sizing.scale600,
  };
});

export const StyledSpinner = withStyle<
  typeof Spinner,
  {$height: number, $width: number},
>(Spinner, ({$height, $width}) => {
  return {
    boxSizing: 'border-box',
    height: `${$height}px`,
    width: `${$width}px`,
  };
});

export const StyledMessage = styled<{$hasSuffix: boolean}>(
  'p',
  //$FlowExpectedError[incompatible-shape]
  ({$theme, $hasSuffix}) => {
    const prefixPadding: string =
      $theme.direction === 'rtl' ? 'paddingRight' : 'paddingLeft';
    const suffixPadding: string =
      $theme.direction === 'rtl' ? 'paddingLeft' : 'paddingRight';
    return {
      ...$theme.typography.ParagraphMedium,
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': 3,
      display: '-webkit-box',
      marginTop: $theme.sizing.scale600,
      marginBottom: $theme.sizing.scale600,
      overflow: 'hidden',
      [prefixPadding]: $theme.sizing.scale600,
      [suffixPadding]: $hasSuffix
        ? $theme.sizing.scale300
        : $theme.sizing.scale600,
    };
  },
);

export const StyledWrapActionButtonContainer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
});

export const StyledActionButtonContainer = styled<{}>('div', ({$theme}) => {
  const marginDir: string =
    $theme.direction === 'rtl' ? 'marginRight' : 'marginLeft';
  return {
    [marginDir]: 'auto',
  };
});

function placementRules(placement) {
  switch (placement) {
    case PLACEMENT.topLeft:
      return {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        top: 0,
      };
    case PLACEMENT.topRight:
      return {
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        top: 0,
      };
    case PLACEMENT.bottom:
      return {
        alignItems: 'center',
        justifyContent: 'flex-end',
        bottom: 0,
      };
    case PLACEMENT.bottomLeft:
      return {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        bottom: 0,
      };
    case PLACEMENT.bottomRight:
      return {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        bottom: 0,
      };
    case PLACEMENT.top:
    default:
      return {
        alignItems: 'center',
        justifyContent: 'flex-start',
        top: 0,
      };
  }
}

export const StyledPlacementContainer = styled<{
  $animating: boolean,
  $placement: PlacementT,
  $translateHeight: number,
}>('div', ({$animating, $placement, $translateHeight, $theme}) => {
  return {
    ...placementRules($placement),
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'none',
    position: 'fixed',
    transform: $animating ? `translateY(${$translateHeight}px)` : null,
    transitionProperty: 'all',
    transitionTimingFunction: $theme.animation.easeOutQuinticCurve,
    transitionDuration: $theme.animation.timing1000,
    right: 0,
    left: 0,
    marginTop: $theme.sizing.scale300,
    marginRight: $theme.sizing.scale300,
    marginBottom: $theme.sizing.scale300,
    marginLeft: $theme.sizing.scale300,
    [$theme.mediaQuery.medium]: {
      marginTop: $theme.sizing.scale600,
      marginRight: $theme.sizing.scale600,
      marginBottom: $theme.sizing.scale600,
      marginLeft: $theme.sizing.scale600,
    },
  };
});
