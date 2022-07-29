/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import { IMAGE_LAYOUT, BACKGROUND_COLOR_TYPE, OBJECT_FIT } from './constants';

export const StyledRoot = styled<
  'button',
  {
    $backgroundColor: string;
    $backgroundColorType: keyof typeof BACKGROUND_COLOR_TYPE | undefined;
    $imageLayout: keyof typeof IMAGE_LAYOUT;
  }
>(
  'button',
  ({ $theme, $backgroundColor, $backgroundColorType, $imageLayout = IMAGE_LAYOUT.top }) => {
    const lightBackgroundStyle = {
      color: $theme.colors.contentOnColorInverse,
      borderColor: $theme.colors.borderOpaque,
      borderWidth: $theme.sizing.scale0,
      borderStyle: 'solid',
    };
    const darkBackgroundStyle = {
      color: $theme.colors.contentOnColor,
      border: 'none',
    };

    return {
      position: 'relative',
      padding: '0',
      textAlign: 'start',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: $imageLayout === IMAGE_LAYOUT.top ? 'column' : 'row',
      alignItems: 'stretch',
      width: '100%',
      overflow: 'hidden',
      borderRadius: $theme.borders.radius400,
      backgroundColor: $backgroundColor,
      ...($backgroundColorType === BACKGROUND_COLOR_TYPE.light
        ? lightBackgroundStyle
        : darkBackgroundStyle),
      ':focus': {
        outlineWidth: '3px',
        outlineStyle: 'solid',
        outlineColor: $theme.colors.borderAccent,
        outlineOffset: '-3px',
      },
      ':hover:after': {
        content: '""',
        width: '100%',
        height: '100%',
        zIndex: '1',
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor:
          $backgroundColorType === BACKGROUND_COLOR_TYPE.light
            ? 'rgba(0, 0, 0, 0.04)'
            : 'rgba(255, 255, 255, 0.10)',
      },
      ':active:after': {
        content: '""',
        width: '100%',
        height: '100%',
        zIndex: '1',
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor:
          $backgroundColorType === BACKGROUND_COLOR_TYPE.light
            ? 'rgba(0, 0, 0, 0.08)'
            : 'rgba(255, 255, 255, 0.20)',
      },
    };
  }
);

export const StyledImage = styled<
  'img',
  { $imageLayout: keyof typeof IMAGE_LAYOUT; $objectFit: keyof typeof OBJECT_FIT }
>('img', ({ $imageLayout, $objectFit = OBJECT_FIT.cover }) => {
  if ($imageLayout === IMAGE_LAYOUT.top) {
    return {
      height: '132px',
      width: '100%',
      objectFit: $objectFit,
    };
  }
  return {
    width: '112px',
    objectFit: $objectFit,
    order: '1',
  };
});

export const StyledContentContainer = styled('div', ({ $theme }) => ({
  paddingTop: $theme.sizing.scale600,
  paddingRight: $theme.sizing.scale300,
  paddingBottom: $theme.sizing.scale600,
  paddingLeft: $theme.sizing.scale600,
  width: '100%',
}));

export const StyledHeadingContainer = styled('div', ({ $theme }) => ({
  ...$theme.typography.HeadingXSmall,
}));

export const StyledParagraphContainer = styled('div', ({ $theme }) => ({
  ...$theme.typography.ParagraphSmall,
  marginTop: $theme.sizing.scale100,
}));
