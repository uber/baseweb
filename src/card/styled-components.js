/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* @flow */

import {
  expandBorderRadiusStyles,
  expandBorderStyles,
  styled,
} from '../styles/index.js';

export const Action = styled<{}>('div', ({$theme}) => ({
  ...$theme.typography.LabelMedium,
}));

export const Body = styled<{}>('div', ({$theme}) => ({
  marginBottom: $theme.sizing.scale600,
  color: $theme.colors.contentPrimary,
  ...$theme.typography.ParagraphMedium,
}));

export const Contents = styled<{}>('div', ({$theme}) => ({
  marginLeft: $theme.sizing.scale600,
  marginTop: $theme.sizing.scale600,
  marginRight: $theme.sizing.scale600,
  marginBottom: $theme.sizing.scale600,
}));

export const HeaderImage = styled<{}>('img', ({$theme}) => ({
  borderTopLeftRadius: $theme.borders.surfaceBorderRadius,
  borderTopRightRadius: $theme.borders.surfaceBorderRadius,
  objectFit: 'contain',
  maxWidth: '100%',
}));

// by using the section tag, we can keep the h1 for the title
// https://html.spec.whatwg.org/multipage/sections.html#headings-and-sections
export const Root = styled<{}>('section', ({$theme}) => ({
  ...expandBorderStyles({
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: $theme.colors.borderOpaque,
  }),
  ...expandBorderRadiusStyles($theme.borders.surfaceBorderRadius),
  backgroundColor: $theme.colors.backgroundPrimary,
}));

export const Thumbnail = styled<{}>('img', ({$theme}) => ({
  float: 'right',
  height: $theme.sizing.scale2400,
  width: $theme.sizing.scale2400,
  objectFit: 'cover',
  ...expandBorderRadiusStyles($theme.borders.surfaceBorderRadius),
  ...expandBorderStyles($theme.borders.border200),
  margin: `0 0 ${$theme.sizing.scale500} ${$theme.sizing.scale500}`,
}));

export const Title = styled<{}>('h1', ({$theme}) => ({
  ...$theme.typography.HeadingSmall,
  color: $theme.colors.contentPrimary,
  fontWeight: 500,
  marginLeft: 0,
  marginTop: 0,
  marginRight: 0,
  marginBottom: $theme.sizing.scale300,
  paddingLeft: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
}));
