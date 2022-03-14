/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global document */
import * as React from 'react';
import ReactDOM from 'react-dom';
import {styled} from '../styles/index.js';
import {LayersContext, Consumer} from './layers-manager.js';
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
  static contextType: typeof LayersContext = LayersContext;

  state = {container: null};

  componentDidMount() {
    this.context.addEscapeHandler(this.onEscape);
    if (!this.props.isHoverLayer) {
      this.context.addDocClickHandler(this.onDocumentClick);
    }

    const {onMount, mountNode, host: layersManagerHost} = this.props;
    if (mountNode) {
      onMount && onMount();
      return;
    }

    // There was no LayersManager added if this.props.host === undefined.
    // Use document.body is the case no LayersManager is used.
    const hasLayersManager = layersManagerHost !== undefined;
    if (__DEV__) {
      if (!hasLayersManager) {
        console.warn(
          '`LayersManager` was not found. This occurs if you are attempting to use a component requiring `Layer` without using the `BaseProvider` at the root of your app. Please visit https://baseweb.design/components/base-provider/ for more information',
        );
      }
    }
    const host = hasLayersManager ? layersManagerHost : document.body;
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

    if (prevProps.isHoverLayer != this.props.isHoverLayer) {
      if (this.props.isHoverLayer) {
        this.context.removeDocClickHandler(this.onDocumentClick);
      } else {
        this.context.addDocClickHandler(this.onDocumentClick);
      }
    }
  }

  componentWillUnmount() {
    this.context.removeEscapeHandler(this.onEscape);
    this.context.removeDocClickHandler(this.onDocumentClick);

    if (this.props.onUnmount) {
      this.props.onUnmount();
    }

    const host = this.props.host;
    const container = this.state.container;
    if (host && container) {
      if (host.contains(container)) {
        host.removeChild(container);
      }
    }
  }

  onEscape = () => {
    if (this.props.onEscape) {
      this.props.onEscape();
    }
  };

  onDocumentClick = (event: MouseEvent) => {
    if (this.props.onDocumentClick) {
      this.props.onDocumentClick(event);
    }
  };

  addContainer(host) {
    const {index, mountNode, onMount} = this.props;
    // Do nothing if mountNode is provided
    if (mountNode) {
      return;
    }
    if (host) {
      const container = host.ownerDocument.createElement('div');
      // `host` is an DOM node, but not a React component
      const sibling = typeof index === 'number' ? host.children[index] : null;
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
      if (mountNode) {
        return ReactDOM.createPortal(childrenToRender, mountNode);
      } else if (container) {
        return ReactDOM.createPortal(childrenToRender, container);
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
