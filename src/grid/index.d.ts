import * as React from 'react';
import {StyletronComponent} from 'styletron-react';

export enum ALIGNMENT {
  start = 'start',
  center = 'center',
  end = 'end',
}

export enum BEHAVIOR {
  fluid = 'fluid',
  fixed = 'fixed',
}

export type Responsive<T> = T | T[];

export interface GridProps {
  align?: Responsive<ALIGNMENT>;
  behavior?: BEHAVIOR;
  children: React.ReactElement<CellProps> | React.ReactElement<CellProps>[];
  gridColumns?: Responsive<number>;
  gridGaps?: Responsive<number>;
  gridGutters?: Responsive<number>;
  gridMargins?: Responsive<number>;
  gridMaxWidth?: number;
}

export interface StyledGridProps {
  $align?: Responsive<ALIGNMENT>;
  $behavior?: BEHAVIOR;
  $gridGutters?: Responsive<number>;
  $gridMargins?: Responsive<number>;
  $gridMaxWidth?: number;
}

export interface CellProps {
  align?: Responsive<ALIGNMENT>;
  children?: React.ReactNode;
  order?: Responsive<number>;
  skip?: Responsive<number>;
  span?: Responsive<number>;
}

export type StyledCellProps = {
  $align?: Responsive<ALIGNMENT>;
  $gridColumns?: Responsive<number>;
  $gridGaps?: Responsive<number>;
  $gridGutters?: Responsive<number>;
  $order?: Responsive<number>;
  $skip?: Responsive<number>;
  $span?: Responsive<number>;
};

export const Unstable_Grid: React.FunctionComponent<GridProps>;
export const Unstable_Cell: React.FunctionComponent<CellProps>;
export const Unstable_StyledGrid: StyletronComponent<StyledGridProps>;
export const Unstable_StyledCell: StyletronComponent<StyledCellProps>;
