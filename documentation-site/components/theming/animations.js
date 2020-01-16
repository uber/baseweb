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

// adds delays so that bars are in sync
const animations = {
  timing100: {
    ...move,
    ['25%']: {
      width: '100%',
    },
  },
  timing400: {
    ...move,
    ['40%']: {
      width: '100%',
    },
  },
  timing700: {
    ...move,
    ['60%']: {
      width: '100%',
    },
  },
  timing1000: {
    ...move,
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
            animationName: animations[duration],
            animationDuration: '1s',
            animationDirection: 'alternate',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
            height: theme.sizing.scale100,
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
            height: theme.sizing.scale100,
            backgroundColor: theme.colors.contentPrimary,
          })}
        ></div>
      </div>
    </Property>
  );
}
