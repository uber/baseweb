/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';

export type TreeLabelOverridesT = {
  TreeItemContent?: OverrideT<{}>,
  IconContainer?: OverrideT<{}>,
  ExpandIcon?: OverrideT<{}>,
  CollapseIcon?: OverrideT<{}>,
};
export type TreeViewOverridesT = {
  ...TreeLabelOverridesT,
  Root?: OverrideT<{}>,
  TreeItemList?: OverrideT<{$isChildNode?: boolean}>,
  TreeItem?: OverrideT<{$isLeafNode?: boolean}>,
  TreeLabel?: OverrideT<TreeLabelT>,
};

export type TreeNodeT = {
  id?: number | string,
  children?: TreeNodeT[],
  isExpanded?: boolean,
  label: ((node: TreeNodeT) => React.Node) | string,
  // eslint-disable-next-line flowtype/no-weak-types
  info?: any,
  // eslint-disable-next-line flowtype/no-weak-types
  [key: string]: any,
};

export type TreeLabelT = {
  hasChildren: boolean,
  isExpanded?: boolean,
  label: ((node: TreeNodeT) => React.Node) | string,
  overrides?: TreeLabelOverridesT,
  node: TreeNodeT,
};

export type SharedStylePropsT = {
  $hasChildren: boolean,
  $isExpanded: boolean,
};

export type TreeNodePropsT = {
  node: TreeNodeT,
  onToggle?: (node: TreeNodeT) => void,
  overrides?: TreeViewOverridesT,
  renderAll?: boolean,
};

export type StatefulContainerPropsT = {
  ...TreeViewPropsT,
  children: (props: TreeViewPropsT) => React.Node,
};

export type TreeViewPropsT = {|
  data: TreeNodeT[],
  onToggle?: (node: TreeNodeT) => void,
  overrides?: TreeViewOverridesT,
  renderAll?: boolean,

  // will set isExpanded to false on sibling nodes when toggling isExpanded to true for one node
  // note: will NOT affect pre-set data. If you start with multiple sibling nodes open it will be open until you toggle one of them to isExpanded
  singleExpanded?: boolean,
|};
