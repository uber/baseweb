// @flow

import styled from '../styles/styled';
import type {ThemeT} from '../styles/types';
import type {IconProps} from './types';

type Props = IconProps & {
  theme: ThemeT,
};

// TODO: Disable this rule for styled component files?
// eslint-disable-next-line import/prefer-default-export
export const StyledIcon = styled('svg', ({theme}: Props) => ({
  display: 'inline-block',
  fill: 'current-color',
  height: theme.sizing.scale600,
  width: theme.sizing.scale600,
}));
