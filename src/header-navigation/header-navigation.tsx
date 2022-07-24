/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { getOverrides } from '../helpers/overrides';
import type { HeaderNavigationProps } from './types';
import { Root as StyledRoot } from './styled-components';

class HeaderNavigation extends React.Component<HeaderNavigationProps, {}> {
  static defaultProps = {
    overrides: {},
  };
  render() {
    const { overrides, ...restProps } = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    return (
      <Root data-baseweb="header-navigation" role="navigation" {...restProps} {...rootProps} />
    );
  }
}

export default HeaderNavigation;
