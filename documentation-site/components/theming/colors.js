/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron, expandBorderStyles} from 'baseui/styles';
import {colors} from 'baseui/tokens';
import {PropertyCompareTheme} from './common.js';

function getTokenFromCode(code) {
  let res = '';
  Object.entries(colors).forEach(([name, value]) => {
    if (value === code) res = name;
  });
  return res;
}

export function Color({name}: {name: string}) {
  const [css] = useStyletron();
  return (
    <PropertyCompareTheme
      name={name}
      concern="colors"
      renderBox={({previewTheme, commonStyles}) => (
        <div
          className={css({
            ...commonStyles,
            ...expandBorderStyles(previewTheme.borders.border600),
            backgroundColor: previewTheme.colors[name],
          })}
        ></div>
      )}
      renderValue={({previewTheme}) => (
        <React.Fragment>
          <div>{previewTheme.colors[name]}</div>
          <div>{getTokenFromCode(previewTheme.colors[name])}</div>
        </React.Fragment>
      )}
    />
  );
}
