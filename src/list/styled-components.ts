/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled, expandBorderStyles } from '../styles';

import type {
  StyledRootProps,
  StyledContentProps,
  StyledArtworkContainerProps,
  StyledHeadingHeadingProps,
} from './types';
import { artworkSizeToValue } from './utils';
import { SHAPE } from './constants';

export const StyledRoot = styled<'li', StyledRootProps>(
  'li',
  ({ $theme, $shape, $isTapTarget = false }) => {
    return {
      alignItems: 'center',
      backgroundColor: $theme.colors.backgroundPrimary,
      display: 'flex',
      listStyleType: 'none',
      width: '100%',
      borderTopLeftRadius: $shape === SHAPE.ROUND ? $theme.borders.radius400 : 0,
      borderTopRightRadius: $shape === SHAPE.ROUND ? $theme.borders.radius400 : 0,
      borderBottomLeftRadius: $shape === SHAPE.ROUND ? $theme.borders.radius400 : 0,
      borderBottomRightRadius: $shape === SHAPE.ROUND ? $theme.borders.radius400 : 0,
      overflow: 'hidden',
      ...($isTapTarget
        ? {
            // button style reset
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            textAlign: 'inherit',
            boxShadow: 'none',
            padding: 0,
            cursor: 'pointer',
            border: 'none',
            color: 'inherit',
            font: 'inherit',
          }
        : {}),
    };
  }
);

StyledRoot.displayName = 'StyledRoot';

export const StyledContent = styled<'div', StyledContentProps>(
  'div',
  // @ts-ignore
  ({ $mLeft, $sublist, $theme, $hasDivider = true }) => {
    const styles = {
      ...expandBorderStyles($theme.borders.border100),
      boxSizing: 'border-box', // to make the min-height=64px including the border width.
      alignItems: 'center',
      borderTopStyle: 'none',
      borderRightStyle: 'none',
      borderLeftStyle: 'none',
      display: 'flex',
      flexGrow: 1,
      minHeight: $sublist ? 'initial' : $theme.sizing.scale1600,
      justifyContent: 'space-between',
      ...($theme.direction === 'rtl'
        ? {
            paddingLeft: $theme.sizing.scale600,
            marginRight: $mLeft ? $theme.sizing.scale600 : null,
          }
        : {
            paddingRight: $theme.sizing.scale600,
            marginLeft: $mLeft ? $theme.sizing.scale600 : null,
          }),
    };
    if ($hasDivider === false) {
      styles['borderBottomColor'] = 'transparent';
    }
    return styles;
  }
);

StyledContent.displayName = 'StyledContent';

export const StyledEndEnhancerContainer = styled('div', {
  alignItems: 'center',
  display: 'flex',
});

StyledEndEnhancerContainer.displayName = 'StyledEndEnhancerContainer';

export const StyledArtworkContainer = styled<'div', StyledArtworkContainerProps>(
  'div',
  ({ $artworkSize, $sublist, $theme }) => {
    let sizeValue: number =
      typeof $artworkSize === 'number'
        ? $artworkSize
        : artworkSizeToValue($artworkSize, Boolean($sublist));

    if (sizeValue > 36) {
      return {
        alignItems: 'center',
        display: 'flex',
        flexShrink: 0,
        paddingLeft: $theme.sizing.scale600,
        paddingRight: $theme.sizing.scale600,
      };
    }

    return {
      alignItems: 'center',
      display: 'flex',
      flexShrink: 0,
      justifyContent: 'center',
      width: $theme.sizing.scale1600,
    };
  }
);

StyledArtworkContainer.displayName = 'StyledArtworkContainer';

export const StyledLabelRoot = styled('div', ({ $theme }) => {
  return {
    paddingTop: $theme.sizing.scale500,
    paddingBottom: $theme.sizing.scale500,
    display: 'grid',
    gridGap: $theme.sizing.scale0,
  };
});

StyledLabelRoot.displayName = 'StyledLabelRoot';

export const StyledLabelContent = styled('p', ({ $theme }) => {
  return {
    ...$theme.typography.LabelMedium,
    color: $theme.colors.contentPrimary,
    marginTop: 0,
    marginBottom: 0,
  };
});

StyledLabelContent.displayName = 'StyledLabelContent';

export const StyledLabelDescription = styled('p', ({ $theme }) => {
  return {
    ...$theme.typography.ParagraphSmall,
    color: $theme.colors.contentPrimary,
    marginTop: 0,
    marginBottom: 0,
  };
});

StyledLabelDescription.displayName = 'StyledLabelDescription';

export const StyledLabelSublistContent = styled('p', ({ $theme }) => {
  return {
    ...$theme.typography.LabelMedium,
    color: $theme.colors.contentPrimary,
    marginTop: $theme.sizing.scale500,
    marginBottom: $theme.sizing.scale500,
  };
});

StyledLabelSublistContent.displayName = 'StyledLabelSublistContent';

export const StyledHeadingRoot = styled<'div', StyledRootProps>('div', ({ $theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: $theme.colors.backgroundPrimary,
    overflow: 'hidden',
    minHeight: $theme.sizing.scale1600,
  };
});

StyledHeadingRoot.displayName = 'StyledHeadingRoot';

export const StyledHeadingContent = styled('div', ({ $theme }) => {
  return {
    flexGrow: 1,
    width: '100%',
    minWidth: 0,
    paddingTop: $theme.sizing.scale600,
    paddingBottom: $theme.sizing.scale300,
    ...($theme.direction === 'rtl'
      ? {
          paddingLeft: $theme.sizing.scale600,
          marginRight: $theme.sizing.scale600,
        }
      : {
          paddingRight: $theme.sizing.scale600,
          marginLeft: $theme.sizing.scale600,
        }),
  };
});

StyledHeadingContent.displayName = 'StyledHeadingContent';

export const StyledHeadingContentRow = styled('div', {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  width: '100%',
});

StyledHeadingContentRow.displayName = 'StyledHeadingContentRow';

export const StyledHeadingMainHeading = styled<'p', StyledHeadingHeadingProps>(
  'p',
  ({ $maxLines = 1, $theme }) => {
    return {
      ...$theme.typography.HeadingXSmall,
      color: $theme.colors.contentPrimary,
      marginTop: 0,
      marginBottom: 0,
      marginRight: $theme.sizing.scale600,
      display: '-webkit-box',
      '-webkit-line-clamp': $maxLines,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
    };
  }
);

StyledHeadingMainHeading.displayName = 'StyledHeadingMainHeading';

export const StyledHeadingSubHeading = styled<'p', StyledHeadingHeadingProps>(
  'p',
  ({ $maxLines = 1, $theme }) => {
    return {
      ...$theme.typography.ParagraphMedium,
      color: $theme.colors.contentSecondary,
      marginTop: 0,
      marginBottom: 0,
      marginRight: $theme.sizing.scale600,
      display: '-webkit-box',
      '-webkit-line-clamp': $maxLines,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
    };
  }
);

StyledHeadingSubHeading.displayName = 'StyledHeadingSubHeading';

export const StyledHeadingEndEnhancerContainer = styled<
  'div',
  {
    $isText: boolean;
  }
>('div', ({ $isText, $theme }) => ({
  ...$theme.typography.LabelMedium,
  display: 'flex',
  alignItems: $isText ? 'flex-end' : 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

StyledHeadingEndEnhancerContainer.displayName = 'StyledHeadingEndEnhancerContainer';

export const StyledHeadingEndEnhancerDescriptionContainer = styled('p', ({ $theme }) => ({
  ...$theme.typography.ParagraphSmall,
  color: $theme.colors.contentSecondary,
  marginTop: 0,
  marginBottom: 0,
  display: 'flex',
  alignItems: 'flex-start',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));
StyledHeadingEndEnhancerDescriptionContainer.displayName =
  'StyledHeadingEndEnhancerDescriptionContainer';
