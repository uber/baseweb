/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global document */
import React from 'react';
import ReactDOM from 'react-dom';
import {Consumer} from './layers-manager.js';
import type {LayerPropsT, LayerComponentPropsT, LayerStateT} from './types.js';

class LayerComponent extends React.Component<
  LayerComponentPropsT,
  LayerStateT,
> {
  state = {container: null};

  componentDidMount() {
    const {host = document.body, index, onMount} = this.props;
    if (host) {
      const container = host.ownerDocument.createElement('div');
      const sibling = typeof index === 'number' ? host.children[index] : null;
      sibling
        ? host.insertBefore(container, sibling)
        : host.appendChild(container);
      this.setState({container}, () => {
        onMount && onMount();
      });
    }
  }

  componentWillUnmount() {
    const {container} = this.state;
    const {host, onUnmount} = this.props;
    onUnmount && onUnmount();
    host && container && host.removeChild(container);
  }

  render() {
    const {container} = this.state;
    const {children, mountNode} = this.props;
    if (__BROWSER__) {
      if (mountNode || container) {
        // $FlowFixMe
        return ReactDOM.createPortal(children, mountNode || container);
      }
      return null;
    }
    return null;
  }
}

export default function Layer(props: LayerPropsT) {
  return (
    <Consumer>{({host}) => <LayerComponent {...props} host={host} />}</Consumer>
  );
}
