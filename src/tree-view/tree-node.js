/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import CheckIndeterminateIcon from '../icon/check-indeterminate.js';
import PlusIcon from '../icon/plus.js';

import {
  StyledIconContainer,
  StyledItemContent,
  StyledTreeItem,
} from './styled-components.js';
import TreeView from './tree-view.js';
import type {TreeNodePropsT} from './types.js';

import {getOverride, getOverrideProps} from '../helpers/overrides.js';

export default class TreeNode extends React.Component<TreeNodePropsT> {
  onToggle = () => {
    const {onToggle, node} = this.props;
    if (onToggle) {
      onToggle(node);
    }
  };

  render() {
    const {node, onToggle, overrides = {}} = this.props;
    const {children, isExpanded, label} = node;
    const hasChildren = children && children.length !== 0;
    const {
      TreeItem: TreeItemOverride,
      TreeItemContent: TreeItemContentOverride,
      IconContainer: IconContainerOverride,
      ExpandIcon: ExapandIconOverride,
      CollapseIcon: CollapseIconOverride,
    } = overrides;
    const TreeItem = getOverride(TreeItemOverride) || StyledTreeItem;
    const TreeItemContent =
      getOverride(TreeItemContentOverride) || StyledItemContent;
    const IconContainer =
      getOverride(IconContainerOverride) || StyledIconContainer;
    const ExpandIcon = getOverride(ExapandIconOverride) || PlusIcon;
    const CollapseIcon =
      getOverride(CollapseIconOverride) || CheckIndeterminateIcon;
    return (
      <TreeItem
        role={hasChildren ? 'treeitem' : 'none'}
        aria-expanded={isExpanded ? true : false}
        {...getOverrideProps(TreeItemOverride)}
      >
        <TreeItemContent
          onClick={this.onToggle}
          {...getOverrideProps(TreeItemContentOverride)}
        >
          {hasChildren && (
            <IconContainer {...getOverrideProps(IconContainerOverride)}>
              {!isExpanded ? (
                <ExpandIcon {...getOverrideProps(ExapandIconOverride)} />
              ) : (
                <CollapseIcon {...getOverrideProps(CollapseIconOverride)} />
              )}
            </IconContainer>
          )}
          {typeof label === 'function' ? label(node) : label}
        </TreeItemContent>
        {children && isExpanded && (
          <TreeView
            data={children}
            onToggle={onToggle}
            overrides={overrides}
            isChildNode={true}
          />
        )}
      </TreeItem>
    );
  }
}
