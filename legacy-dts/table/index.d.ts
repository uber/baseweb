import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export enum SORT_DIRECTION {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface SortableHeadCellOverrides {
  HeadCell?: Override<any>;
  SortableLabel?: Override<any>;
}

export interface SortableHeadCellProps {
  ariaLabel?: string;
  'aria-label'?: string;
  children?: React.ReactNode;
  direction: 'ASC' | 'DESC' | null;
  disabled?: boolean;
  onSort?: () => any;
  overrides?: SortableHeadCellOverrides;
  title: React.ReactNode;
  fillClickTarget?: boolean;
}
export declare const SortableHeadCell: React.FC<SortableHeadCellProps>;

export interface TableProps {
  columns: Array<string | React.ReactNode>;
  data: React.ReactNode[][];
  horizontalScrollWidth?: string;
  isLoading?: boolean;
}
export class Table extends React.Component<TableProps> {}

export interface FilterOverrides {
  MenuButton?: Override<any>;
  Content?: Override<any>;
  Heading?: Override<any>;
  Footer?: Override<any>;
}

export interface FilterProps {
  active?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  hasCloseButton?: boolean;
  onClose?: () => any;
  onOpen?: () => any;
  onReset?: () => any;
  onSelectAll?: () => any;
  overrides?: FilterOverrides;
  returnFocus?: boolean;
}
export declare const Filter: React.FC<FilterProps>;

export declare const StyledTable: StyletronComponent<any, any>;
export declare const StyledFilterButton: StyletronComponent<any, any>;
export declare const StyledFilterContent: StyletronComponent<any, any>;
export declare const StyledFilterHeading: StyletronComponent<any, any>;
export declare const StyledFilterFooter: StyletronComponent<any, any>;
export declare const StyledHead: StyletronComponent<any, any>;
export declare const StyledHeadCell: StyletronComponent<any, any>;
export declare const StyledBody: StyletronComponent<any, any>;
export declare const StyledRow: StyletronComponent<any, any>;
export declare const StyledCell: StyletronComponent<any, any>;
export declare const StyledAction: StyletronComponent<any, any>;
export declare const StyledSortableLabel: StyletronComponent<any, any>;
