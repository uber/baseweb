/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { ALIGNMENT, BEHAVIOR, STYLE } from './constants';

import type { Override } from '../helpers/overrides';

export type Responsive<T> = T | Array<T>;

export type Alignment = typeof ALIGNMENT.start | typeof ALIGNMENT.center | typeof ALIGNMENT.end;

export type Behavior = typeof BEHAVIOR.fixed | typeof BEHAVIOR.fluid;
export type CSSLengthUnit =
  | 'cm'
  | 'mm'
  | 'Q'
  | 'in'
  | 'pc'
  | 'px'
  | 'pt'
  | 'em'
  | 'ex'
  | 'ch'
  | 'rem'
  | 'lh'
  | 'vw'
  | 'vh'
  | 'vmin'
  | 'vmax'
  | '%';

export type GridStyle = typeof STYLE[keyof typeof STYLE];

export type SharedGridProps = {
  /** Number of columns at each breakpoint. */
  gridColumns?: Responsive<number>;
  /** Gap between rows at each breakpoint. */
  gridGaps?: Responsive<number>;
  /** Gap between columns at each breakpoint. */
  gridGutters?: Responsive<number>;
  /** Modify the CSS length unit used to measure columns and rows. Defaults to theme value. */
  gridUnit?: CSSLengthUnit;
};

export type GridOverrides = {
  Grid?: Override;
  GridWrapper?: Override;
};

export type GridProps = {
  /** Control vertical alignment of cells at each breakpoint. */
  align?: Responsive<Alignment>;
  /** Grid container behavior beyond max width. Fluid will continue to expand. Fixed will limit grid container to max width and center the container horizontally within parent element. */
  behavior?: Behavior;
  /** Children should be Cells. */
  children: React.ReactElement | React.ReactElement[];
  /** Gap on either side of grid container at each breakpoint. */
  gridMargins?: Responsive<number>;
  /** Maximum width of the grid container. Does not include Margins. Only applies when `behavior` is `fluid`. */
  gridMaxWidth?: number;
  /** Style for your grid. The `default` style will pull values from the theme, while other styles have preset values that are unaffected by the theme. **/
  gridStyle?: GridStyle;
  /** Overrides for your grid. */
  overrides?: GridOverrides;
} & SharedGridProps;

export type StyledGridWrapperProps = {
  /** Grid container behavior beyond max width. Fluid will continue to expand. Fixed will limit grid container to max width and center the container horizontally within parent element. */
  $behavior?: Behavior;
  /** Gap on either side of grid container at each breakpoint. */
  $gridMargins?: Responsive<number>;
  /** Maximum width of the grid container. Does not include Margins. Only applies when `behavior` is `fluid`. */
  $gridMaxWidth?: number;
  /** Modify the CSS length unit used to measure columns and rows. Defaults to theme value. */
  $gridUnit?: CSSLengthUnit;
};

export type StyledGridProps = {
  /** Control vertical alignment of cells at each breakpoint. */
  $align?: Responsive<Alignment>;
  /** Grid container behavior beyond max width. Fluid will continue to expand. Fixed will limit grid container to max width and center the container horizontally within parent element. */
  $behavior?: Behavior;
  /** Gap between columns at each breakpoint. */
  $gridGutters?: Responsive<number>;
  /** Gap on either side of grid container at each breakpoint. */
  $gridMargins?: Responsive<number>;
  /** Maximum width of the grid container. Does not include Margins. Only applies when `behavior` is `fluid`. */
  $gridMaxWidth?: number;
  /** Modify the CSS length unit used to measure columns and rows. Defaults to theme value. */
  $gridUnit?: CSSLengthUnit;
  /** Style for your grid. The `default` style will pull values from the theme, while other styles have preset values that are unaffected by the theme. **/
  $gridStyle?: GridStyle;
};

export type CellOverrides = {
  Cell?: Override;
};
export type CellProps = {
  /** Control vertical alignment of individual cell at each breakpoint. Limited proxy for `align-self` CSS property. */
  align?: Responsive<Alignment>;
  /** Content to be placed in Cell. */
  children?: React.ReactNode;
  /** Control placement order of cell in flex row at each breakpoint. Proxy for `order` CSS property. */
  order?: Responsive<number>;
  /** Control number of columns to offset cell at each breakpoint. */
  skip?: Responsive<number>;
  /** Control number of columns the cell should span. */
  span?: Responsive<number>;
  /** Overrides for a single cell. */
  overrides?: CellOverrides;
} & SharedGridProps;

export type StyledCellProps = {
  /** Control vertical alignment of individual cell at each breakpoint. Limited proxy for `align-self` CSS property. */
  $align?: Responsive<Alignment>;
  /** Number of columns at each breakpoint. */
  $gridColumns?: Responsive<number>;
  /** Gap between rows at each breakpoint. */
  $gridGaps?: Responsive<number>;
  /** Gap between columns at each breakpoint. */
  $gridGutters?: Responsive<number>;
  /** Modify the CSS length unit used to measure columns and rows. Defaults to theme value. */
  $gridUnit?: CSSLengthUnit;
  /** Control placement order of cell in flex row at each breakpoint. Proxy for `order` CSS property. */
  $order?: Responsive<number>;
  /** Control number of columns to offset cell at each breakpoint. */
  $skip?: Responsive<number>;
  /** Control number of columns the cell should span. */
  $span?: Responsive<number>;
};
