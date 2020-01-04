/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';

const monospace = {
  fontFamily:
    'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
};

export function Color({value}: {value: string}) {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        marginBottom: theme.sizing.scale400,
        justifyContent: 'space-between',
      })}
    >
      <div
        className={css({
          ...theme.typography.HeadingXSmall,
          ...monospace,
          marginBottom: theme.sizing.scale400,
        })}
      >
        {value}
        <div
          className={css({
            ...theme.typography.ParagraphMedium,
            ...monospace,
            marginBottom: theme.sizing.scale400,
          })}
        >
          <div>{theme.colors[value]}</div>
        </div>
      </div>
      <div
        className={css({
          height: theme.sizing.scale1000,
          width: theme.sizing.scale2400,
          backgroundColor: theme.colors[value],
          ...theme.borders.border100,
        })}
      ></div>
    </div>
  );
}
