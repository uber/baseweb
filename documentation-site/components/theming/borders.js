/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';
import {Property} from './common.js';

export function Border({value}: {value: string}) {
  const [css, theme] = useStyletron();
  return (
    <Property
      title={value}
      value={[
        theme.borders[value].borderStyle,
        theme.borders[value].borderWidth,
        theme.borders[value].borderColor,
      ]}
    >
      <div
        className={css({
          borderTopStyle: theme.borders[value].borderStyle,
          borderTopWidth: theme.borders[value].borderWidth,
          borderTopColor: theme.borders[value].borderColor,
        })}
      ></div>
    </Property>
  );
}

export function Radius({value}: {value: string}) {
  const [css, theme] = useStyletron();
  return (
    <Property title={value} value={theme.borders[value]}>
      <div
        className={css({
          backgroundColor: theme.colors.contentPrimary,
          borderRadius: theme.borders[value],
          height: theme.sizing.scale1200,
          width: theme.sizing.scale1200,
        })}
      ></div>
    </Property>
  );
}
