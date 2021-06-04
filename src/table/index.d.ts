import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

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
  children?: React.ReactNode;
  direction: 'ASC' | 'DESC' | null;
  disabled?: boolean;
  onSort?: () => any;
  overrides?: SortableHeadCellOverrides;
  title: React.ReactNode;
  fillClickTarget?: boolean;
}
export const SortableHeadCell: React.FC<SortableHeadCellProps>;

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
export const Filter: React.FC<FilterProps>;

export const StyledTable: StyletronComponent<any>;
export const StyledFilterButton: StyletronComponent<any>;
export const StyledFilterContent: StyletronComponent<any>;
export const StyledFilterHeading: StyletronComponent<any>;
export const StyledFilterFooter: StyletronComponent<any>;
export const StyledHead: StyletronComponent<any>;
export const StyledHeadCell: StyletronComponent<any>;
export const StyledBody: StyletronComponent<any>;
export const StyledRow: StyletronComponent<any>;
export const StyledCell: StyletronComponent<any>;
export const StyledAction: StyletronComponent<any>;
export const StyledSortableLabel: StyletronComponent<any>;
