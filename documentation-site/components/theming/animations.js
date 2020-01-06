/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';
import {Property} from './common.js';

const move = {
  from: {
    width: '0px',
  },
  to: {
    width: '100%',
  },
};

export function Timing({duration}: {duration: string}) {
  const [css, theme] = useStyletron();
  return (
    <Property title={duration} value={theme.animation[duration]}>
      <div
        className={css({
          backgroundColor: theme.colors.contentInverseSecondary,
        })}
      >
        <div
          className={css({
            animationName: move,
            animationDuration: theme.animation[duration],
            animationDirection: 'alternate',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
            height: theme.sizing.scale200,
            backgroundColor: theme.colors.contentPrimary,
          })}
        ></div>
      </div>
    </Property>
  );
}

export function Easing({easing}: {easing: string}) {
  const [css, theme] = useStyletron();
  return (
    <Property title={easing} value={theme.animation[easing]}>
      <div
        className={css({
          backgroundColor: theme.colors.contentInverseSecondary,
        })}
      >
        <div
          className={css({
            animationName: move,
            animationDuration: '1s',
            animationDirection: 'alternate',
            animationIterationCount: 'infinite',
            animationTimingFunction: theme.animation[easing],
            height: theme.sizing.scale200,
            backgroundColor: theme.colors.contentPrimary,
          })}
        ></div>
      </div>
    </Property>
  );
}
