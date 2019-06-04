/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {LayersManagerPropsT, LayersContextT} from './types.js';

export const {
  Provider,
  Consumer,
}: React.Context<LayersContextT> = React.createContext({});

export default class LayersManager extends React.Component<
  LayersManagerPropsT,
> {
  host: {current: HTMLDivElement | null} = React.createRef();

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    return (
      <Provider value={{host: this.host.current}}>
        <div>{this.props.children}</div>
        <div ref={this.host} />
      </Provider>
    );
  }
}
