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
    const {onToggle} = this.props;
    this.setState(
      prevState => {
        node.isExpanded = !node.isExpanded;
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
