/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {TreeNodeT, TreeNodeIdT} from './types.js';

const getLastLeafId = (
  node: TreeNodeT<>,
  getId: (TreeNodeT<>) => TreeNodeIdT,
) => {
  if (node.isExpanded && node.children && node.children.length) {
    return getLastLeafId(node.children[node.children.length - 1], getId);
  }
  return getId(node);
};

export const getParentId = (
  nodes: TreeNodeT<>[],
  nodeId: TreeNodeIdT,
  parentId: TreeNodeIdT | null,
  getId: (TreeNodeT<>) => TreeNodeIdT,
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (getId(nodes[i]) === nodeId) {
      return parentId;
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getParentId(
        nodes[i].children,
        nodeId,
        getId(nodes[i]),
        getId,
      );
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

export const getPrevId = (
  nodes: TreeNodeT<>[],
  nodeId: TreeNodeIdT,
  parentId: TreeNodeIdT | null,
  getId: (TreeNodeT<>) => TreeNodeIdT,
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (getId(nodes[i]) === nodeId) {
      if (i === 0) {
        return parentId;
      } else {
        return getLastLeafId(nodes[i - 1], getId);
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getPrevId(
        nodes[i].children,
        nodeId,
        getId(nodes[i]),
        getId,
      );
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

export const getFirstChildId = (
  nodes: TreeNodeT<>[],
  nodeId: TreeNodeIdT,
  getId: (TreeNodeT<>) => TreeNodeIdT,
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (getId(nodes[i]) === nodeId) {
      if (
        nodes[i].isExpanded &&
        nodes[i].children &&
        nodes[i].children.length
      ) {
        return getId(nodes[i].children[0]);
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getFirstChildId(nodes[i].children, nodeId, getId);
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

export const getNextId = (
  nodes: TreeNodeT<>[],
  nodeId: TreeNodeIdT,
  closestOmmer: TreeNodeIdT | null,
  getId: (TreeNodeT<>) => TreeNodeIdT,
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (getId(nodes[i]) === nodeId) {
      if (
        nodes[i].isExpanded &&
        nodes[i].children &&
        nodes[i].children.length
      ) {
        return getId(nodes[i].children[0]);
      } else if (nodes[i + 1]) {
        return getId(nodes[i + 1]);
      } else {
        return closestOmmer;
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = getNextId(
        nodes[i].children,
        nodeId,
        nodes[i + 1] ? getId(nodes[i + 1]) : closestOmmer,
        getId,
      );
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

export const getEndId = (
  nodes: TreeNodeT<>[],
  getId: (TreeNodeT<>) => TreeNodeIdT,
) => {
  const endNode = nodes[nodes.length - 1];
  if (endNode.isExpanded && endNode.children && endNode.children.length) {
    return getEndId(endNode.children, getId);
  }
  return getId(endNode);
};

export const getExpandableSiblings = (
  nodes: TreeNodeT<>[],
  nodeId: TreeNodeIdT,
  getId: (TreeNodeT<>) => TreeNodeIdT,
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (getId(nodes[i]) === nodeId) {
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
      const result = getExpandableSiblings(nodes[i].children, nodeId, getId);
      if (result.length) {
        return result;
      }
    }
  }
  return [];
};

export const toggleIsExpanded = (
  arr: TreeNodeT<>[],
  toggledNode: TreeNodeT<>,
  getId?: (node: TreeNodeT<>) => TreeNodeIdT = (node: TreeNodeT<>) =>
    node.id ? node.id : '',
): TreeNodeT<>[] => {
  return arr.map<TreeNodeT<>>(node => {
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
export const getCharMatchId = (
  nodes: TreeNodeT<>[],
  nodeId: TreeNodeIdT,
  chars: string,
  closestOmmer: TreeNodeIdT | null,
  getId: (TreeNodeT<>) => TreeNodeIdT,
) => {
  var foundid = matchString(nodes, nodeId, chars, closestOmmer, getId, true);
  if (foundid) return foundid;
  foundid = matchString(nodes, nodeId, chars, closestOmmer, getId, false);
  return foundid;
};

export const matchString = (
  nodes: TreeNodeT<>[],
  nodeId: TreeNodeIdT,
  chars: string,
  closestOmmer: TreeNodeIdT | null,
  getId: (TreeNodeT<>) => TreeNodeIdT,
  //set true, match the prefix; set false, match full text
  matchPrefix: boolean,
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].label && typeof nodes[i].label === 'string') {
      if (
        (matchPrefix &&
          nodes[i].label.toUpperCase().indexOf(chars.toUpperCase()) === 0) ||
        (!matchPrefix &&
          nodes[i].label.toUpperCase().indexOf(chars.toUpperCase()) > 0)
      ) {
        return getId(nodes[i]);
      }
    }
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      const foundId = matchString(
        nodes[i].children,
        nodeId,
        chars,
        nodes[i + 1] ? getId(nodes[i + 1]) : closestOmmer,
        getId,
        matchPrefix,
      );

      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

export const defaultGetId = (node: TreeNodeT<>) => {
  if (!node.id) {
    throw Error(
      'There needs to be an unique node.id. You can implement a custom mapping with getId.',
    );
  }
  return node.id;
};
