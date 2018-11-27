/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';
import {Root as StyledRoot} from './styled-components';
import {getOverrides} from '../../helpers/overrides';
import type {TopNavigationPropsT} from './types';

function TopNavigation({children, overrides, height}: TopNavigationPropsT) {
  // $FlowFixMe
  const [Root, rootProps] = getOverrides(
    // $FlowFixMe
    overrides.Root,
    StyledRoot,
  );

  return (
    <Root $height={height} as="nav" role="navigation" {...rootProps}>
      {children}
    </Root>
  );
}

TopNavigation.defaultProps = {
  overrides: {},
  height: 9,
};

export default TopNavigation;
