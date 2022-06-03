import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

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

export declare const Icon: React.FC<IconProps>;

export declare const StyledSvg: StyletronComponent<any>;

export declare const Alert: React.FC<IconProps>;
export declare const ArrowDown: React.FC<IconProps>;
export declare const ArrowLeft: React.FC<IconProps>;
export declare const ArrowRight: React.FC<IconProps>;
export declare const ArrowUp: React.FC<IconProps>;
export declare const Blank: React.FC<IconProps>;
export declare const CheckIndeterminate: React.FC<IconProps>;
export declare const Check: React.FC<IconProps>;
export declare const ChevronDown: React.FC<IconProps>;
export declare const ChevronLeft: React.FC<IconProps>;
export declare const ChevronRight: React.FC<IconProps>;
export declare const ChevronUp: React.FC<IconProps>;
export declare const DeleteAlt: React.FC<IconProps>;
export declare const Delete: React.FC<IconProps>;
export declare const Filter: React.FC<IconProps>;
export declare const Grab: React.FC<IconProps>;
export declare const Hide: React.FC<IconProps>;
export declare const Menu: React.FC<IconProps>;
export declare const Overflow: React.FC<IconProps>;
export declare const Plus: React.FC<IconProps>;
export declare const Search: React.FC<IconProps>;
export declare const Show: React.FC<IconProps>;
export declare const Spinner: React.FC<IconProps>;
export declare const TriangleDown: React.FC<IconProps>;
export declare const TriangleLeft: React.FC<IconProps>;
export declare const TriangleRight: React.FC<IconProps>;
export declare const TriangleUp: React.FC<IconProps>;
export declare const Upload: React.FC<IconProps>;
