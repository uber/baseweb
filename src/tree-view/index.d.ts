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
  LeafIconContainer?: Override<{}>;
  LeafIcon?: Override<{}>;
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
  indentGuides?: boolean;
}

export type StatefulContainerProps = TreeViewProps & {
  children: (props: TreeViewProps) => React.ReactNode;
};

export interface TreeViewProps {
  data: TreeNode[];
  indentGuides?: boolean;
  onToggle?: (node: TreeNode) => void;
  overrides?: TreeViewOverrides;
  getId?: (node: TreeNode) => number | string;
  renderAll?: boolean;
  singleExpanded?: boolean;
}

export const TreeView: React.FC<TreeViewProps>;

export const StatefulTreeView: React.FC<TreeViewProps>;

export const TreeLabel: React.FC<TreeLabelProps>;

export const StyledTreeItemList: StyletronComponent<any>;
export const StyledTreeItem: StyletronComponent<any>;
export const StyledItemContent: StyletronComponent<any>;
export const StyledIconContainer: StyletronComponent<any>;

type TGetId = (node: TreeNode) => string | number;
type toggleIsExpandedT = (
  data: TreeNode[],
  togggledNode: TreeNode,
  getId?: TGetId,
) => TreeNode[];

export const toggleIsExpanded: toggleIsExpandedT;
