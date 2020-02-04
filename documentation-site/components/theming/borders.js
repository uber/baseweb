/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';
import {Title, Value, Property} from './common.js';
import {LightTheme, DarkTheme} from 'baseui/themes';

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
            ...mode.borders[value],
          })}
        ></div>
      </div>
      <Value $style={{fontSize: '13px', letterSpacing: '-0.1px'}}>
        {mode.borders[value].borderStyle} {mode.borders[value].borderWidth}{' '}
        {mode.borders[value].borderColor}
      </Value>
    </div>
  );
}

export function Border({value}: {value: string}) {
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
