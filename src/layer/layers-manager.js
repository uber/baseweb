/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {LayersManagerPropsT, LayersContexT} from './types.js';

export const {Provider, Consumer}: React.Context<LayersContexT> = React.createContext({root: null, host: null});

export default class LayersManager extends React.Component<
  LayersManagerPropsT,
> {
  root: {current: ?HTMLElement} = React.createRef();
  host: {current: ?HTMLElement} = React.createRef();

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    return (
      <Provider value={{root: this.root.current, host: this.host.current}}>
        <div data-test="root" ref={this.root}>
          {this.props.children}
        </div>
        <div data-test="host" ref={this.host} />
      </Provider>
    );
  }
}
