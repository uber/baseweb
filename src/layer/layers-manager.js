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
      <Consumer>
        {({host}) => {
          if (__DEV__) {
            if (host !== undefined) {
              // eslint-disable-next-line no-console
              console.warn(
                'There is a LayersManager already exists in your application. It is not recommended to have more than one LayersManager in an application.',
              );
            }
          }
          return (
            <Provider
              value={{
                host: host || this.host.current,
                zIndex: this.props.zIndex,
              }}
            >
              <div>{this.props.children}</div>
              <div ref={this.host} />
            </Provider>
          );
        }}
      </Consumer>
    );
  }
}
