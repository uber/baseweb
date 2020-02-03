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

function Swatch({mode, value}) {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1,
        flexBasis: '50%',
      })}
    >
      <div
        className={css({
          backgroundColor: mode.colors.backgroundPrimary,
          marginRight: theme.sizing.scale600,
          paddingTop: theme.sizing.scale400,
          paddingLeft: theme.sizing.scale400,
          paddingRight: theme.sizing.scale400,
          paddingBottom: theme.sizing.scale400,
          borderTopStyle: 'solid',
          borderRightStyle: 'solid',
          borderBottomStyle: 'solid',
          borderLeftStyle: 'solid',
          borderTopWidth: '1px',
          borderRightWidth: '1px',
          borderBottomWidth: '1px',
          borderLeftWidth: '1px',
          borderTopColor: theme.colors.borderOpaque,
          borderRightColor: theme.colors.borderOpaque,
          borderBottomColor: theme.colors.borderOpaque,
          borderLeftColor: theme.colors.borderOpaque,
          borderTopLeftRadius: theme.borders.radius300,
          borderTopRightRadius: theme.borders.radius300,
          borderBottomLeftRadius: theme.borders.radius300,
          borderBottomRightRadius: theme.borders.radius300,
        })}
      >
        <div
          className={css({
            height: '40px',
            width: '40px',
            borderTopLeftRadius: '100%',
            borderTopRightRadius: '100%',
            borderBottomLeftRadius: '100%',
            borderBottomRightRadius: '100%',
            backgroundColor: mode.colors[value],
          })}
        ></div>
      </div>
      <div>
        <Value $style={{marginBottom: 0, fontSize: '13px'}}>
          {mode.colors[value]}
        </Value>
        <Value $style={{marginBottom: 0, fontSize: '13px'}}>
          {getTokenFromCode(mode.colors[value])}
        </Value>
      </div>
    </div>
  );
}

export function Color({value}: {value: string}) {
  const [css, theme] = useStyletron();
  return (
    <div className={css({marginBottom: theme.sizing.scale800})}>
      <Title>{value}</Title>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          marginBottom: theme.sizing.scale300,
        })}
      >
        <Swatch value={value} mode={LightTheme} />
        <Swatch value={value} mode={DarkTheme} />
      </div>
    </div>
  );
}
