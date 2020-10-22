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
import {getOverrides} from '../helpers/overrides.js';
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
}: SpinnerDeterminatePropsT) {
  // Unpack overrides
  const {
    Root: RootOverrides,
    Svg: SvgOverrides,
    TrackBackground: TrackBackgroundOverrides,
    TrackForeground: TrackForegroundOverrides,
    Text: TextOverrides,
  } = overrides;
  const [Root, RootProps] = getOverrides(
    RootOverrides,
    StyledSpinnerDeterminateRoot,
  );
  const [Svg, SvgProps] = getOverrides(
    SvgOverrides,
    StyledSpinnerDeterminateSvg,
  );
  const [TrackBackground, TrackBackgroundProps] = getOverrides(
    TrackBackgroundOverrides,
    StyledSpinnerDeterminateTrackBackground,
  );
  const [TrackForeground, TrackForegroundProps] = getOverrides(
    TrackForegroundOverrides,
    StyledSpinnerDeterminateTrackForeground,
  );
  const [Text, TextProps] = getOverrides(
    TextOverrides,
    StyledSpinnerDeterminateText,
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
    <Root $size={size} $inline={inline} {...RootProps}>
      <Svg $size={size} {...SvgProps}>
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
