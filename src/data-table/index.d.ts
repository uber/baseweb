import * as React from 'react';

export class StatefulDataTable extends React.Component<any, any> {}

export function AnchorColumn(options: any): any;
export function BooleanColumn(options: any): any;
export function CategoricalColumn(options: any): any;
export function DatetimeColumn(options: any): any;
export function CustomColumn<ValueT, FilterParamsT>(options: any): any;
export function NumericalColumn(options: any): any;
export function StringColumn(options: any): any;

export declare const COLUMNS: {
  ANCHOR: 'ANCHOR';
  CATEGORICAL: 'CATEGORICAL';
  DATETIME: 'DATETIME';
  NUMERICAL: 'NUMERICAL';
  BOOLEAN: 'BOOLEAN';
  STRING: 'STRING';
  CUSTOM: 'CUSTOM';
};

export declare const NUMERICAL_FORMATS: {
  DEFAULT: 'DEFAULT';
  ACCOUNTING: 'ACCOUNTING';
  PERCENTAGE: 'PERCENTAGE';
};

export declare const SORT_DIRECTIONS: {
  ASC: 'ASC';
  DESC: 'DESC';
};

export type SortDirectionsT = typeof SORT_DIRECTIONS[keyof typeof SORT_DIRECTIONS] | null;
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

export interface ImperativeMethods {
  getRows: () => RowT[];
}

export type RowActionT = {
  label: string;
  onClick: (params: { event: React.MouseEvent<HTMLButtonElement>; row: RowT }) => any;
  renderIcon: any;
};

export type Props = {
  batchActions?: BatchActionT[];
  rowActions?: RowActionT[];
  columns: ColumnT[];
  onSelectionChange?: (rows: RowT[]) => any;
  rows: RowT[];
  controlRef?: React.Ref<ImperativeMethods>;
};
