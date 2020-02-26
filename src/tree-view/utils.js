/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {TreeNodeT, TreeNodeIdT} from './types.js';

const getLastLeafId = (node: TreeNodeT) => {
  if (node.isExpanded && node.children && node.children.length) {
    return getLastLeafId(node.children[node.children.length - 1]);
  }
  return node.id;
};

export const getParentId = (
  nodes: TreeNodeT[],
  nodeId: TreeNodeIdT,
  parentId: TreeNodeIdT | null,
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === nodeId) {
      return parentId;
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getParentId(nodes[i].children, nodeId, nodes[i].id);
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

export const getPrevId = (
  nodes: TreeNodeT[],
  nodeId: TreeNodeIdT,
  parentId: TreeNodeIdT | null,
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === nodeId) {
      if (i === 0) {
        return parentId;
      } else {
        return getLastLeafId(nodes[i - 1]);
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getPrevId(nodes[i].children, nodeId, nodes[i].id);
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

export const getFirstChildId = (nodes: TreeNodeT[], nodeId: TreeNodeIdT) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === nodeId) {
      if (
        nodes[i].isExpanded &&
        nodes[i].children &&
        nodes[i].children.length
      ) {
        return nodes[i].children[0].id;
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getFirstChildId(nodes[i].children, nodeId);
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

export const getNextId = (
  nodes: TreeNodeT[],
  nodeId: TreeNodeIdT,
  closestOmmer: TreeNodeIdT | null,
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === nodeId) {
      if (
        nodes[i].isExpanded &&
        nodes[i].children &&
        nodes[i].children.length
      ) {
        return nodes[i].children[0].id;
      } else if (nodes[i + 1]) {
        return nodes[i + 1].id;
      } else {
        return closestOmmer;
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getNextId(
        nodes[i].children,
        nodeId,
        nodes[i + 1] ? nodes[i + 1].id : closestOmmer,
      );
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

export const getEndId = (nodes: TreeNodeT[]) => {
  const endNode = nodes[nodes.length - 1];
  if (endNode.isExpanded && endNode.children && endNode.children.length) {
    return getEndId(endNode.children);
  }
  return endNode.id;
};

export const getExpandableSiblings = (
  nodes: TreeNodeT[],
  nodeId: TreeNodeIdT,
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].id === nodeId) {
      const expandableSiblings = [];
      for (let j = 0; j < nodes.length; j++) {
        if (
          !nodes[j].isExpanded &&
          nodes[j].children &&
          nodes[j].children.length
        ) {
          expandableSiblings.push(nodes[j]);
        }
      }
      return expandableSiblings;
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const result = getExpandableSiblings(nodes[i].children, nodeId);
      if (result.length) {
        return result;
      }
    }
  }
  return [];
};
