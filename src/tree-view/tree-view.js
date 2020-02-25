/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import TreeNode from './tree-node.js';
import {StyledTreeItemList} from './styled-components.js';
import {getPrevId, getNextId} from './utils';
import type {TreeViewPropsT, TreeNodeT} from './types.js';

import {getOverride, getOverrideProps} from '../helpers/overrides.js';

export default function TreeView(props: TreeViewPropsT) {
  const {data, onToggle, overrides = {}, renderAll} = props;
  const {Root: RootOverride} = overrides;

  const Root = getOverride(RootOverride) || StyledTreeItemList;
  const firstId = data.length && data[0].id;
  const [focusedNodeId, setFocusedNodeId] = React.useState(firstId);

  //   eslint-disable-next-line flowtype/no-weak-types
  const onKeyDown = (e: KeyboardEvent, node: TreeNodeT) => {
    console.log(e.key, node);
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevId = getPrevId(data, focusedNodeId, null);
        setFocusedNodeId(prevId);
        break;
      case 'ArrowDown':
        e.preventDefault();
        const nextId = getNextId(data, focusedNodeId, null);
        setFocusedNodeId(nextId);
        break;
      case ' ':
      case 'Enter':
        e.preventDefault();
        onToggle && onToggle(node);
        break;
      case 'Home':
        e.preventDefault();
        break;
      case 'End':
        e.preventDefault();
        break;
      case '*':
        e.preventDefault();
        break;
    }
  };

  const onFocus = (event: SyntheticEvent<>) => {
    if (focusedNodeId === null && data.length) {
      setFocusedNodeId(data[0].id);
    }
  };

  const onBlur = (event: SyntheticEvent<>) => {
    //setFocusedNodeId(null);
  };

  console.log('focused node ', focusedNodeId);

  return (
    <Root role="tree" {...getOverrideProps(RootOverride)}>
      {data.length &&
        data.map((node, index) => (
          <TreeNode
            key={index}
            node={node}
            onToggle={onToggle}
            overrides={overrides}
            renderAll={renderAll}
            focusedNodeId={focusedNodeId}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        ))}
    </Root>
  );
}
