/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';
import {Title, Value, ThemeComparison} from './common.js';
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
            boxShadow: mode.lighting[value],
          })}
        ></div>
      </div>
      <Value $style={{fontSize: '13px', letterSpacing: '-0.1px'}}>
        {mode.lighting[value]}
      </Value>
    </div>
  );
}

export function Lighting({value}: {value: string}) {
  const [css] = useStyletron();
  return (
    <ThemeComparison
      value={value}
      renderSwatch={({mode, commonStyles}) => (
        <div
          className={css({
            ...commonStyles,
            boxShadow: mode.lighting[value],
          })}
        ></div>
      )}
      renderValues={({mode}) => mode.lighting[value]}
    />
  );
}
