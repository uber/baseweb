import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

export interface TreeViewOverrides extends TreeLabelOverrides {
  Root?: Override<{}>;
  TreeItemList?: Override<{$isChildNode?: boolean}>;
  TreeItem?: Override<{$isLeafNode?: boolean}>;
  TreeLabel?: Override<TreeLabelProps>;
}

export interface TreeLabelOverrides {
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
  [key: string]: any;
}

export interface TreeLabelProps {
  hasChildren: boolean;
  isExpanded?: boolean;
  label: ((node: TreeNode) => React.Node) | string;
  overrides?: TreeLabelOverrides;
  node: TreeNode;
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
  renderAll?: boolean;
  singleExpanded?: boolean;
}

export const Unstable_TreeView: React.FC<TreeViewProps>;

export const Unstable_StatefulTreeView: React.FC<TreeViewProps>;

export const TreeLabel: React.FC<TreeLabelProps>;

export const StyledTreeItemList: StyletronComponent<any>;
export const StyledTreeItem: StyletronComponent<any>;
export const StyledItemContent: StyletronComponent<any>;
export const StyledIconContainer: StyletronComponent<any>;
