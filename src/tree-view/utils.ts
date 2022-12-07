/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { TreeNodeData, TreeNodeId } from './types';

// @ts-ignore
const getLastLeafId = (node: TreeNodeData, getId: (a: TreeNodeData) => TreeNodeId) => {
  if (node.isExpanded && node.children && node.children.length) {
    return getLastLeafId(node.children[node.children.length - 1], getId);
  }
  return getId(node);
};

// @ts-ignore
export const getParentId = (
  nodes: TreeNodeData[],
  nodeId: TreeNodeId,
  parentId: TreeNodeId | null,
  getId: (a: TreeNodeData) => TreeNodeId
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (getId(nodes[i]) === nodeId) {
      return parentId;
    }
    // @ts-ignore
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      // @ts-ignore
      const foundId = getParentId(nodes[i].children, nodeId, getId(nodes[i]), getId);
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

// @ts-ignore
export const getPrevId = (
  nodes: TreeNodeData[],
  nodeId: TreeNodeId,
  parentId: TreeNodeId | null,
  getId: (a: TreeNodeData) => TreeNodeId
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (getId(nodes[i]) === nodeId) {
      if (i === 0) {
        return parentId;
      } else {
        return getLastLeafId(nodes[i - 1], getId);
      }
    }
    // @ts-ignore
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      // @ts-ignore
      const foundId = getPrevId(nodes[i].children, nodeId, getId(nodes[i]), getId);
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

// @ts-ignore
export const getFirstChildId = (
  nodes: TreeNodeData[],
  nodeId: TreeNodeId,
  getId: (a: TreeNodeData) => TreeNodeId
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (getId(nodes[i]) === nodeId) {
      // @ts-ignore
      if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
        // @ts-ignore
        return getId(nodes[i].children[0]);
      }
    }
    // @ts-ignore
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      // @ts-ignore
      const foundId = getFirstChildId(nodes[i].children, nodeId, getId);
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

// @ts-ignore
export const getNextId = (
  nodes: TreeNodeData[],
  nodeId: TreeNodeId,
  closestOmmer: TreeNodeId | null,
  getId: (a: TreeNodeData) => TreeNodeId
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (getId(nodes[i]) === nodeId) {
      // @ts-ignore
      if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
        // @ts-ignore
        return getId(nodes[i].children[0]);
      } else if (nodes[i + 1]) {
        return getId(nodes[i + 1]);
      } else {
        return closestOmmer;
      }
    }
    // @ts-ignore
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      // @ts-ignore
      const foundId = getNextId(
        // @ts-ignore
        nodes[i].children,
        nodeId,
        nodes[i + 1] ? getId(nodes[i + 1]) : closestOmmer,
        getId
      );
      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

// @ts-ignore
export const getEndId = (nodes: TreeNodeData[], getId: (a: TreeNodeData) => TreeNodeId) => {
  const endNode = nodes[nodes.length - 1];
  if (endNode.isExpanded && endNode.children && endNode.children.length) {
    return getEndId(endNode.children, getId);
  }
  return getId(endNode);
};

// @ts-ignore
export const getExpandableSiblings = (
  nodes: TreeNodeData[],
  nodeId: TreeNodeId,
  getId: (a: TreeNodeData) => TreeNodeId
) => {
  for (let i = 0; i < nodes.length; i++) {
    if (getId(nodes[i]) === nodeId) {
      const expandableSiblings = [];
      for (let j = 0; j < nodes.length; j++) {
        // @ts-ignore
        if (!nodes[j].isExpanded && nodes[j].children && nodes[j].children.length) {
          // @ts-ignore
          expandableSiblings.push(nodes[j]);
        }
      }
      return expandableSiblings;
    }
    // @ts-ignore
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      // @ts-ignore
      const result = getExpandableSiblings(nodes[i].children, nodeId, getId);
      if (result.length) {
        return result;
      }
    }
  }
  return [];
};

export const toggleIsExpanded = (
  arr: TreeNodeData[],
  toggledNode: TreeNodeData,
  getId: (node: TreeNodeData) => TreeNodeId = (node: TreeNodeData) => (node.id ? node.id : '')
): TreeNodeData[] => {
  return arr.map<TreeNodeData>((node) => {
    const newNode = { ...node };
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
  nodes: TreeNodeData[],
  nodeId: TreeNodeId,
  chars: string,
  closestOmmer: TreeNodeId | null,
  getId: (a: TreeNodeData) => TreeNodeId
) => {
  var foundid = matchString(nodes, nodeId, chars, closestOmmer, getId, true);
  if (foundid) return foundid;
  foundid = matchString(nodes, nodeId, chars, closestOmmer, getId, false);
  return foundid;
};

// @ts-ignore
export const matchString = (
  nodes: TreeNodeData[],
  nodeId: TreeNodeId,
  chars: string,
  closestOmmer: TreeNodeId | null,
  getId: (a: TreeNodeData) => TreeNodeId,
  //set true, match the prefix; set false, match full text
  matchPrefix: boolean
) => {
  for (let i = 0; i < nodes.length; i++) {
    let label = nodes[i].label;
    if (label && typeof label === 'string') {
      if (
        (matchPrefix && label.toUpperCase().indexOf(chars.toUpperCase()) === 0) ||
        (!matchPrefix && label.toUpperCase().indexOf(chars.toUpperCase()) > 0)
      ) {
        return getId(nodes[i]);
      }
    }
    // @ts-ignore
    if (nodes[i].isExpanded && nodes[i].children && nodes[i].children.length) {
      // @ts-ignore
      const foundId = matchString(
        // @ts-ignore
        nodes[i].children,
        nodeId,
        chars,
        nodes[i + 1] ? getId(nodes[i + 1]) : closestOmmer,
        getId,
        matchPrefix
      );

      if (foundId) {
        return foundId;
      }
    }
  }
  return null;
};

export const defaultGetId = (node: TreeNodeData): TreeNodeId => {
  if (!node.id) {
    throw Error(
      'There needs to be an unique node.id. You can implement a custom mapping with getId.'
    );
  }
  return node.id;
};
