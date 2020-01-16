/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';

import Menu from './menu.js';
import {NestedMenuContext} from './nested-menus.js';
import StatefulContainer from './stateful-container.js';

import type {StatefulMenuPropsT} from './types.js';

export default class StatefulMenu extends React.PureComponent<StatefulMenuPropsT> {
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
