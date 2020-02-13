/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import {StyledTreeItemList, StyledTreeItem} from './styled-components.js';
import type {TreeNodePropsT} from './types.js';

import StyledTreeLabel from './tree-label.js';

import {getOverride, getOverrideProps} from '../helpers/overrides.js';

export default class TreeNode extends React.Component<TreeNodePropsT> {
  onToggle = () => {
    const {onToggle, node} = this.props;
    if (onToggle) {
      onToggle(node);
    }
  };

  render() {
    const {node, onToggle, overrides = {}, renderAll} = this.props;
    const {children, isExpanded, label} = node;
    const hasChildren = children && children.length !== 0;
    const {
      TreeItemList: TreeItemListOverride,
      TreeItem: TreeItemOverride,
      TreeLabel: TreeLabelOverride,
    } = overrides;
    const TreeItemList =
      getOverride(TreeItemListOverride) || StyledTreeItemList;
    const TreeItem = getOverride(TreeItemOverride) || StyledTreeItem;
    const TreeLabel = getOverride(TreeLabelOverride) || StyledTreeLabel;
    return (
      <TreeItem
        role="treeitem"
        aria-expanded={isExpanded ? true : false}
        $isLeafNode={!hasChildren}
        {...getOverrideProps(TreeItemOverride)}
      >
        <TreeLabel
          onClick={this.onToggle}
          node={node}
          hasChildren={hasChildren}
          isExpanded={isExpanded}
          label={label}
          overrides={overrides}
          {...getOverrideProps(TreeLabelOverride)}
        />
        {children && (isExpanded || renderAll) && (
          <TreeItemList
            role="group"
            $isChildNode={true}
            $expanded={!!isExpanded}
            {...getOverrideProps(TreeItemListOverride)}
          >
            {children.map((node, index) => (
              <TreeNode
                renderAll={renderAll}
                key={index}
                node={node}
                onToggle={onToggle}
                overrides={overrides}
              />
            ))}
          </TreeItemList>
        )}
      </TreeItem>
    );
  }
}
