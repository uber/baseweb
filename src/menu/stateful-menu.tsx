/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable react/prefer-stateless-function */
import * as React from 'react';

import Menu from './menu';
import { NestedMenuContext } from './nested-menus';
import StatefulContainer from './stateful-container';

import type { StatefulMenuProps } from './types';

export default class StatefulMenu extends React.PureComponent<StatefulMenuProps> {
  render() {
    const { overrides, ...props } = this.props;
    return (
      <NestedMenuContext.Consumer>
        {(ctx) => (
          //$FlowExpectedError[cannot-spread-inexact]
          <StatefulContainer {...ctx} {...props}>
            {(renderProps) => <Menu {...renderProps} overrides={overrides} />}
          </StatefulContainer>
        )}
      </NestedMenuContext.Consumer>
    );
  }
}
