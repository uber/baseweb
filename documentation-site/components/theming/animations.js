/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';

const move = {
  from: {
    width: '0px',
  },
  to: {
    width: '100%',
  },
};

const monospace = {
  fontFamily:
    'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
};

export function Timing({duration, easing}: {duration: string, easing: string}) {
  const [css, theme] = useStyletron();
  return (
    <div className={css({marginBottom: theme.sizing.scale1000})}>
      <div
        className={css({
          marginBottom: theme.sizing.scale400,
          ...theme.typography.HeadingXSmall,
          ...monospace,
        })}
      >
        {duration || easing}
      </div>
      <div
        className={css({
          marginBottom: theme.sizing.scale400,
          ...theme.typography.ParagraphMedium,
          ...monospace,
        })}
      >
        {duration ? theme.animation[duration] : null}
        {easing ? theme.animation[easing] : null}
      </div>
      <div
        className={css({
          backgroundColor: theme.colors.contentInverseSecondary,
        })}
      >
        <div
          className={css({
            animationName: move,
            animationDuration: duration ? theme.animation[duration] : '1s',
            animationDirection: 'alternate',
            animationIterationCount: 'infinite',
            animationTimingFunction: easing
              ? theme.animation[easing]
              : 'linear',
            backgroundColor: theme.colors.contentPrimary,
            height: theme.sizing.scale200,
          })}
        ></div>
      </div>
    </div>
  );
}
