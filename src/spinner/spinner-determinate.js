/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global window */
import * as React from 'react';
import {SIZE} from './constants.js';
import {useStyletron} from '../styles/index.js';
import type {SpinnerDeterminatePropsT} from './types.js';

function roundTo(n, digits) {
  if (digits === undefined) {
    digits = 0;
  }

  var multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  var test = Math.round(n) / multiplicator;
  return +test.toFixed(digits);
}

const SIZES = {
  [SIZE.large]: {
    d:
      'M47.5 4H71.5529C82.2933 4 91 12.9543 91 24C91 35.0457 82.2933 44 71.5529 44H23.4471C12.7067 44 4 35.0457 4 24C4 12.9543 12.7067 4 23.4471 4H47.5195',
    width: 95,
    height: 48,
    strokeWidth: 8,
    typography: 'LabelLarge',
  },
  [SIZE.medium]: {
    d:
      'M39 2H60.5833C69.0977 2 76 9.16344 76 18C76 26.8366 69.0977 34 60.5833 34H17.4167C8.90228 34 2 26.8366 2 18C2 9.16344 8.90228 2 17.4167 2H39.0195',
    width: 78,
    height: 36,
    strokeWidth: 4,
    typography: 'LabelMedium',
  },
  [SIZE.small]: {
    d:
      'M32 1H51.6271C57.9082 1 63 6.37258 63 13C63 19.6274 57.9082 25 51.6271 25H12.3729C6.09181 25 1 19.6274 1 13C1 6.37258 6.09181 1 12.3729 1H32.0195',
    width: 64,
    height: 26,
    strokeWidth: 2,
    typography: 'LabelSmall',
  },
};

function SpinnerDeterminate({
  progress = 0,
  size = SIZE.medium,
  animate = true,
  inline = false,
}: SpinnerDeterminatePropsT) {
  const [css, theme] = useStyletron();

  const sizeMetaData = SIZES[size];

  // Get path length after initial render
  const [pathLength, setPathLength] = React.useState(0);
  const pathRef = React.useRef();
  React.useEffect(() => {
    // $FlowFixMe - Not sure how to get Flow to understand this is a path element.
    if (pathRef.current && pathRef.current.getTotalLength) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Animation
  const animationFrameRef = React.useRef();
  const [strokeProgress, setStrokeProgress] = React.useState(0);
  React.useEffect(() => {
    if (!animate) {
      setStrokeProgress(progress);
      return;
    }

    if (window && animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }
    let animationDuration = Math.max(1000 * (progress - strokeProgress), 250);
    let animationTimeStarted;
    function loop(now = 0) {
      if (!animationTimeStarted) {
        animationTimeStarted = now;
      }
      let animationTimeElapsed = now - animationTimeStarted;
      // Move out of state - might need to reverse calculate the stroke progress for interruped animations
      setStrokeProgress(
        Math.min(
          (progress - strokeProgress) *
            (animationTimeElapsed / animationDuration) +
            strokeProgress,
          1,
        ),
      );
      if (animationTimeElapsed <= animationDuration) {
        animationFrameRef.current = window.requestAnimationFrame(loop);
      }
    }
    loop();
  }, [progress]); // We want *only* `progress` to trigger this effect

  return (
    <div
      className={css({
        position: 'relative',
        width: sizeMetaData.width + 'px',
        height: sizeMetaData.height + 'px',
        display: inline ? 'inline-flex' : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colors.contentPrimary,
        ...theme.typography[sizeMetaData.typography],
      })}
    >
      <svg
        className={css({
          width: sizeMetaData.width + 'px',
          height: sizeMetaData.height + 'px',
          position: 'absolute',
        })}
        width={sizeMetaData.width}
        height={sizeMetaData.height}
        viewBox={`0 0 ${sizeMetaData.width} ${sizeMetaData.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={sizeMetaData.d}
          stroke={theme.colors.backgroundTertiary}
          strokeWidth={sizeMetaData.strokeWidth}
        />
        <path
          ref={pathRef}
          className={css({
            visibility: pathRef.current ? 'visible' : 'hidden',
            strokeDasharray: pathLength,
            // Flow wants this as a string
            strokeDashoffset: '' + pathLength * (1 - strokeProgress),
          })}
          d={sizeMetaData.d}
          stroke={theme.colors.borderAccent}
          strokeWidth={sizeMetaData.strokeWidth}
        />
      </svg>
      {roundTo(Math.min(progress * 100, 100))}%
    </div>
  );
}

export default SpinnerDeterminate;
