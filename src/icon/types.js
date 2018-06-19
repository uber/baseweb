// @flow

import type {ThemeT} from '../styles/types';

export type IconProps = {
  alt?: ?string,
  children?: any,
};

export type StyledIconProps = IconProps & {
  theme: ThemeT,
};
