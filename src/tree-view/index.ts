/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { TreeNodeData } from './types';

export { default as TreeView } from './tree-view';
export { default as StatefulTreeView } from './stateful-tree-view';

export * from './types';

export {
  StyledTreeItemList,
  StyledTreeItem,
  StyledItemContent,
  StyledIconContainer,
} from './styled-components';

export { default as TreeLabel } from './tree-label';
export { default as TreeLabelInteractable } from './tree-label-interactable';
export { toggleIsExpanded } from './utils';
/** @deprecated use TreeNodeData instead. To be removed in future versions.*/
export type TreeNode = TreeNodeData;
