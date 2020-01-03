/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {SORT_DIRECTION} from './constants.js';
import type {OverrideT} from '../helpers/overrides.js';

export type SortDirectionT = ?$Keys<typeof SORT_DIRECTION>;

export type HeadCellPropsT = {|
  /** Additional content to fill head cell. Most likely used for a filter button. */
  children?: React.Node,
  /** Visually indicates sort direction. Displays a chevron next to column title. */
  direction: SortDirectionT,
  /** Disabled click-to-sort. Renders column title in muted color. */
  disabled?: boolean,
  /** Callback for when column title is clicked to trigger sort. */
  onSort?: () => mixed,
  overrides?: {
    HeadCell?: OverrideT<*>,
    SortableLabel?: OverrideT<*>,
  },
  /** Column title. */
  title: string,
  /** FillClickTarget enable click to sort on whitespace in a header cell. */
  fillClickTarget?: boolean,
|};

export type TablePropsT = {|
  /** Table columns. Data passed to each header cell. */
  columns: Array<string | React.Node>,
  /** Table rows. Data passed to each row and cell */
  data: Array<Array<React.Node>>,
  /** Table width fills this provided value. */
  horizontalScrollWidth?: string,
  /** Renders the table in a loading state. Not implemented, yet. */
  isLoading?: boolean,
|};

export type FilterProps = {|
  /** Displays the filter icon in an active state. */
  active?: boolean,
  /** Arbitrary content to display in the filter popover. You will likely want to add checkboxes
   * or similar inputs to control filtering.
   */
  children: React.Node,
  /** Disables the icon click action. Filter menu does not open when clicked. */
  disabled?: boolean,
  /** Callback for when the 'reset' button is clicked. */
  onReset?: () => mixed,
  /** Callback for when the 'select all' button is clicked. */
  onSelectAll?: () => mixed,
  overrides?: {
    MenuButton?: OverrideT<*>,
    Content?: OverrideT<*>,
    Heading?: OverrideT<*>,
    Footer?: OverrideT<*>,
  },
|};
