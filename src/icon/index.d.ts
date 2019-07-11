import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

export interface StyledComponentArgsT {
  $size?: number | string;
  $color?: string;
}

export interface IconOverrides {
  Svg?: Override<StyledComponentArgsT>;
}

export interface IconProps {
  children?: React.ReactNode;
  size?: number | string;
  color?: string;
  title?: string;
  overrides?: IconOverrides;
}

export const Icon: React.FC<IconProps>;

export const StyledSvg: StyletronComponent<any>;
