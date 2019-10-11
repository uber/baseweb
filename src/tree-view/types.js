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
};

export type TreeViewOverridesT = {
  Root?: OverrideT<StylePropsT>,
  TreeItemList?: OverrideT<StylePropsT>,
  TreeItem?: OverrideT<StylePropsT>,
  TreeItemContent?: OverrideT<StylePropsT>,
  IconContainer?: OverrideT<StylePropsT>,
  ExpandIcon?: OverrideT<StylePropsT>,
  CollapseIcon?: OverrideT<StylePropsT>,
};

export type TreeNodeT = {
  children?: TreeNodeT[],
  isExpanded?: boolean,
  label: ((node: TreeNodeT) => React.Node) | string,
  // eslint-disable-next-line flowtype/no-weak-types
  info?: any,
};

export type TreeNodePropsT = {
  node: TreeNodeT,
  onToggle?: (node: TreeNodeT) => void,
  overrides?: TreeViewOverridesT,
};

export type StatefulContainerPropsT = {
  ...TreeViewPropsT,
  children: (props: TreeViewPropsT) => React.Node,
};

export type TreeViewPropsT = {|
  data: TreeNodeT[],
  isChildNode?: boolean,
  onToggle?: (node: TreeNodeT) => void,
  overrides?: TreeViewOverridesT,
|};
