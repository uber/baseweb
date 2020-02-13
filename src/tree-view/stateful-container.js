/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {StatefulContainerPropsT, TreeNodeT} from './types.js';

type StateType = {
  data: TreeNodeT[],
};

const findSiblings = (
  node: TreeNodeT,
  children: TreeNodeT[],
): ?(TreeNodeT[]) => {
  if (children.indexOf(node) !== -1) {
    return children;
  }
  for (let child of children) {
    if (child.children) {
      const siblings = findSiblings(node, child.children);
      if (siblings != null) {
        return siblings;
      }
    }
  }
  return null;
};

export default class StatefulContainer extends React.Component<
  StatefulContainerPropsT,
  StateType,
> {
  state: StateType;

  constructor(props: StatefulContainerPropsT) {
    super(props);
    this.state = {data: this.props.data};
  }

  onToggle = (node: TreeNodeT) => {
    const {onToggle, singleExpanded} = this.props;
    this.setState(
      prevState => {
        const shouldExpand = !node.isExpanded;
        if (singleExpanded && shouldExpand) {
          const siblings = findSiblings(node, prevState.data);
          if (siblings != null) {
            siblings.forEach(sibling => {
              if (sibling !== node) {
                sibling.isExpanded = false;
              }
            });
          }
        }
        node.isExpanded = shouldExpand;
        return {data: prevState.data};
      },
      () => {
        onToggle && onToggle(node);
      },
    );
  };

  render() {
    const {children, ...restProps} = this.props;
    const {onToggle} = this;
    return children({
      ...restProps,
      ...this.state,
      onToggle,
    });
  }
}
