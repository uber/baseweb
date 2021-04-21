/*
Copyright (c) Uber Technologies, Inc.

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
    ['10%']: {
      width: '100%',
    },
  },
  timing200: {
    ...move,
    ['20%']: {
      width: '100%',
    },
  },
  timing300: {
    ...move,
    ['30%']: {
      width: '100%',
    },
  },
  timing400: {
    ...move,
    ['40%']: {
      width: '100%',
    },
  },
  timing500: {
    ...move,
    ['50%']: {
      width: '100%',
    },
  },
  timing600: {
    ...move,
    ['60%']: {
      width: '100%',
    },
  },
  timing700: {
    ...move,
    ['70%']: {
      width: '100%',
    },
  },
  timing800: {
    ...move,
    ['80%']: {
      width: '100%',
    },
  },
  timing900: {
    ...move,
    ['90%']: {
      width: '100%',
    },
  },
  timing1000: {
    ...move,
  },
};

export function Timing({name}: {name: string}) {
  const [css, theme] = useStyletron();
  return (
    <Property
      name={name}
      concern="animation"
      renderPreview={() => (
        <div
          className={css({
            backgroundColor: theme.colors.contentInverseSecondary,
          })}
        >
          <div
            className={css({
              animationName: animations[name],
              animationDuration: '1s',
              animationDirection: 'alternate',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              height: theme.sizing.scale100,
              backgroundColor: theme.colors.contentPrimary,
            })}
          ></div>
        </div>
      )}
      renderValue={() => theme.animation[name]}
    />
  );
}

export function Easing({name}: {name: string}) {
  const [css, theme] = useStyletron();
  return (
    <Property
      name={name}
      concern="animation"
      renderValue={() => theme.animation[name]}
      renderPreview={() => (
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
              animationTimingFunction: theme.animation[name],
              height: theme.sizing.scale100,
              backgroundColor: theme.colors.contentPrimary,
            })}
          ></div>
        </div>
      )}
    />
  );
}
