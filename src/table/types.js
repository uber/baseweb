/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import type {OverrideT} from '../helpers/overrides.js';
import type {ThemeT} from '../styles/types.js';

export type HeadCellPropsT = {|
  /** Additional content to fill head cell. Most likely used for a filter button. */
  children?: React.Node,
  /** Visually indicates sort direction. Displays a chevron next to column title. */
  direction: 'ASC' | 'DESC' | null,
  /** Disabled click-to-sort. Renders column title in muted color. */
  disabled?: boolean,
  /** Callback for when column title is clicked to trigger sort. */
  onSort?: () => mixed,
  overrides?: {
    HeadCell: OverrideT<*>,
    SortableLabel: OverrideT<*>,
  },
  /** Column title. */
  title: string,
|};

export type TablePropsT = {|
  columns: Array<string | React.Node>,
  data: Array<Array<React.Node>>,
  horizontalScrollWidth?: string,
  isLoading?: boolean,
|};

export type SharedStylePropsT = {|
  $theme: ThemeT,
|};
