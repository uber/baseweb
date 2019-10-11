/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import TreeNode from './tree-node.js';
import {StyledTreeItemList} from './styled-components.js';
import type {TreeViewPropsT} from './types.js';

import {getOverride, getOverrideProps} from '../helpers/overrides.js';

export default function TreeView(props: TreeViewPropsT) {
  const {data, isChildNode, onToggle, overrides = {}} = props;
  const {Root: RootOverride, TreeItemList: TreeItemListOverride} = overrides;

  const Root = getOverride(RootOverride) || StyledTreeItemList;
  const TreeItemList = getOverride(TreeItemListOverride) || StyledTreeItemList;

  return (
    <React.Fragment>
      {isChildNode ? (
        <TreeItemList
          role="group"
          $isChildNode={true}
          {...getOverrideProps(TreeItemListOverride)}
        >
          {data.length &&
            data.map((node, index) => (
              <TreeNode
                key={index}
                node={node}
                onToggle={onToggle}
                overrides={overrides}
              />
            ))}
        </TreeItemList>
      ) : (
        <Root role="tree" {...getOverrideProps(RootOverride)}>
          {data.length &&
            data.map((node, index) => (
              <TreeNode
                key={index}
                node={node}
                onToggle={onToggle}
                overrides={overrides}
              />
            ))}
        </Root>
      )}
    </React.Fragment>
  );
}
