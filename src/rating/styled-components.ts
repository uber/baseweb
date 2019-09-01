/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { styled } from '../styles/index';
import type { StyledRootPropsT, StyledRatingItemPropsT } from './types';
import {
  starSVG,
  angryRatingSVG,
  sadRatingSVG,
  neutralRatingSVG,
  happyRatingSVG,
  veryHappyRatingSVG,
} from './svg-icons';
import type { StyleObject } from 'styletron-standard';

export const StyledRoot = styled<'ul', StyledRootPropsT>('ul', ({ $theme }) => {
  return {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    display: 'inline-block',
    ':focus': {
      outline: 'none',
    },
  };
});

export const StyledStar = styled<'li', StyledRatingItemPropsT>(
  'li',
  ({ $theme, $isActive, $isPartialActive, $isSelected, $isFocusVisible, $isReadOnly, $size }) => {
    let starStroke = $theme.colors.ratingStroke;
    let starFill = $theme.colors.ratingInactiveFill;
    let prePartialStarStroke;
    let prePartialStarFill;

    if ($isActive) {
      starStroke = starFill = $theme.colors.warning400;
    }
    if ($isPartialActive && !$isActive) {
      prePartialStarStroke = prePartialStarFill = $theme.colors.warning400;
    }

    const styles: StyleObject = {
      paddingLeft: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
      display: 'inline-block',
      transition: `transform ${$theme.animation.timing400}`,
      cursor: $isReadOnly ? 'default' : 'pointer',
      marginLeft: 0,
      marginTop: 0,
      marginBottom: 0,
      marginRight: $theme.sizing.scale300,
      width: `${$size}px`,
      height: `${$size}px`,
      lineHeight: 1,
      transform: $isSelected ? 'scale(1.35)' : null,
      outline: $isFocusVisible ? `3px solid ${$theme.colors.accent}` : 'none',
      outlineOffset: '2px',
      position: 'relative',
      ':after': {
        transition: `all ${$theme.animation.timing400}`,
        content: `url('data:image/svg+xml,` + starSVG(starFill, starStroke, $size) + `')`,
        height: '100%',
      },
      ':before':
        prePartialStarFill && prePartialStarStroke
          ? {
              transition: `all ${$theme.animation.timing400}`,
              position: 'absolute',
              display: 'block',
              top: 0,
              left: 0,
              width: '50%',
              height: '100%',
              overflow: 'hidden',
              content:
                `url('data:image/svg+xml,` +
                starSVG(prePartialStarFill, prePartialStarStroke, $size) +
                `')`,
            }
          : {},
      ':last-of-type': {
        marginRight: 0,
      },
    };

    return styles;
  }
);

export const StyledEmoticon = styled<'li', StyledRatingItemPropsT>(
  'li',
  ({ $theme, $isActive, $isSelected, $index = 1, $isFocusVisible, $isReadOnly, $size }) => {
    let emoticonFill = $theme.colors.ratingInactiveFill;

    if ($isActive) {
      emoticonFill = $theme.colors.warning400;
    }

    const ratingIcons = [
      angryRatingSVG(emoticonFill, $size),
      sadRatingSVG(emoticonFill, $size),
      neutralRatingSVG(emoticonFill, $size),
      happyRatingSVG(emoticonFill, $size),
      veryHappyRatingSVG(emoticonFill, $size),
    ];

    const styles: StyleObject = {
      paddingLeft: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      display: 'inline-block',
      transition: `transform ${$theme.animation.timing400}`,
      cursor: $isReadOnly ? 'default' : 'pointer',
      marginLeft: 0,
      marginTop: 0,
      marginBottom: 0,
      marginRight: $theme.sizing.scale300,
      width: `${$size}px`,
      height: `${$size}px`,
      transform: $isSelected ? 'scale(1.1)' : null,
      outline: $isFocusVisible ? `3px solid ${$theme.colors.accent}` : 'none',
      outlineOffset: '2px',
      ':after': {
        transition: `all ${$theme.animation.timing400}`,
        content: `url('data:image/svg+xml,` + ratingIcons[$index - 1] + `')`,
      },
    };

    return styles;
  }
);
