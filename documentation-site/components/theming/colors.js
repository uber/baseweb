/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';
import {Title, Value} from './common.js';

export function Color({value}: {value: string}) {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        justifyContent: 'space-between',
        borderBottomColor: theme.colors.borderOpaque,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        paddingTop: theme.sizing.scale600,
        marginBottom: theme.sizing.scale600,
      })}
    >
      <div>
        <Title>{value}</Title>
        <Value>{theme.colors[value]}</Value>
      </div>
      <div
        className={css({
          boxSizing: 'border-box',
          width: theme.sizing.scale2400,
          backgroundColor: theme.colors[value],
          borderTopColor: theme.colors.borderOpaque,
          borderTopWidth: '1px',
          borderTopStyle: 'solid',
          borderLeftColor: theme.colors.borderOpaque,
          borderLeftWidth: '1px',
          borderLeftStyle: 'solid',
          borderRightColor: theme.colors.borderOpaque,
          borderRightWidth: '1px',
          borderRightStyle: 'solid',
        })}
      ></div>
    </div>
  );
}
