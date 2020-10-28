/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global window */
import * as React from 'react';
import {SIZE} from './constants.js';
import {
  StyledSpinnerDeterminateRoot,
  StyledSpinnerDeterminateSvg,
  StyledSpinnerDeterminateTrackBackground,
  StyledSpinnerDeterminateTrackForeground,
  StyledSpinnerDeterminateText,
} from './styled-components.js';
import {useOverrides} from '../helpers/overrides.js';
import type {SpinnerDeterminatePropsT} from './types.js';

function roundTo(n, digits) {
  if (digits === undefined) {
    digits = 0;
  }
  const multiplicator = Math.pow(10, digits);
  n = parseFloat((n * multiplicator).toFixed(11));
  const test = Math.round(n) / multiplicator;
  return +test.toFixed(digits);
}

function SpinnerDeterminate({
  progress = 0,
  size = SIZE.medium,
  animate = true,
  inline = false,
  overrides = {},
  ...restProps
}: SpinnerDeterminatePropsT) {
  const [
    [Root, RootProps],
    [Svg, SvgProps],
    [TrackBackground, TrackBackgroundProps],
    [TrackForeground, TrackForegroundProps],
    [Text, TextProps],
  ] = useOverrides(
    {
      Root: StyledSpinnerDeterminateRoot,
      Svg: StyledSpinnerDeterminateSvg,
      TrackBackground: StyledSpinnerDeterminateTrackBackground,
      TrackForeground: StyledSpinnerDeterminateTrackForeground,
      Text: StyledSpinnerDeterminateText,
    },
    overrides,
  );

  // Get path length after initial render
  const [pathLength, setPathLength] = React.useState(0);
  const pathRef = React.useRef();
  React.useEffect(() => {
    if (pathRef.current && pathRef.current.getTotalLength) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Animation
  const animationFrameRef = React.useRef();
  const [pathProgress, setPathProgress] = React.useState(0);
  React.useEffect(() => {
    if (!animate) {
      setPathProgress(progress);
      return;
    }
    if (window && animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }
    let animationDuration = Math.max(1000 * (progress - pathProgress), 250);
    let animationTimeStarted;
    function loop(now = 0) {
      if (!animationTimeStarted) {
        animationTimeStarted = now;
      }
      let animationTimeElapsed = now - animationTimeStarted;
      // Move out of state - might need to reverse calculate the path progress for interruped animations
      setPathProgress(
        Math.min(
          (progress - pathProgress) *
            (animationTimeElapsed / animationDuration) +
            pathProgress,
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
    <Root
      data-baseweb="spinner-determinate"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={1}
      $size={size}
      $inline={inline}
      {...restProps}
      {...RootProps}
    >
      <Svg $size={size} {...restProps} {...SvgProps}>
        <TrackBackground $size={size} {...TrackBackgroundProps} />
        <TrackForeground
          // $FlowFixMe
          ref={pathRef}
          $size={size}
          $visible={!!pathRef.current}
          $pathLength={pathLength}
          $pathProgress={pathProgress}
          {...TrackForegroundProps}
        />
      </Svg>
      <Text $size={size} {...TextProps}>
        {roundTo(Math.min(progress * 100, 100))}%
      </Text>
    </Root>
  );
}

export default SpinnerDeterminate;
