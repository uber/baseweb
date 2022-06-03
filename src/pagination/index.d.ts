import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';
import { Locale } from '../locale';
import { SIZE } from '../input';

export { SIZE };

export declare const STATE_CHANGE_TYPE: {
  change: 'change';
};

export interface Labels {
  prevButton?: string;
  nextButton?: string;
  preposition?: string;
}

export interface State {
  currentPage: number;
}

export type StateReducer = (
  changeType: typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE],
  changes: State,
  currentState: State
) => State;

export interface PaginationOverrides {
  Root?: Override<any>;
  PrevButton?: Override<any>;
  NextButton?: Override<any>;
  MaxLabel?: Override<any>;
  DropdownContainer?: Override<any>;
  Select?: Override<any>;
}

export interface Callbacks {
  onPrevClick?: (args: { event: any }) => any;
  onNextClick?: (args: { event: any }) => any;
  onPageChange?: (args: { nextPage: number; prevPage: number }) => any;
}

export interface PaginationProps extends Callbacks {
  numPages: number;
  currentPage: number;
  labels?: Labels;
  overrides?: PaginationOverrides;
  size?: typeof SIZE[keyof typeof SIZE];
}

export interface PageOption {
  label: number;
}

export class Pagination extends React.PureComponent<PaginationProps> {
  getMenuOptions(numPages: number): [];
  onMenuItemSelect(data: { value: ReadonlyArray<PageOption> }): void;
  onPrevClick(event: React.SyntheticEvent<any>): void;
  onNextClick(event: React.SyntheticEvent<any>): void;
  constructAriaWayfinderLabel(locale: Locale, prefix: string): string;
}

export interface StatefulPaginationProps extends Callbacks {
  numPages: number;
  labels?: Labels;
  stateReducer?: StateReducer;
  initialState?: State;
  overrides?: PaginationOverrides;
}

export declare const StatefulPagination: React.FC<StatefulPaginationProps>;

export interface StatefulContainerProps {
  children: React.ReactNode;
  numPages: number;
  stateReducer?: StateReducer;
  initialState?: State;
  onPageChange?: Callbacks['onPageChange'];
}

export class StatefulContainer extends React.Component<StatefulContainerProps, State> {
  internalSetState(
    changeType: typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE],
    changes: State
  ): void;
  onPageChange(args: { nextPage: number }): void;
}

export declare const StyledRoot: StyletronComponent<any>;
export declare const StyledMaxLabel: StyletronComponent<any>;
export declare const StyledDropdownContainer: StyletronComponent<any>;
