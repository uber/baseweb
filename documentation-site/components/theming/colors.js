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
        borderBottomColor: theme.colors[value],
        borderBottomWidth: '2px',
        borderBottomStyle: 'solid',
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
        })}
      ></div>
    </div>
  );
}
