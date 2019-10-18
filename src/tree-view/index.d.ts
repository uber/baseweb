import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

export interface TreeViewOverrides {
  Root?: Override<{}>;
  TreeItemList?: Override<{$isChildNode?: boolean}>;
  TreeItem?: Override<{$isLeafNode?: boolean}>;
  TreeItemContent?: Override<{}>;
  IconContainer?: Override<{}>;
  ExpandIcon?: Override<{}>;
  CollapseIcon?: Override<{}>;
}

export interface TreeNode {
  id?: number | string;
  children?: TreeNode[];
  isExpanded?: boolean;
  label: ((node: TreeNode) => React.ReactNode) | string;
  info?: any;
}

export interface TreeNodeProps {
  node: TreeNode;
  onToggle?: (node: TreeNode) => void;
  overrides?: TreeViewOverrides;
}

export type StatefulContainerProps = TreeViewProps & {
  children: (props: TreeViewProps) => React.ReactNode;
};

export interface TreeViewProps {
  data: TreeNode[];
  onToggle?: (node: TreeNode) => void;
  overrides?: TreeViewOverrides;
}

export const Unstable_TreeView: React.FC<TreeViewProps>;

export const Unstable_StatefulTreeView: React.FC<TreeViewProps>;

export const StyledTreeItemList: StyletronComponent<any>;
export const StyledTreeItem: StyletronComponent<any>;
export const StyledItemContent: StyletronComponent<any>;
export const StyledIconContainer: StyletronComponent<any>;
