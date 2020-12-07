/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {
  StyledProgressBarRoundedRoot,
  StyledProgressBarRoundedSvg,
  StyledProgressBarRoundedText,
  StyledProgressBarRoundedTrackBackground,
  StyledProgressBarRoundedTrackForeground,
} from '../progress-bar/index.js';
export {default as Spinner} from './spinner.js';
// Styled elements
export {
  Svg as StyledSvg,
  StyledTrackPath,
  StyledActivePath,
  StyledSpinnerNext,
} from './styled-components.js';
export {SIZE} from './constants.js';
// Flow
export type * from './types.js';

// Backward compatibility with SpinnerDeterminate
// Deprecated
export {
  StyledProgressBarRoundedRoot as StyledSpinnerDeterminateRoot,
  StyledProgressBarRoundedSvg as StyledSpinnerDeterminateSvg,
  StyledProgressBarRoundedTrackBackground as StyledSpinnerDeterminateTrackBackground,
  StyledProgressBarRoundedTrackForeground as StyledSpinnerDeterminateTrackForeground,
  StyledProgressBarRoundedText as StyledSpinnerDeterminateText,
};
