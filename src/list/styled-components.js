/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles/index.js';

import {ARTWORK_SIZES} from './constants.js';
import type {
  StyledContentPropsT,
  StyledArtworkContainerPropsT,
} from './types.js';

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
      ...$theme.borders.border100,
      alignItems: 'center',
      borderTop: 'none',
      borderRight: 'none',
      borderLeft: 'none',
      display: 'flex',
      flexGrow: 1,
      height: $sublist ? '48px' : '72px',
      justifyContent: 'space-between',
      paddingRight: $theme.sizing.scale500,
      marginLeft: $mLeft ? $theme.sizing.scale500 : null,
    };
  },
);

export const StyledEndEnhancerContainer = styled('div', {
  alignItems: 'center',
  display: 'flex',
});

export const StyledArtworkContainer = styled<StyledArtworkContainerPropsT>(
  'div',
  ({$artworkSize, $theme}) => {
    let padding = null;
    switch ($artworkSize) {
      case ARTWORK_SIZES.SMALL:
        padding = $theme.sizing.scale800;
        break;
      case ARTWORK_SIZES.LARGE:
        padding = $theme.sizing.scale600;
        break;
      case ARTWORK_SIZES.MEDIUM:
      default:
        padding = $theme.sizing.scale700;
    }

    return {
      alignItems: 'center',
      display: 'flex',
      paddingLeft: padding,
      paddingRight: padding,
    };
  },
);
