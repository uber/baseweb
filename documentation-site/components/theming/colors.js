/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';
import {colors} from 'baseui/tokens';
import {ThemeComparison} from './common.js';

function getTokenFromCode(code) {
  let res = '';
  Object.entries(colors).forEach(([name, value]) => {
    if (value === code) res = name;
  });
  return res;
}

export function Color({value}: {value: string}) {
  const [css] = useStyletron();
  return (
    <ThemeComparison
      value={value}
      concern="colors"
      renderBox={({mode, commonStyles}) => (
        <div
          className={css({
            ...commonStyles,
            ...mode.borders.border600,
            backgroundColor: mode.colors[value],
          })}
        ></div>
      )}
      renderValue={({mode}) => (
        <React.Fragment>
          <div>{mode.colors[value]}</div>
          <div>{getTokenFromCode(mode.colors[value])}</div>
        </React.Fragment>
      )}
    />
  );
}
