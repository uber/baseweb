/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';
import {ThemeComparison} from './common.js';

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
