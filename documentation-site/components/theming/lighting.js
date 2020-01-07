/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';
import {Property} from './common.js';

export function Lighting({value}: {value: string}) {
  const [css, theme] = useStyletron();
  return (
    <Property title={value} value={theme.lighting[value]}>
      <div
        className={css({
          backgroundColor: theme.colors.contentInversePrimary,
          height: theme.sizing.scale1200,
          boxShadow: theme.lighting[value],
        })}
      ></div>
    </Property>
  );
}
