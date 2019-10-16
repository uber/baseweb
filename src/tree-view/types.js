/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';

export type StylePropsT = {
  $isChildNode?: boolean,
  $isLeafNode?: boolean,
};

export type TreeViewOverridesT<T> = {
  Root?: OverrideT<T>,
  TreeItemList?: OverrideT<T>,
  TreeItem?: OverrideT<T>,
  TreeItemContent?: OverrideT<T>,
  IconContainer?: OverrideT<T>,
  ExpandIcon?: OverrideT<T>,
  CollapseIcon?: OverrideT<T>,
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
  overrides?: TreeViewOverridesT<StylePropsT>,
};

export type StatefulContainerPropsT = {
  ...TreeViewPropsT,
  children: (props: TreeViewPropsT) => React.Node,
};

export type TreeViewPropsT = {|
  data: TreeNodeT[],
  onToggle?: (node: TreeNodeT) => void,
  overrides?: TreeViewOverridesT<StylePropsT>,
|};
