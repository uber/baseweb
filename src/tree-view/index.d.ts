import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

export interface StyleProps {
  $isChildNode?: boolean;
}

export interface TreeViewOverrides {
  Root?: Override<StyleProps>;
  TreeItemList?: Override<StyleProps>;
  TreeItem?: Override<StyleProps>;
  TreeItemContent?: Override<StyleProps>;
  IconContainer?: Override<StyleProps>;
  ExpandIcon?: Override<StyleProps>;
  CollapseIcon?: Override<StyleProps>;
}

export interface TreeNode {
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
  isChildNode?: boolean;
  onToggle?: (node: TreeNode) => void;
  overrides?: TreeViewOverrides;
}

export const Unstable_TreeView: React.FC<TreeViewProps>;

export const Unstable_StatefulTreeView: React.FC<TreeViewProps>;

export const StyledTreeItemList: StyletronComponent<any>;
export const StyledTreeItem: StyletronComponent<any>;
export const StyledItemContent: StyletronComponent<any>;
export const StyledIconContainer: StyletronComponent<any>;
