/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { useStyletron } from '../../styles/index.js';

const Inner: React.StatelessFunctionalComponent<{
  children: React.Node,
  h?: string,
}> = ({ children, h = 'auto' }) => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        padding: theme.sizing.scale300,
        color: theme.colors.contentPrimary,
        borderLeftStyle: `solid`,
        borderRightStyle: `solid`,
        borderTopStyle: `solid`,
        borderBottomStyle: `solid`,
        borderLeftWidth: `1px`,
        borderRightWidth: `1px`,
        borderTopWidth: `1px`,
        borderBottomWidth: `1px`,
        borderLeftColor: theme.colors.contentPrimary,
        borderRightColor: theme.colors.contentPrimary,
        borderTopColor: theme.colors.contentPrimary,
        borderBottomColor: theme.colors.contentPrimary,
        height: h,
      })}
    >
      {children}
    </div>
  );
};

export default Inner;
