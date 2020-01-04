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

export function Border({value}: {value: string}) {
  const [css, theme] = useStyletron();
  return (
    <div className={css({marginBottom: theme.sizing.scale1000})}>
      <div
        className={css({
          ...theme.typography.HeadingXSmall,
          ...monospace,
          marginBottom: theme.sizing.scale400,
        })}
      >
        {value}
      </div>
      <div
        className={css({
          ...theme.typography.ParagraphMedium,
          ...monospace,
          marginBottom: theme.sizing.scale400,
        })}
      >
        <div>{theme.borders[value].borderWidth}</div>
        <div>{theme.borders[value].borderStyle}</div>
        <div>{theme.borders[value].borderColor}</div>
      </div>
      <div
        className={css({
          borderTopColor: theme.borders[value].borderColor,
          borderTopStyle: theme.borders[value].borderStyle,
          borderTopWidth: theme.borders[value].borderWidth,
          marginBottom: theme.sizing.scale400,
        })}
      ></div>
    </div>
  );
}

export function Radius({value}: {value: string}) {
  const [css, theme] = useStyletron();
  return (
    <div className={css({marginBottom: theme.sizing.scale1000})}>
      <div
        className={css({
          ...theme.typography.HeadingXSmall,
          ...monospace,
          marginBottom: theme.sizing.scale400,
        })}
      >
        {value}
      </div>
      <div
        className={css({
          ...theme.typography.ParagraphMedium,
          ...monospace,
          marginBottom: theme.sizing.scale400,
        })}
      >
        <div>{theme.borders[value]}</div>
      </div>
      <div
        className={css({
          ...theme.borders.border600,
          borderRadius: theme.borders[value],
          marginBottom: theme.sizing.scale400,
          height: theme.sizing.scale400,
        })}
      ></div>
    </div>
  );
}
