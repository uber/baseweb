/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { ComponentType } from 'react';
import type { IconProps } from '../icon';

import type {
  FoundationColorTokens,
  ComponentColorTokens,
  SemanticColorTokens,
  Animation,
  Breakpoints,
  Border,
  Borders,
  Font,
  Grid,
  Lighting,
  MediaQuery,
  Sizing,
  Typography,
  ZIndex,
} from '../themes';
import type { PrimitiveColorTokens } from '../tokens';

export type {
  Animation,
  Breakpoints,
  Border,
  Borders,
  Font,
  Grid,
  Lighting,
  MediaQuery,
  Sizing,
  Typography,
  ZIndex,
};

export type ColorTokens = PrimitiveColorTokens &
  FoundationColorTokens &
  ComponentColorTokens &
  SemanticColorTokens & { [key in string]: string };

export type Theme = {
  name: string;
  animation: Animation;
  borders: Borders;
  breakpoints: Breakpoints;
  colors: ColorTokens;
  direction: 'auto' | 'rtl' | 'ltr';
  grid: Grid;
  icons?: Icon;
  lighting: Lighting;
  mediaQuery: MediaQuery;
  sizing: Sizing;
  typography: Typography;
  zIndex: ZIndex;
};

type ForwardedSVG = React.ForwardRefExoticComponent<
  Omit<React.SVGProps<SVGSVGElement> & IconProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>;

export type Icon = {
  Alert?: ComponentType<IconProps> | ForwardedSVG;
  ArrowDown?: ComponentType<IconProps> | ForwardedSVG;
  ArrowLeft?: ComponentType<IconProps> | ForwardedSVG;
  ArrowRight?: ComponentType<IconProps> | ForwardedSVG;
  ArrowUp?: ComponentType<IconProps> | ForwardedSVG;
  Blank?: ComponentType<IconProps> | ForwardedSVG;
  Calendar?: ComponentType<IconProps> | ForwardedSVG;
  CheckIndeterminate?: ComponentType<IconProps> | ForwardedSVG;
  Check?: ComponentType<IconProps> | ForwardedSVG;
  ChevronDown?: ComponentType<IconProps> | ForwardedSVG;
  ChevronDownSmall?: ComponentType<IconProps> | ForwardedSVG;
  ChevronUp?: ComponentType<IconProps> | ForwardedSVG;
  ChevronUpSmall?: ComponentType<IconProps> | ForwardedSVG;
  ChevronLeft?: ComponentType<IconProps> | ForwardedSVG;
  ChevronLeftSmall?: ComponentType<IconProps> | ForwardedSVG;
  ChevronRight?: ComponentType<IconProps> | ForwardedSVG;
  ChevronRightSmall?: ComponentType<IconProps> | ForwardedSVG;
  DeleteAlt?: ComponentType<IconProps> | ForwardedSVG;
  Delete?: ComponentType<IconProps> | ForwardedSVG;
  Filter?: ComponentType<IconProps> | ForwardedSVG;
  Grab?: ComponentType<IconProps> | ForwardedSVG;
  Hide?: ComponentType<IconProps> | ForwardedSVG;
  Menu?: ComponentType<IconProps> | ForwardedSVG;
  Overflow?: ComponentType<IconProps> | ForwardedSVG;
  Plus?: ComponentType<IconProps> | ForwardedSVG;
  Search?: ComponentType<IconProps> | ForwardedSVG;
  Show?: ComponentType<IconProps> | ForwardedSVG;
  Spinner?: ComponentType<IconProps> | ForwardedSVG;
  TriangleDown?: ComponentType<IconProps> | ForwardedSVG;
  TriangleLeft?: ComponentType<IconProps> | ForwardedSVG;
  TriangleRight?: ComponentType<IconProps> | ForwardedSVG;
  TriangleUp?: ComponentType<IconProps> | ForwardedSVG;
  Upload?: ComponentType<IconProps> | ForwardedSVG;
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer R)[]
    ? DeepPartial<R>[]
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

export type MakeExtendable<T extends object> = {
  [K in keyof T]: T[K] extends object ? MakeExtendable<T[K]> : T[K];
} & { [k: string]: any };
