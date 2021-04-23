/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';
import {PropertyCompareTheme} from './common.js';

export function Lighting({name}: {name: string}) {
  const [css] = useStyletron();
  return (
    <PropertyCompareTheme
      name={name}
      concern="lighting"
      renderBox={({previewTheme, commonStyles}) => (
        <div
          className={css({
            ...commonStyles,
            boxShadow: previewTheme.lighting[name],
          })}
        ></div>
      )}
      renderValue={({previewTheme}) => previewTheme.lighting[name]}
    />
  );
}
