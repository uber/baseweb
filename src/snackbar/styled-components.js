/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {StyledSpinnerNext} from '../spinner/index.js';
import {styled, withStyle} from '../styles/index.js';

import {PLACEMENT} from './constants.js';
import type {PlacementT} from './types.js';

export const StyledRoot = styled<{}>('div', ({$theme}) => {
  return {
    backgroundColor: $theme.colors.backgroundInverseSecondary,
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    borderBottomRightRadius: '16px',
    borderBottomLeftRadius: '16px',
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

export const StyledStartEnhancerContainer = styled('span', {
  alignItems: 'center',
  display: 'flex',
  paddingLeft: '16px',
});

export const StyledSpinner = withStyle<
  typeof StyledSpinnerNext,
  {$height: number, $width: number},
>(StyledSpinnerNext, ({$height, $width}) => {
  return {
    boxSizing: 'border-box',
    height: `${$height}px`,
    width: `${$width}px`,
  };
});

export const StyledMessage = styled<{$hasSuffix: boolean}>(
  'p',
  // $FlowFixMe - suppressing due to webkit properties
  ({$theme, $hasSuffix}) => {
    return {
      ...$theme.typography.ParagraphMedium,
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': 3,
      display: '-webkit-box',
      marginTop: '16px',
      marginBottom: '16px',
      overflow: 'hidden',
      paddingRight: $hasSuffix ? '8px' : '16px',
      paddingLeft: '16px',
    };
  },
);

export const StyledWrapActionButtonContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row-reverse',
});

export const StyledActionButtonContainer = styled('div', {marginLeft: 'auto'});

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
    marginTop: '16px',
    marginRight: '8px',
    marginBottom: '16px',
    marginLeft: '8px',
  };
});
