/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {StyledLink} from '../link/index.js';
import {StyledAppName} from './styled-components.js';

export default function Logo(props: {
  appDisplayName: ?React.Node,
  link: ?string,
}) {
  return (
    <StyledLink $style={{textDecoration: 'none'}} href={props.link || ''}>
      <StyledAppName>{props.appDisplayName}</StyledAppName>
    </StyledLink>
  );
}
