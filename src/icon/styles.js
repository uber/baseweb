// @flow
/* eslint-disable import/prefer-default-export */

import styled from '../styles/styled';

export const StyledIcon = styled('svg', ({theme}) => ({
  display: 'inline-block',
  fill: 'current-color',
  height: theme.sizing.scale400,
  width: theme.sizing.scale400,
}));
