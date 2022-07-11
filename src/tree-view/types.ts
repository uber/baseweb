/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { OverrideT } from '../helpers/overrides';

import type { SyntheticEvent } from 'react';

export type TreeLabelOverridesT = {
  TreeItemContent?: OverrideT;
  IconContainer?: OverrideT;
  ExpandIcon?: OverrideT;
  CollapseIcon?: OverrideT;
  LeafIconContainer?: OverrideT;
  LeafIcon?: OverrideT;
};

export type TreeViewOverridesT = {
  Root?: OverrideT;
  TreeItemList?: OverrideT;
  TreeItem?: OverrideT;
  TreeLabel?: OverrideT;
} & TreeLabelOverridesT;

export type TreeNodeIdT = number | string;

export type TreeNodeT<T = any> = {
  id?: TreeNodeIdT;
  children?: TreeNodeT[];
  isExpanded?: boolean;
  label: ((node: TreeNodeT) => React.ReactNode) | string;
  info?: T;
  [key: string]: any;
};

export type TreeLabelT = {
  hasChildren: boolean;
  isExpanded?: boolean;
  isSelected?: boolean;
  isFocusVisible?: boolean;
  label: ((node: TreeNodeT) => React.ReactNode) | string;
  overrides?: TreeLabelOverridesT;
  node: TreeNodeT;
};

export type SharedStylePropsT = {
  $hasChildren: boolean;
  $isExpanded: boolean;
  $isSelected: boolean;
  $isFocusVisible: boolean;
};

export type TreeNodePropsT = {
  node: TreeNodeT;
  getId: (node: TreeNodeT) => TreeNodeIdT;
  onToggle?: (node: TreeNodeT) => void;
  overrides?: TreeViewOverridesT;
  renderAll?: boolean;
  onKeyDown?: (e: KeyboardEvent, node: TreeNodeT) => unknown;
  onFocus?: (event: SyntheticEvent) => unknown;
  onBlur?: (event: SyntheticEvent) => unknown;
  selectedNodeId?: TreeNodeIdT;
  addRef: (id: TreeNodeIdT, ref: React.Ref<HTMLLIElement>) => unknown;
  removeRef: (id: TreeNodeIdT) => unknown;
  isFocusVisible?: boolean;
  indentGuides?: boolean;
};

export type StatefulContainerPropsT = {
  children: (props: TreeViewPropsT) => React.ReactNode;
} & TreeViewPropsT;

export type TreeViewPropsT = {
  data: TreeNodeT[];
  indentGuides?: boolean;
  onToggle?: (node: TreeNodeT) => void;
  overrides?: TreeViewOverridesT;
  renderAll?: boolean;
  getId?: (node: TreeNodeT) => TreeNodeIdT;
  // will set isExpanded to false on sibling nodes when toggling isExpanded to true for one node
  // note: will NOT affect pre-set data. If you start with multiple sibling nodes open it will be open until you toggle one of them to isExpanded
  singleExpanded?: boolean;
};
