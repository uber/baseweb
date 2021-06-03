import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

export interface TableOverrides {
  Root?: Override<any>;
  Table?: Override<any>;
  TableHead?: Override<any>;
  TableHeadRow?: Override<any>;
  TableHeadCell?: Override<any>;
  TableBody?: Override<any>;
  TableBodyRow?: Override<any>;
  TableBodyCell?: Override<any>;
  TableLoadingMessage?: Override<any>;
  TableEmptyMessage?: Override<any>;
}
export interface TableProps {
  overrides?: TableOverrides;
  columns: Array<React.ReactNode>;
  data: React.ReactNode[][];
  horizontalScrollWidth?: string;
  isLoading?: boolean;
  loadingMessage?: React.ReactNode | (() => React.ReactNode);
  emptyMessage?: React.ReactNode | (() => React.ReactNode);
}
export class Table extends React.Component<TableProps> {}

export interface BuilderOverrides extends TableOverrides {
  TableHeadCellSortable?: Override<any>;
  SortAscIcon?: Override<any>;
  SortDescIcon?: Override<any>;
  SortNoneIcon?: Override<any>;
}
export interface TableBuilderProps<RowT> {
  overrides?: BuilderOverrides;
  children?: React.ReactNode;
  data: RowT[];
  horizontalScrollWidth?: string;
  sortColumn?: string | null;
  sortOrder?: 'ASC' | 'DESC' | null;
  onSort?: (columnId: string) => void;
  isLoading?: boolean;
  loadingMessage?: React.ReactNode | (() => React.ReactNode);
  emptyMessage?: React.ReactNode | (() => React.ReactNode);
}
export class TableBuilder<RowT> extends React.Component<
  TableBuilderProps<RowT>
> {}

export interface ColumnOverrides {
  TableHeadCell?: Override<any>;
  TableHeadCellSortable?: Override<any>;
  TableBodyCell?: Override<any>;
  SortAscIcon?: Override<any>;
  SortDescIcon?: Override<any>;
  SortNoneIcon?: Override<any>;
}
export interface TableBuilderColumnProps<RowT> {
  overrides?: ColumnOverrides;
  children: (row: RowT | any, rowIndex?: number) => React.ReactNode;
  id?: string;
  header?: React.ReactNode;
  numeric?: boolean;
  sortable?: boolean;
  tableHeadAriaLabel?: string;
}
export class TableBuilderColumn<RowT> extends React.Component<
  TableBuilderColumnProps<RowT>
> {}

export const StyledRoot: StyletronComponent<any>;
export const StyledTable: StyletronComponent<any>;
export const StyledTableHead: StyletronComponent<any>;
export const StyledTableHeadRow: StyletronComponent<any>;
export const StyledTableHeadCell: StyletronComponent<any>;
export const StyledTableHeadCellSortable: StyletronComponent<any>;
export const StyledTableBody: StyletronComponent<any>;
export const StyledTableBodyRow: StyletronComponent<any>;
export const StyledTableBodyCell: StyletronComponent<any>;
export const StyledTableLoadingMessage: StyletronComponent<any>;
export const StyledTableEmptyMessage: StyletronComponent<any>;
export const StyledSortAscIcon: StyletronComponent<any>;
export const StyledSortDescIcon: StyletronComponent<any>;
export const StyledSortNoneIcon: StyletronComponent<any>;
