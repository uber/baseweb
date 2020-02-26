/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {TreeNodeT, TreeNodeIdT} from './types.js';

const getLastLeafId = (node: TreeNodeT, nodeToId: TreeNodeT => TreeNodeIdT) => {
  if (node.isExpanded && node.children && node.children.length) {
    return getLastLeafId(node.children[node.children.length - 1], nodeToId);
  }
  return nodeToId(node);
};

export const getParentId = (
  nodes: TreeNodeT[],
  nodeId: TreeNodeIdT,
  parentId: TreeNodeIdT | null,
  nodeToId: TreeNodeT => TreeNodeIdT,
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodeToId(nodes[i]) === nodeId) {
      return parentId;
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getParentId(
        nodes[i].children,
        nodeId,
        nodeToId(nodes[i]),
        nodeToId,
      );
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
  nodeToId: TreeNodeT => TreeNodeIdT,
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodeToId(nodes[i]) === nodeId) {
      if (i === 0) {
        return parentId;
      } else {
        return getLastLeafId(nodes[i - 1], nodeToId);
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getPrevId(
        nodes[i].children,
        nodeId,
        nodeToId(nodes[i]),
        nodeToId,
      );
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

export const getFirstChildId = (
  nodes: TreeNodeT[],
  nodeId: TreeNodeIdT,
  nodeToId: TreeNodeT => TreeNodeIdT,
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodeToId(nodes[i]) === nodeId) {
      if (
        nodes[i].isExpanded &&
        nodes[i].children &&
        nodes[i].children.length
      ) {
        return nodeToId(nodes[i].children[0]);
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getFirstChildId(nodes[i].children, nodeId, nodeToId);
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
  nodeToId: TreeNodeT => TreeNodeIdT,
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodeToId(nodes[i]) === nodeId) {
      if (
        nodes[i].isExpanded &&
        nodes[i].children &&
        nodes[i].children.length
      ) {
        return nodeToId(nodes[i].children[0]);
      } else if (nodes[i + 1]) {
        return nodeToId(nodes[i + 1]);
      } else {
        return closestOmmer;
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getNextId(
        nodes[i].children,
        nodeId,
        nodes[i + 1] ? nodeToId(nodes[i + 1]) : closestOmmer,
        nodeToId,
      );
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

export const getEndId = (
  nodes: TreeNodeT[],
  nodeToId: TreeNodeT => TreeNodeIdT,
) => {
  const endNode = nodes[nodes.length - 1];
  if (endNode.isExpanded && endNode.children && endNode.children.length) {
    return getEndId(endNode.children, nodeToId);
  }
  return nodeToId(endNode);
};

export const getExpandableSiblings = (
  nodes: TreeNodeT[],
  nodeId: TreeNodeIdT,
  nodeToId: TreeNodeT => TreeNodeIdT,
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodeToId(nodes[i]) === nodeId) {
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
      const result = getExpandableSiblings(nodes[i].children, nodeId, nodeToId);
      if (result.length) {
        return result;
      }
    }
  }
  return [];
};

export const createNodeToId = (getId?: (node: TreeNodeT) => TreeNodeIdT) => (
  node: TreeNodeT,
): TreeNodeIdT => {
  if (getId) {
    return getId(node);
  }
  if (node.id) {
    return node.id;
  }
  if (__DEV__) {
    console.warn(
      'All data nodes need to have set an unique `id` property or top-level getId function needs to be defined.',
    );
  }
  return '';
};

export const toggleIsExpanded = (
  arr: TreeNodeT[],
  toggledNode: TreeNodeT,
  getId?: (node: TreeNodeT) => TreeNodeIdT = (node: TreeNodeT) =>
    node.id ? node.id : '',
): TreeNodeT[] => {
  return arr.map<TreeNodeT>(node => {
    const newNode = {...node};
    if (getId(newNode) === getId(toggledNode)) {
      newNode.isExpanded = !newNode.isExpanded;
    }
    if (newNode.children && newNode.children.length) {
      newNode.children = toggleIsExpanded(newNode.children, toggledNode);
    }
    return newNode;
  });
};
