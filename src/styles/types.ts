/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { ComponentType } from 'react';
import type { IconProps } from '../icon';

import type {
  ColorTokens,
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
import type { ColorTokens as PrimitiveColorTokens } from '../tokens';

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

export type Colors = {} & PrimitiveColorTokens &
  ColorTokens &
  ComponentColorTokens &
  SemanticColorTokens;

export type Theme = {
  name: string;
  animation: Animation;
  borders: Borders;
  breakpoints: Breakpoints;
  colors: Colors;
  direction: 'auto' | 'rtl' | 'ltr';
  grid: Grid;
  icons?: Icon;
  lighting: Lighting;
  mediaQuery: MediaQuery;
  sizing: Sizing;
  typography: Typography;
  zIndex: ZIndex;
};

export type Icon = {
  Alert?: ComponentType<IconProps>;
  ArrowDown?: ComponentType<IconProps>;
  ArrowLeft?: ComponentType<IconProps>;
  ArrowRight?: ComponentType<IconProps>;
  ArrowUp?: ComponentType<IconProps>;
  Blank?: ComponentType<IconProps>;
  Calendar?: ComponentType<IconProps>;
  CheckIndeterminate?: ComponentType<IconProps>;
  Check?: ComponentType<IconProps>;
  ChevronDown?: ComponentType<IconProps>;
  ChevronDownSmall?: ComponentType<IconProps>;
  ChevronUp?: ComponentType<IconProps>;
  ChevronUpSmall?: ComponentType<IconProps>;
  ChevronLeft?: ComponentType<IconProps>;
  ChevronLeftSmall?: ComponentType<IconProps>;
  ChevronRight?: ComponentType<IconProps>;
  ChevronRightSmall?: ComponentType<IconProps>;
  DeleteAlt?: ComponentType<IconProps>;
  Delete?: ComponentType<IconProps>;
  Filter?: ComponentType<IconProps>;
  Grab?: ComponentType<IconProps>;
  Hide?: ComponentType<IconProps>;
  Menu?: ComponentType<IconProps>;
  Overflow?: ComponentType<IconProps>;
  Plus?: ComponentType<IconProps>;
  Search?: ComponentType<IconProps>;
  Show?: ComponentType<IconProps>;
  Spinner?: ComponentType<IconProps>;
  TriangleDown?: ComponentType<IconProps>;
  TriangleLeft?: ComponentType<IconProps>;
  TriangleRight?: ComponentType<IconProps>;
  TriangleUp?: ComponentType<IconProps>;
  Upload?: ComponentType<IconProps>;
};
