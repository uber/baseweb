import * as React from 'react';

export class Unstable_DataTable extends React.Component<any, any> {}

export function BooleanColumn(options: any): any;
export function CategoricalColumn(options: any): any;
export function CustomColumn(options: any): any;
export function NumericalColumn(options: any): any;
export function StringColumn(options: any): any;

export interface COLUMNS {
  CATEGORICAL: 'CATEGORICAL';
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
export type Row = {
  data: any[];
};
export type Props = {
  columns: ColumnT[];
  rows: Row[];
};
