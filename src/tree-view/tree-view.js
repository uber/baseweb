/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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
  const {data, onToggle, overrides = {}} = props;
  const {Root: RootOverride} = overrides;

  const Root = getOverride(RootOverride) || StyledTreeItemList;

  return (
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
  );
}
