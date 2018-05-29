// @flow

import styled from '../styles/styled';
import type {StyledIconProps} from './types';

// TODO: Disable this rule for styled component files?
// eslint-disable-next-line import/prefer-default-export
export const StyledIcon = styled('svg', ({theme}: StyledIconProps) => ({
  display: 'inline-block',
  fill: 'current-color',
  height: theme.sizing.scale600,
  width: theme.sizing.scale600,
}));
