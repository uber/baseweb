/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global document */
import * as React from 'react';
import ReactDOM from 'react-dom';
import {styled} from '../styles/index.js';
import {Consumer} from './layers-manager.js';
import type {LayerPropsT, LayerComponentPropsT, LayerStateT} from './types.js';

const Container = styled<{$zIndex?: number}>('div', ({$zIndex}) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: $zIndex || null,
}));

class LayerComponent extends React.Component<
  LayerComponentPropsT,
  LayerStateT,
> {
  state = {container: null};

  componentDidMount() {
    const {onMount, mountNode} = this.props;
    if (mountNode) {
      onMount && onMount();
      return;
    }
    // There was no LayersManager added if this.props.host === undefined.
    // Use document.body is the case no LayersManager is used.
    const host =
      this.props.host !== undefined ? this.props.host : document.body;
    if (host) {
      this.addContainer(host);
    }
  }

  componentDidUpdate(prevProps) {
    const {host, mountNode} = this.props;
    if (mountNode) {
      return;
    }
    if (host && host !== prevProps.host && prevProps.host === null) {
      this.addContainer(host);
    }
  }

  componentWillUnmount() {
    const {container} = this.state;
    const {host, onUnmount} = this.props;
    onUnmount && onUnmount();
    host &&
      container &&
      host.contains(container) &&
      host.removeChild(container);
  }

  addContainer(host) {
    const {index, mountNode, onMount} = this.props;
    // Do nothing if mountNode is provided
    if (mountNode) {
      return;
    }
    if (host) {
      const container = host.ownerDocument.createElement('div');
      const sibling =
        typeof index === 'number'
          ? React.Children.toArray(host.children)[index]
          : null;
      sibling
        ? host.insertBefore(container, sibling)
        : host.appendChild(container);
      this.setState({container}, () => {
        onMount && onMount();
      });
    }
  }

  render() {
    const {container} = this.state;
    const {children, mountNode, zIndex} = this.props;
    // Only adding an additional wrapper when a layer has z-index to be set
    const childrenToRender = zIndex ? (
      <Container $zIndex={zIndex}>{children}</Container>
    ) : (
      children
    );
    if (__BROWSER__) {
      if (mountNode || container) {
        // $FlowFixMe
        return ReactDOM.createPortal(childrenToRender, mountNode || container);
      }
      return null;
    }
    return null;
  }
}

export default function Layer(props: LayerPropsT) {
  return (
    <Consumer>
      {({host, zIndex}) => (
        <LayerComponent {...props} host={host} zIndex={zIndex} />
      )}
    </Consumer>
  );
}
