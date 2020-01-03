/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {ComponentType} from 'react';
import type {IconPropsT} from '../icon/types.js';

import type {
  ColorTokensT,
  ComponentColorTokensT,
  SemanticColorTokensT,
  DeprecatedSemanticColorTokensT,
  AnimationT,
  BreakpointsT,
  BorderT,
  BordersT,
  FontT,
  GridT,
  LightingT,
  MediaQueryT,
  SizingT,
  TypographyT,
  ZIndexT,
} from '../themes/types.js';

export type {
  AnimationT,
  BreakpointsT,
  BorderT,
  BordersT,
  FontT as Font,
  GridT,
  LightingT,
  MediaQueryT,
  SizingT,
  TypographyT,
  ZIndexT,
};

export type ColorsT = ColorTokensT &
  ComponentColorTokensT &
  SemanticColorTokensT &
  DeprecatedSemanticColorTokensT;

export type ThemeT = {|
  name: string,
  animation: AnimationT,
  borders: BordersT,
  breakpoints: BreakpointsT,
  colors: ColorsT,
  direction: 'auto' | 'rtl' | 'ltr',
  grid: GridT,
  icons?: IconT,
  lighting: LightingT,
  mediaQuery: MediaQueryT,
  sizing: SizingT,
  typography: TypographyT,
  zIndex: ZIndexT,
  // Remove this section in next v10 major version
  // https://github.com/uber/baseweb/pull/1184
  tooltip?: {
    backgroundColor: string,
  },
  // ^^^^^^^
|};

export type IconT = {
  Alert?: ComponentType<IconPropsT>,
  ArrowDown?: ComponentType<IconPropsT>,
  ArrowLeft?: ComponentType<IconPropsT>,
  ArrowRight?: ComponentType<IconPropsT>,
  ArrowUp?: ComponentType<IconPropsT>,
  Blank?: ComponentType<IconPropsT>,
  CheckIndeterminate?: ComponentType<IconPropsT>,
  Check?: ComponentType<IconPropsT>,
  ChevronDown?: ComponentType<IconPropsT>,
  ChevronUp?: ComponentType<IconPropsT>,
  ChevronLeft?: ComponentType<IconPropsT>,
  ChevronRight?: ComponentType<IconPropsT>,
  DeleteAlt?: ComponentType<IconPropsT>,
  Delete?: ComponentType<IconPropsT>,
  Filter?: ComponentType<IconPropsT>,
  Grab?: ComponentType<IconPropsT>,
  Hide?: ComponentType<IconPropsT>,
  Menu?: ComponentType<IconPropsT>,
  Overflow?: ComponentType<IconPropsT>,
  Plus?: ComponentType<IconPropsT>,
  Search?: ComponentType<IconPropsT>,
  Show?: ComponentType<IconPropsT>,
  Spinner?: ComponentType<IconPropsT>,
  TriangleDown?: ComponentType<IconPropsT>,
  TriangleLeft?: ComponentType<IconPropsT>,
  TriangleRight?: ComponentType<IconPropsT>,
  TriangleUp?: ComponentType<IconPropsT>,
  Upload?: ComponentType<IconPropsT>,
};
