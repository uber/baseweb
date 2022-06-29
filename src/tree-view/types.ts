/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { Override } from '../helpers/overrides';

import type { SyntheticEvent } from 'react';

export type TreeLabelOverrides = {
  TreeItemContent?: Override;
  IconContainer?: Override;
  ExpandIcon?: Override;
  CollapseIcon?: Override;
  LeafIconContainer?: Override;
  LeafIcon?: Override;
};

export type TreeViewOverrides = {
  Root?: Override;
  TreeItemList?: Override;
  TreeItem?: Override;
  TreeLabel?: Override;
} & TreeLabelOverrides;

export type TreeNodeId = number | string;

export type TreeNodeData<T = any> = {
  id?: TreeNodeId;
  children?: TreeNodeData[];
  isExpanded?: boolean;
  label: ((node: TreeNodeData) => React.ReactNode) | string;
  info?: T;
  [key: string]: any;
};

export type TreeLabelProps = {
  hasChildren: boolean;
  isExpanded?: boolean;
  isSelected?: boolean;
  isFocusVisible?: boolean;
  label: ((node: TreeNodeData) => React.ReactNode) | string;
  overrides?: TreeLabelOverrides;
  node: TreeNodeData;
};

export type SharedStyleProps = {
  $hasChildren: boolean;
  $isExpanded: boolean;
  $isSelected: boolean;
  $isFocusVisible: boolean;
};

export type TreeNodeProps = {
  node: TreeNodeData;
  getId: (node: TreeNodeData) => TreeNodeId;
  onToggle?: (node: TreeNodeData) => void;
  overrides?: TreeViewOverrides;
  renderAll?: boolean;
  onKeyDown?: (e: KeyboardEvent, node: TreeNodeData) => unknown;
  onFocus?: (event: SyntheticEvent) => unknown;
  onBlur?: (event: SyntheticEvent) => unknown;
  selectedNodeId?: TreeNodeId;
  addRef: (id: TreeNodeId, ref: React.Ref<HTMLLIElement>) => unknown;
  removeRef: (id: TreeNodeId) => unknown;
  isFocusVisible?: boolean;
  indentGuides?: boolean;
};

export type StatefulContainerProps = {
  children: (props: TreeViewProps) => React.ReactNode;
} & TreeViewProps;

export type TreeViewProps = {
  data: TreeNodeData[];
  indentGuides?: boolean;
  onToggle?: (node: TreeNodeData) => void;
  overrides?: TreeViewOverrides;
  renderAll?: boolean;
  getId?: (node: TreeNodeData) => TreeNodeId;
  // will set isExpanded to false on sibling nodes when toggling isExpanded to true for one node
  // note: will NOT affect pre-set data. If you start with multiple sibling nodes open it will be open until you toggle one of them to isExpanded
  singleExpanded?: boolean;
};
