/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';

export type TreeViewOverridesT = {
  Root?: OverrideT<{}>,
  TreeItemList?: OverrideT<{$isChildNode?: boolean}>,
  TreeItem?: OverrideT<{$isLeafNode?: boolean}>,
  TreeItemContent?: OverrideT<{}>,
  IconContainer?: OverrideT<{}>,
  ExpandIcon?: OverrideT<{}>,
  CollapseIcon?: OverrideT<{}>,
};

export type TreeNodeT = {
  id?: number | string,
  children?: TreeNodeT[],
  isExpanded?: boolean,
  label: ((node: TreeNodeT) => React.Node) | string,
  // eslint-disable-next-line flowtype/no-weak-types
  info?: any,
};

export type TreeNodePropsT = {
  node: TreeNodeT,
  onToggle?: (node: TreeNodeT) => void,
  overrides?: TreeViewOverridesT,
};

export type StatefulContainerPropsT = {
  ...TreeViewPropsT,
  children: (props: TreeViewPropsT) => React.Node,
};

export type TreeViewPropsT = {|
  data: TreeNodeT[],
  onToggle?: (node: TreeNodeT) => void,
  overrides?: TreeViewOverridesT,
|};
