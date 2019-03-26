/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React, {createContext} from 'react';

export const {Provider, Consumer} = createContext();

export default class LayersManager extends React.Component {
  root = React.createRef();
  host = React.createRef();

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    return (
      <Provider value={{root: this.root.current, host: this.host.current}}>
        <div ref={this.root}>{this.props.children}</div>
        <div ref={this.host} />
      </Provider>
    );
  }
}
