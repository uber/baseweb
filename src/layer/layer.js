/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import {Consumer} from './layers-manager.js';

class LayerComponent extends React.Component<{}, {container: ?HTMLElement}> {
  isTop = true;
  state = {container: null};

  componentDidMount() {
    const {host, index} = this.props;
    const container = host.ownerDocument.createElement('div');
    const sibling = typeof index === 'number' && host.children[index];
    sibling
      ? host.insertBefore(container, sibling)
      : host.appendChild(container);
  }

  componentWillUnmount() {
    const {container} = this.state;
    const {host} = this.props;
    host && container && host.removeChild(container);
  }

  getIsTop = () => {
    return this.isTop;
  };

  render() {
    const {container} = this.state;
    if (__BROWSER__) {
      return container
        ? ReactDOM.createPortal(this.props.children, container)
        : null;
    }
    return null;
  }
}

export default function Layer(props) {
  return (
    <Consumer>{({host}) => <LayerComponent {...props} host={host} />}</Consumer>
  );
}
