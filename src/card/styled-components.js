/* @flow */

import {styled} from '../styles/index';

export const Action = styled('div', () => ({}));

export const Body = styled('div', ({$theme}) => {
  const {colors, sizing, typography} = $theme;
  return {
    marginBottom: sizing.scale600,
    color: colors.mono800,
    ...typography.font400,
  };
});

export const Contents = styled('div', ({$theme}) => {
  const {sizing} = $theme;
  return {
    margin: sizing.scale600,
  };
});

export const HeaderImage = styled('img', ({$theme}) => {
  const {borders} = $theme;
  return {
    borderTopLeftRadius: borders.radius200,
    borderTopRightRadius: borders.radius200,
    objectFit: 'contain',
    maxWidth: '100%',
  };
});

export const Root = styled('div', ({$theme}) => {
  const {borders, lighting} = $theme;
  return {
    ...borders.border300,
    boxShadow: lighting.shadow400,
    borderRadius: borders.radius200,
  };
});

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

export const Title = styled('h1', ({$hasThumbnail, $theme}) => {
  const {colors, sizing, typography} = $theme;
  return {
    ...typography.font600,
    color: colors.black,
    fontSize: $hasThumbnail ? sizing.scale600 : sizing.scale700,
    fontWeight: 500,
    margin: `0 0 ${sizing.scale300} 0`,
    padding: 0,
  };
});
