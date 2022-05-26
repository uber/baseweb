import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export interface DIVIDER {
  horizontal: 'horizontal';
  vertical: 'vertical';
  grid: 'grid';
  clean: 'clean';
}

export interface SIZE {
  compact: 'compact';
  default: 'default';
  spacious: 'spacious';
}

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
  divider?: DIVIDER[keyof DIVIDER];
  horizontalScrollWidth?: string;
  isLoading?: boolean;
  loadingMessage?: React.ReactNode | (() => React.ReactNode);
  emptyMessage?: React.ReactNode | (() => React.ReactNode);
  size?: SIZE[keyof SIZE];
}
export class Table extends React.Component<TableProps> {}

export interface BuilderOverrides extends TableOverrides {
  TableHeadCellSortable?: Override<any>;
  SortIconContainer?: Override<any>;
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
  size?: SIZE[keyof SIZE];
}
export class TableBuilder<RowT> extends React.Component<TableBuilderProps<RowT>> {}

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
export class TableBuilderColumn<RowT> extends React.Component<TableBuilderColumnProps<RowT>> {}

export declare const StyledRoot: StyletronComponent<any>;
export declare const StyledTable: StyletronComponent<any>;
export declare const StyledTableHead: StyletronComponent<any>;
export declare const StyledTableHeadRow: StyletronComponent<any>;
export declare const StyledTableHeadCell: StyletronComponent<any>;
export declare const StyledTableHeadCellSortable: StyletronComponent<any>;
export declare const StyledTableBody: StyletronComponent<any>;
export declare const StyledTableBodyRow: StyletronComponent<any>;
export declare const StyledTableBodyCell: StyletronComponent<any>;
export declare const StyledTableLoadingMessage: StyletronComponent<any>;
export declare const StyledTableEmptyMessage: StyletronComponent<any>;
export declare const StyledSortAscIcon: StyletronComponent<any>;
export declare const StyledSortDescIcon: StyletronComponent<any>;
export declare const StyledSortNoneIcon: StyletronComponent<any>;

export declare const DIVIDER: DIVIDER;
export declare const SIZE: SIZE;
