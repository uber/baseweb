/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';
import {LightTheme, DarkTheme} from 'baseui/themes';
import {colors} from 'baseui/tokens';
import {Title, Value} from './common.js';

function getTokenFromCode(code) {
  let res = '';
  Object.entries(colors).forEach(([name, value]) => {
    if (value === code) res = name;
  });
  return res;
}

function Swatch({value, mode, left = false}) {
  const [css, theme] = useStyletron();
  return (
    <div className={css({flexBasis: '50%', flexGrow: 1})}>
      <div
        className={css({
          backgroundColor: mode.colors.backgroundPrimary,
          paddingTop: theme.sizing.scale800,
          paddingBottom: theme.sizing.scale800,
          display: 'flex',
          justifyContent: 'center',
          borderTopStyle: 'solid',
          borderRightStyle: left ? null : 'solid',
          borderBottomStyle: 'solid',
          borderLeftStyle: left ? 'solid' : null,
          borderTopWidth: '1px',
          borderBottomWidth: '1px',
          borderRightWidth: left ? null : '1px',
          borderLeftWidth: left ? '1px' : null,
          borderTopColor: theme.colors.borderOpaque,
          borderBottomColor: theme.colors.borderOpaque,
          borderRightColor: theme.colors.borderOpaque,
          borderLeftColor: theme.colors.borderOpaque,
        })}
      >
        <div
          className={css({
            height: '40px',
            width: '40px',
            backgroundColor: mode.colors[value],
            borderTopStyle: 'solid',
            borderRightStyle: 'solid',
            borderBottomStyle: 'solid',
            borderLeftStyle: 'solid',
            borderTopWidth: '1px',
            borderRightWidth: '1px',
            borderBottomWidth: '1px',
            borderLeftWidth: '1px',
            borderTopColor: mode.colors.borderOpaque,
            borderRightColor: mode.colors.borderOpaque,
            borderBottomColor: mode.colors.borderOpaque,
            borderLeftColor: mode.colors.borderOpaque,
          })}
        ></div>
      </div>
      <Value $style={{marginBottom: 0, fontSize: '13px'}}>
        {mode.colors[value]}
      </Value>
      <Value $style={{marginBottom: 0, fontSize: '13px'}}>
        {getTokenFromCode(mode.colors[value])}
      </Value>
    </div>
  );
}

export function Color({value}: {value: string}) {
  const [css, theme] = useStyletron();
  return (
    <div className={css({marginBottom: theme.sizing.scale400})}>
      <Title>{value}</Title>
      <div className={css({display: 'flex'})}>
        <Swatch mode={LightTheme} value={value} left />
        <Swatch mode={DarkTheme} value={value} />
      </div>
    </div>
  );
}
