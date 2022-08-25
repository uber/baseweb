/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { SORT_DIRECTION } from './constants';
import type { Override } from '../helpers/overrides';

export type SortDirection = keyof typeof SORT_DIRECTION | undefined | null;

export type HeadCellOverrides = {
  HeadCell?: Override;
  SortableLabel?: Override;
};
export type HeadCellProps = {
  /** Aria label applied to the sort button. */
  ariaLabel?: string;
  'aria-label'?: string;
  /** Additional content to fill head cell. Most likely used for a filter button. */
  children?: React.ReactNode;
  /** Visually indicates sort direction. Displays a chevron next to column title. */
  direction: SortDirection;
  /** Disabled click-to-sort. Renders column title in muted color. */
  disabled?: boolean;
  /** Callback for when column title is clicked to trigger sort. */
  onSort?: () => unknown;
  overrides?: HeadCellOverrides;
  /** Column title. */
  title: React.ReactNode;
  /** FillClickTarget enable click to sort on whitespace in a header cell. */
  fillClickTarget?: boolean;
};

export type TableProps = {
  /** Table columns. Data passed to each header cell. */
  columns: Array<string | React.ReactNode>;
  /** Table rows. Data passed to each row and cell */
  data: Array<Array<React.ReactNode>>;
  /** Table width fills this provided value. */
  horizontalScrollWidth?: string;
  /** Renders the table in a loading state. Not implemented, yet. */
  isLoading?: boolean;
};

export type FilterOverrides = {
  MenuButton?: Override;
  Content?: Override;
  Heading?: Override;
  Footer?: Override;
};
export type FilterProps = {
  /** Displays the filter icon in an active state. */
  active?: boolean;
  /** Arbitrary content to display in the filter popover. You will likely want to add checkboxes
   * or similar inputs to control filtering.
   */
  children: React.ReactNode;
  /** Disables the icon click action. Filter menu does not open when clicked. */
  disabled?: boolean;
  /** Adds a button to close the filter menu. */
  hasCloseButton?: boolean;
  /** Callback for when the filter closes. */
  onClose?: () => unknown;
  /** Callback for when the filter opens. */
  onOpen?: () => unknown;
  /** Callback for when the 'reset' button is clicked. */
  onReset?: () => unknown;
  /** Callback for when the 'select all' button is clicked. */
  onSelectAll?: () => unknown;
  overrides?: FilterOverrides;
  /** Determines whether focus is returned to Filter menu button. */
  returnFocus?: boolean;
};
