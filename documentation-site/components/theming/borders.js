/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';
import {Property, ThemeComparison} from './common.js';

export function Border({value}: {value: string}) {
  const [css] = useStyletron();
  return (
    <ThemeComparison
      value={value}
      renderSwatch={({mode, commonStyles}) => (
        <div
          className={css({
            ...commonStyles,
            ...mode.borders[value],
          })}
        ></div>
      )}
      renderValues={({mode}) => (
        <React.Fragment>
          <div>{mode.borders[value].borderStyle}</div>
          <div>{mode.borders[value].borderWidth}</div>
          <div>{mode.borders[value].borderColor}</div>
        </React.Fragment>
      )}
    />
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
