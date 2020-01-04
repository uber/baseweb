/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {LightTheme, useStyletron} from 'baseui';

const monospace = {
  fontFamily:
    'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
};

export function Breakpoint({value}: {value: string}) {
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
        })}
      >
        <div>{LightTheme.breakpoints[value]}px</div>
      </div>
    </div>
  );
}
