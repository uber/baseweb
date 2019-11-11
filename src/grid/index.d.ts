import * as React from 'react';
import {StyletronComponent} from 'styletron-react';

export enum Alignment {
  start = 'start',
  center = 'center',
  end = 'end',
}

export enum Behavior {
  fluid = 'fluid',
  fixed = 'fixed',
}

export type Responsive<T> = T | T[];
export type SoftResponsive<T> = Responsive<T | null>;

export interface GridProps {
  align?: Responsive<number>;
  behavior?: Behavior;
  children?: React.ReactNode;
  gridColumns?: Responsive<number>;
  gridGaps?: Responsive<number>;
  gridGutters?: Responsive<number>;
  gridMargins?: Responsive<number>;
  gridMaxWidth?: number;
}

export interface StyledGridProps {
  $align?: Responsive<Alignment>;
  $behavior?: Behavior;
  $gridGutters?: Responsive<number>;
  $gridMargins?: Responsive<number>;
  $gridMaxWidth?: number;
}

export interface CellProps {
  align?: Responsive<Alignment>;
  children?: React.ReactNode;
  order?: Responsive<number>;
  skip?: Responsive<number>;
  $gridColumns?: Responsive<number>;
  $gridGaps?: Responsive<number>;
  $gridGutters?: Responsive<number>;
}

export type StyledCellProps = {
  $align?: Responsive<Alignment>;
  $gridColumns?: Responsive<number>;
  $gridGaps?: Responsive<number>;
  $gridGutters?: Responsive<number>;
  $order?: Responsive<number>;
  $skip?: Responsive<number>;
  $span?: Responsive<number>;
};

export const Grid: React.FC<GridProps>;
export const Cell: React.FC<CellProps>;
export const StyledGrid: StyletronComponent<any>;
export const StyledCell: StyletronComponent<any>;
