/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* @flow */

import {styled} from '../styles/index.js';

export const Action = styled('div', () => ({}));
Action.displayName = 'StyledAction';

export const Body = styled('div', ({$theme}) => {
  const {colors, sizing, typography} = $theme;
  return {
    marginBottom: sizing.scale600,
    color: colors.foregroundAlt,
    ...typography.font400,
  };
});
Body.displayName = 'StyledBody';

export const Contents = styled('div', ({$theme}) => {
  const {sizing} = $theme;
  return {
    margin: sizing.scale800,
  };
});
Contents.displayName = 'StyledContents';

export const HeaderImage = styled('img', ({$theme}) => {
  const {borders} = $theme;
  return {
    borderTopLeftRadius: borders.radius200,
    borderTopRightRadius: borders.radius200,
    objectFit: 'contain',
    maxWidth: '100%',
  };
});
HeaderImage.displayName = 'StyledHeaderImage';

export const Root = styled('div', ({$theme}) => {
  const {borders, lighting, colors} = $theme;
  return {
    ...borders.border300,
    boxShadow: lighting.shadow400,
    borderRadius: borders.radius200,
    backgroundColor: colors.backgroundAlt,
  };
});
Root.displayName = 'StyledWrapper';

export const Thumbnail = styled('img', props => {
  const {
    $theme: {borders, sizing},
  } = props;
  return {
    float: 'right',
    height: sizing.scale2400,
    width: sizing.scale2400,
    objectFit: 'cover',
    borderRadius: borders.radius200,
    ...borders.border200,
    margin: `0 0 ${sizing.scale500} ${sizing.scale500}`,
  };
});
Thumbnail.displayName = 'StyledThumbnail';

export const Title = styled('h1', ({$hasThumbnail, $theme}) => {
  const {colors, sizing, typography} = $theme;
  return {
    ...typography.font500,
    color: colors.foreground,
    fontWeight: 500,
    margin: `0 0 ${sizing.scale300} 0`,
    padding: 0,
  };
});
Title.displayName = 'StyledTitle';
