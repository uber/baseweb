import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {CSSLengthUnitT} from '../theme';
import {Override} from '../overrides';

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
  gridUnit?: CSSLengthUnitT;
  overrides?: {
    Grid?: Override<any>;
  };
}

export interface StyledGridProps {
  $align?: Responsive<ALIGNMENT>;
  $behavior?: BEHAVIOR;
  $gridGutters?: Responsive<number>;
  $gridMargins?: Responsive<number>;
  $gridMaxWidth?: number;
  $gridUnit?: CSSLengthUnitT;
}

export interface CellProps {
  align?: Responsive<ALIGNMENT>;
  children?: React.ReactNode;
  order?: Responsive<number>;
  skip?: Responsive<number>;
  span?: Responsive<number>;
  overrides?: {
    Cell?: Override<any>;
  };
}

export type StyledCellProps = {
  $align?: Responsive<ALIGNMENT>;
  $gridColumns?: Responsive<number>;
  $gridGaps?: Responsive<number>;
  $gridGutters?: Responsive<number>;
  $gridUnit?: CSSLengthUnitT;
  $order?: Responsive<number>;
  $skip?: Responsive<number>;
  $span?: Responsive<number>;
};

export const Grid: React.FunctionComponent<GridProps>;
export const Cell: React.FunctionComponent<CellProps>;
export const StyledGrid: StyletronComponent<StyledGridProps>;
export const StyledCell: StyletronComponent<StyledCellProps>;
