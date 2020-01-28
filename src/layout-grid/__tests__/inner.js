/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from '../../styles/index.js';

const Inner: React.StatelessFunctionalComponent<{
  children: React.Node,
  h?: string,
}> = ({children, h = 'auto'}) => {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        padding: theme.sizing.scale300,
        color: theme.colors.contentPrimary,
        borderStyle: `solid`,
        borderWidth: `1px`,
        borderColor: theme.colors.contentPrimary,
        height: h,
      })}
    >
      {children}
    </div>
  );
};

export default Inner;
