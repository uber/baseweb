/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled, expandBorderStyles} from '../styles/index.js';

import type {
  StyledContentPropsT,
  StyledArtworkContainerPropsT,
} from './types.js';
import {artworkSizeToValue} from './utils.js';

export const StyledRoot = styled<{}>('li', ({$theme}) => {
  return {
    alignItems: 'center',
    backgroundColor: $theme.colors.backgroundPrimary,
    display: 'flex',
    listStyleType: 'none',
    width: '100%',
  };
});

export const StyledContent = styled<StyledContentPropsT>(
  'div',
  ({$mLeft, $sublist, $theme}) => {
    return {
      ...expandBorderStyles($theme.borders.border100),
      alignItems: 'center',
      borderTopStyle: 'none',
      borderRightStyle: 'none',
      borderLeftStyle: 'none',
      display: 'flex',
      flexGrow: 1,
      height: $sublist ? '48px' : '72px',
      justifyContent: 'space-between',
      marginLeft: $mLeft ? $theme.sizing.scale600 : null,
      ...($theme.direction === 'rtl'
        ? {paddingLeft: $theme.sizing.scale600}
        : {paddingRight: $theme.sizing.scale600}),
    };
  },
);

export const StyledEndEnhancerContainer = styled('div', {
  alignItems: 'center',
  display: 'flex',
});

export const StyledArtworkContainer = styled<StyledArtworkContainerPropsT>(
  'div',
  ({$artworkSize, $sublist, $theme}) => {
    let sizeValue: number =
      typeof $artworkSize === 'number'
        ? $artworkSize
        : artworkSizeToValue($artworkSize, Boolean($sublist));

    if (sizeValue > 36) {
      return {
        alignItems: 'center',
        display: 'flex',
        paddingLeft: $theme.sizing.scale600,
        paddingRight: $theme.sizing.scale600,
      };
    }

    return {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      width: $theme.sizing.scale1600,
    };
  },
);

export const StyledLabelContent = styled<{||}>('p', ({$theme}) => {
  return {
    ...$theme.typography.LabelMedium,
    color: $theme.colors.contentPrimary,
    marginTop: 0,
    marginBottom: 0,
  };
});

export const StyledLabelDescription = styled<{||}>('p', ({$theme}) => {
  return {
    ...$theme.typography.ParagraphSmall,
    color: $theme.colors.contentPrimary,
    marginTop: 0,
    marginBottom: 0,
  };
});

export const StyledLabelSublistContent = styled<{||}>('p', ({$theme}) => {
  return {
    ...$theme.typography.ParagraphMedium,
    color: $theme.colors.contentPrimary,
  };
});
