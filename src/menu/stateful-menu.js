/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';

import Menu from './menu.js';
import {NestedMenuContext} from './nested-menus.js';
import StatefulContainer from './stateful-container.js';

import type {StatefulMenuPropsT, StateReducerFnT} from './types.js';

export default class StatefulMenu extends React.PureComponent<
  StatefulMenuPropsT,
> {
  static defaultProps = {
    // Mostly to satisfy flow
    initialState: {
      isFocused: false,
      // We start the index at -1 to indicate that no highlighting exists initially
      highlightedIndex: -1,
    },
    stateReducer: (
      changeType: ?$PropertyType<StateReducerFnT, 'changeType'>,
      changes: $PropertyType<StateReducerFnT, 'changes'>,
    ) => changes,
    onItemSelect: () => {},
    getRequiredItemProps: () => ({}),
    children: () => null,
    overrides: {},
  };

  render() {
    const {overrides, ...props} = this.props;
    return (
      <NestedMenuContext.Consumer>
        {ctx => (
          <StatefulContainer {...ctx} {...props}>
            {renderProps => <Menu {...renderProps} overrides={overrides} />}
          </StatefulContainer>
        )}
      </NestedMenuContext.Consumer>
    );
  }
}
