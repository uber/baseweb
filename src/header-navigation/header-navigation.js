/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

import {getOverrides} from '../helpers/overrides.js';
import type {PropsT} from './types.js';
import {Root as StyledRoot} from './styled-components.js';

class HeaderNavigation extends React.Component<PropsT, {}> {
  static defaultProps = {
    overrides: {},
  };
  render() {
    const {overrides, ...restProps} = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    return (
      <Root
        data-baseweb="header-navigation"
        role="navigation"
        {...restProps}
        {...rootProps}
      />
    );
  }
}

export default HeaderNavigation;
