import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

export interface StyleProps {
  $isChildNode?: boolean;
  $isLeafNode?: boolean;
}

export interface TreeViewOverrides<T> {
  Root?: Override<T>;
  TreeItemList?: Override<T>;
  TreeItem?: Override<T>;
  TreeItemContent?: Override<T>;
  IconContainer?: Override<T>;
  ExpandIcon?: Override<T>;
  CollapseIcon?: Override<T>;
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
  overrides?: TreeViewOverrides<StyleProps>;
}

export type StatefulContainerProps = TreeViewProps & {
  children: (props: TreeViewProps) => React.ReactNode;
};

export interface TreeViewProps {
  data: TreeNode[];
  onToggle?: (node: TreeNode) => void;
  overrides?: TreeViewOverrides<StyleProps>;
}

export const Unstable_TreeView: React.FC<TreeViewProps>;

export const Unstable_StatefulTreeView: React.FC<TreeViewProps>;

export const StyledTreeItemList: StyletronComponent<any>;
export const StyledTreeItem: StyletronComponent<any>;
export const StyledItemContent: StyletronComponent<any>;
export const StyledIconContainer: StyletronComponent<any>;
