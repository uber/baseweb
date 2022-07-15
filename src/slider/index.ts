/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { StyleProps } from './types';

export { default as Slider } from './slider';
export { default as StatefulSlider } from './stateful-slider';
export { default as StatefulContainer } from './stateful-slider-container';
// Styled elements
export {
  Root as StyledRoot,
  Track as StyledTrack,
  InnerTrack as StyledInnerTrack,
  Thumb as StyledThumb,
  InnerThumb as StyledInnerThumb,
  Tick as StyledTick,
  TickBar as StyledTickBar,
  ThumbValue as StyledThumbValue,
  Mark as StyledMark,
} from './styled-components';

export * from './types';
/** @deprecated use StyleProps instead. To be removed in future versions.*/
export type SharedProps = StyleProps;
