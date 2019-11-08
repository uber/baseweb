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

export const Alert: React.FC<IconProps>;
export const ArrowDown: React.FC<IconProps>;
export const ArrowLeft: React.FC<IconProps>;
export const ArrowRight: React.FC<IconProps>;
export const ArrowUp: React.FC<IconProps>;
export const Blank: React.FC<IconProps>;
export const CheckIndeterminate: React.FC<IconProps>;
export const Check: React.FC<IconProps>;
export const ChevronDown: React.FC<IconProps>;
export const ChevronLeft: React.FC<IconProps>;
export const ChevronRight: React.FC<IconProps>;
export const ChevronUp: React.FC<IconProps>;
export const DeleteAlt: React.FC<IconProps>;
export const Delete: React.FC<IconProps>;
export const Filter: React.FC<IconProps>;
export const Grab: React.FC<IconProps>;
export const Hide: React.FC<IconProps>;
export const Menu: React.FC<IconProps>;
export const Overflow: React.FC<IconProps>;
export const Plus: React.FC<IconProps>;
export const Search: React.FC<IconProps>;
export const Show: React.FC<IconProps>;
export const Spinner: React.FC<IconProps>;
export const TriangleDown: React.FC<IconProps>;
export const TriangleLeft: React.FC<IconProps>;
export const TriangleRight: React.FC<IconProps>;
export const TriangleUp: React.FC<IconProps>;
export const Upload: React.FC<IconProps>;
