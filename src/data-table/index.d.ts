import * as React from 'react';

export class Unstable_StatefulDataTable extends React.Component<any, any> {}

export function AnchorColumn(options: any): any;
export function BooleanColumn(options: any): any;
export function CategoricalColumn(options: any): any;
export function DatetimeColumn(options: any): any;
export function CustomColumn<ValueT, FilterParamsT>(options: any): any;
export function NumericalColumn(options: any): any;
export function StringColumn(options: any): any;

export interface COLUMNS {
  ANCHOR: 'ANCHOR';
  CATEGORICAL: 'CATEGORICAL';
  DATETIME: 'DATETIME';
  NUMERICAL: 'NUMERICAL';
  BOOLEAN: 'BOOLEAN';
  STRING: 'STRING';
  CUSTOM: 'CUSTOM';
}
export const COLUMNS: COLUMNS;

export interface NUMERICAL_FORMATS {
  DEFAULT: 'DEFAULT';
  ACCOUNTING: 'ACCOUNTING';
  PERCENTAGE: 'PERCENTAGE';
}
export const NUMERICAL_FORMATS: NUMERICAL_FORMATS;

export interface SORT_DIRECTIONS {
  ASC: 'ASC';
  DESC: 'DESC';
}
export const SORT_DIRECTIONS: SORT_DIRECTIONS;

export type SortDirectionsT =
  | SORT_DIRECTIONS['ASC']
  | SORT_DIRECTIONS['DESC']
  | null;
export type ColumnT = any;
export type RowT = {
  id: number | string;
  data: any;
};

export type BatchActionT = {
  label: string;
  onClick: (params: {
    clearSelection: () => any;
    event: React.MouseEvent<HTMLButtonElement>;
    selection: RowT[];
  }) => any;
  renderIcon?: any;
};

export type RowActionT = {
  label: string;
  onClick: (params: {
    event: React.MouseEvent<HTMLButtonElement>;
    row: RowT;
  }) => any;
  renderIcon: any;
};

export type Props = {
  batchActions?: BatchActionT[];
  rowActions?: RowActionT[];
  columns: ColumnT[];
  onSelectionChange?: (rows: RowT[]) => any;
  rows: RowT[];
};
