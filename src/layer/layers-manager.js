/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {styled} from '../styles/index.js';
import {getOverrides} from '../helpers/overrides.js';
import type {LayersManagerPropsT, LayersContextT} from './types.js';

const StyledAppContainer = styled('div', {});
const StyledLayersContainer = styled('div', {});

export const {
  Provider,
  Consumer,
}: React.Context<LayersContextT> = React.createContext({});

export default class LayersManager extends React.Component<LayersManagerPropsT> {
  host: {
    // eslint-disable-next-line flowtype/no-weak-types
    current: React.ElementRef<any> | null,
  } = React.createRef();

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    const {overrides = {}} = this.props;
    const [AppContainer, appContainerProps] = getOverrides(
      overrides.AppContainer,
      StyledAppContainer,
    );
    const [LayersContainer, layersContainerProps] = getOverrides(
      overrides.LayersContainer,
      StyledLayersContainer,
    );
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
              <AppContainer {...appContainerProps}>
                {this.props.children}
              </AppContainer>
              <LayersContainer {...layersContainerProps} ref={this.host} />
            </Provider>
          );
        }}
      </Consumer>
    );
  }
}
