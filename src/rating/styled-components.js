/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {styled} from '../styles/index.js';
import type {StyledRootPropsT, StyledRatingItemPropsT} from './types.js';
import {
  starSVG,
  angryRatingSVG,
  sadRatingSVG,
  neutralRatingSVG,
  happyRatingSVG,
  veryHappyRatingSVG,
} from './svg-icons.js';

export const StyledRoot = styled<StyledRootPropsT>('ul', ({$theme}) => {
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

export const StyledStar = styled<StyledRatingItemPropsT>(
  'li',
  ({$theme, $isActive, $isSelected}) => {
    let starStroke = $theme.colors.mono500;
    let starFill = $theme.colors.mono300;

    if ($isActive) {
      starStroke = starFill = $theme.colors.rating400;
    }

    const styles = {
      paddingLeft: 0,
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0,
      display: 'inline-block',
      transition: `all ${$theme.animation.timing400}`,
      cursor: 'pointer',
      marginLeft: 0,
      marginTop: 0,
      marginBottom: 0,
      marginRight: $theme.sizing.scale300,
      width: '22px',
      height: '20px',
      transform: $isSelected ? 'scale(1.35)' : '',
      ':focus': {
        outline: 'none',
      },
      ':after': {
        transition: `all ${$theme.animation.timing400}`,
        content:
          `url('data:image/svg+xml,` + starSVG(starFill, starStroke) + `')`,
      },
    };

    return styles;
  },
);

export const StyledEmoticon = styled<StyledRatingItemPropsT>(
  'li',
  ({$theme, $isActive, $isSelected, $index = 1}) => {
    let emoticonFill = $theme.colors.mono500;

    if ($isActive) {
      emoticonFill = $theme.colors.rating400;
    }

    const ratingIcons = [
      angryRatingSVG(emoticonFill),
      sadRatingSVG(emoticonFill),
      neutralRatingSVG(emoticonFill),
      happyRatingSVG(emoticonFill),
      veryHappyRatingSVG(emoticonFill),
    ];

    const styles = {
      paddingLeft: 0,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      display: 'inline-block',
      transition: `all ${$theme.animation.timing400}`,
      cursor: 'pointer',
      marginLeft: 0,
      marginTop: 0,
      marginBottom: 0,
      marginRight: $theme.sizing.scale300,
      width: '44px',
      height: '44px',
      transform: $isSelected ? 'scale(1.1)' : '',
      ':focus': {
        outline: 'none',
      },
      ':after': {
        transition: `all ${$theme.animation.timing400}`,
        content: `url('data:image/svg+xml,` + ratingIcons[$index - 1] + `')`,
      },
    };

    return styles;
  },
);
