/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import type {Node, ElementType} from 'react';
import type {OverrideT} from '../helpers/overrides.js';

export type OverridesT = {
  Block?: OverrideT<*>,
};

export type ResponsiveT<T> = T | Array<T>;

type AlignContentT =
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'normal'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
  | 'safe center'
  | 'unsafe center'
  | 'inherit'
  | 'initial'
  | 'unset';

type AlignItemsT =
  | 'normal'
  | 'stretch'
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'self-start'
  | 'self-end'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | 'safe center'
  | 'unsafe center'
  | 'inherit'
  | 'initial'
  | 'unset';

type AlignSelfT =
  | 'auto'
  | 'normal'
  | 'center'
  | 'start'
  | 'end'
  | 'self-start'
  | 'self-end'
  | 'flex-start'
  | 'flex-end'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | 'stretch'
  | 'safe center'
  | 'unsafe center'
  | 'inherit'
  | 'initial'
  | 'unset';

type FlexDirectionT =
  | 'row'
  | 'row-reverse'
  | 'column'
  | 'column-reverse'
  | 'inherit'
  | 'initial'
  | 'unset';

type FlexT = number | string;

type DisplayT =
  | 'block'
  | 'inline'
  | 'run-in'
  | 'flow'
  | 'flow-root'
  | 'table'
  | 'flex'
  | 'grid'
  | 'ruby'
  | 'block flow'
  | 'inline table'
  | 'flex run-in'
  | 'list-item'
  | 'list-item block'
  | 'list-item inline'
  | 'list-item flow'
  | 'list-item flow-root'
  | 'list-item block flow'
  | 'list-item block flow-root'
  | 'flow list-item block'
  | 'table-row-group'
  | 'table-header-group'
  | 'table-footer-group'
  | 'table-row'
  | 'table-cell'
  | 'table-column-group'
  | 'table-column'
  | 'table-caption'
  | 'ruby-base'
  | 'ruby-text'
  | 'ruby-base-container'
  | 'ruby-text-container'
  | 'contents'
  | 'none'
  | 'inline-block'
  | 'inline-table'
  | 'inline-flex'
  | 'inline-grid'
  | 'inherit'
  | 'initial'
  | 'unset';

type GridAutoFlowT =
  | 'row'
  | 'column'
  | 'dense'
  | 'row dense'
  | 'column dense'
  | 'inherit'
  | 'initial'
  | 'unset';

type JustifyContentT =
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'left'
  | 'right'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
  | 'safe center'
  | 'unsafe center'
  | 'inherit'
  | 'initial'
  | 'unset';

type JustifyItemsT =
  /* Basic keywords */
  | 'auto'
  | 'normal'
  | 'stretch'
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'self-start'
  | 'self-end'
  | 'left'
  | 'right'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | 'safe center'
  | 'unsafe center'
  | 'legacy right'
  | 'legacy left'
  | 'legacy center'
  | 'inherit'
  | 'initial'
  | 'unset';

type JustifySelfT =
  | 'auto'
  | 'normal'
  | 'stretch'
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'self-start'
  | 'self-end'
  | 'left'
  | 'right'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | 'safe center'
  | 'unsafe center'
  | 'inherit'
  | 'initial'
  | 'unset';

type PositionT = 'static' | 'absolute' | 'relative' | 'fixed' | 'sticky';

type OverflowT =
  | 'visible'
  | 'hidden'
  | 'scroll'
  | 'scrollX'
  | 'scrollY'
  | 'auto'
  | 'inherit'
  | 'initial'
  | 'unset';

export type ScaleT = 0 | string;

export type WhiteSpaceT =
  | 'normal'
  | 'nowrap'
  | 'pre'
  | 'pre-wrap'
  | 'pre-line'
  | 'break-spaces'
  | 'inherit'
  | 'initial'
  | 'unset';

export type BlockPropsT = {
  children?: Node,
  /** Modifies the base element used to render the block. */
  as?: ElementType,
  overrides?: OverridesT,
  /** Accepts all themeable color properties (`primary200`, etc.). */
  color?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/background-attachment */
  backgroundAttachment?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip */
  backgroundClip?: ResponsiveT<string>,
  /** Accepts all themeable color properties (`primary200`, etc.). */
  backgroundColor?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/background-image */
  backgroundImage?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/background-origin */
  backgroundOrigin?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/background-position */
  backgroundPosition?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/background-repeat */
  backgroundRepeat?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/background-size */
  backgroundSize?: ResponsiveT<string>,
  /** Accepts all themeable font properties (`font200`, etc.). */
  font?: string | Array<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/align-content */
  alignContent?: ResponsiveT<AlignContentT>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/align-items */
  alignItems?: ResponsiveT<AlignItemsT>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/align-self */
  alignSelf?: ResponsiveT<AlignSelfT>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction */
  flexDirection?: ResponsiveT<FlexDirectionT>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/display */
  display?: ResponsiveT<DisplayT>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/flex */
  flex?: ResponsiveT<FlexT>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid */
  grid?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area */
  gridArea?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-columns */
  gridAutoColumns?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow */
  gridAutoFlow?: ResponsiveT<GridAutoFlowT>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-rows */
  gridAutoRows?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column */
  gridColumn?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end */
  gridColumnEnd?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-gap */
  gridColumnGap?: ResponsiveT<ScaleT>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start */
  gridColumnStart?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-gap */
  gridGap?: ResponsiveT<ScaleT>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row */
  gridRow?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end */
  gridRowEnd?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-gap */
  gridRowGap?: ResponsiveT<ScaleT>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start */
  gridRowStart?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template */
  gridTemplate?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas */
  gridTemplateAreas?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns */
  gridTemplateColumns?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows */
  gridTemplateRows?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content */
  justifyContent?: ResponsiveT<JustifyContentT>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-items */
  justifyItems?: ResponsiveT<JustifyItemsT>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self */
  justifySelf?: ResponsiveT<JustifySelfT>,
  position?: ResponsiveT<PositionT>,
  width?: ResponsiveT<ScaleT>,
  minWidth?: ResponsiveT<ScaleT>,
  maxWidth?: ResponsiveT<ScaleT>,
  height?: ResponsiveT<ScaleT>,
  minHeight?: ResponsiveT<ScaleT>,
  maxHeight?: ResponsiveT<ScaleT>,
  overflow?: ResponsiveT<OverflowT>,
  margin?: ResponsiveT<ScaleT>,
  marginTop?: ResponsiveT<ScaleT>,
  marginRight?: ResponsiveT<ScaleT>,
  marginBottom?: ResponsiveT<ScaleT>,
  marginLeft?: ResponsiveT<ScaleT>,
  padding?: ResponsiveT<ScaleT>,
  paddingTop?: ResponsiveT<ScaleT>,
  paddingRight?: ResponsiveT<ScaleT>,
  paddingBottom?: ResponsiveT<ScaleT>,
  paddingLeft?: ResponsiveT<ScaleT>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/place-content */
  placeContent?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/place-items */
  placeItems?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/place-self */
  placeSelf?: ResponsiveT<string>,
  flexWrap?: ResponsiveT<boolean>,
  left?: ResponsiveT<ScaleT>,
  top?: ResponsiveT<ScaleT>,
  right?: ResponsiveT<ScaleT>,
  bottom?: ResponsiveT<ScaleT>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow */
  textOverflow?: ResponsiveT<string>,
  /** available values: https://developer.mozilla.org/en-US/docs/Web/CSS/white-space */
  whiteSpace?: ResponsiveT<WhiteSpaceT>,
};

export type StyledBlockPropsT = {
  $as?: ElementType,
  $color?: ResponsiveT<string>,
  $backgroundAttachment?: ResponsiveT<string>,
  $backgroundClip?: ResponsiveT<string>,
  $backgroundColor?: ResponsiveT<string>,
  $backgroundImage?: ResponsiveT<string>,
  $backgroundOrigin?: ResponsiveT<string>,
  $backgroundPosition?: ResponsiveT<string>,
  $backgroundRepeat?: ResponsiveT<string>,
  $backgroundSize?: ResponsiveT<string>,
  $font?: ResponsiveT<string>,
  $alignContent?: ResponsiveT<AlignContentT>,
  $alignItems?: ResponsiveT<AlignItemsT>,
  $alignSelf?: ResponsiveT<AlignSelfT>,
  $flexDirection?: ResponsiveT<FlexDirectionT>,
  $display?: ResponsiveT<DisplayT>,
  $flex?: ResponsiveT<FlexT>,
  $grid?: ResponsiveT<string>,
  $gridArea?: ResponsiveT<string>,
  $gridAutoColumns?: ResponsiveT<string>,
  $gridAutoFlow?: ResponsiveT<GridAutoFlowT>,
  $gridAutoRows?: ResponsiveT<string>,
  $gridColumn?: ResponsiveT<string>,
  $gridColumnEnd?: ResponsiveT<string>,
  $gridColumnGap?: ResponsiveT<ScaleT>,
  $gridColumnStart?: ResponsiveT<string>,
  $gridGap?: ResponsiveT<ScaleT>,
  $gridRow?: ResponsiveT<string>,
  $gridRowEnd?: ResponsiveT<string>,
  $gridRowGap?: ResponsiveT<ScaleT>,
  $gridRowStart?: ResponsiveT<string>,
  $gridTemplate?: ResponsiveT<string>,
  $gridTemplateAreas?: ResponsiveT<string>,
  $gridTemplateColumns?: ResponsiveT<string>,
  $gridTemplateRows?: ResponsiveT<string>,
  $justifyContent?: ResponsiveT<JustifyContentT>,
  $justifyItems?: ResponsiveT<JustifyItemsT>,
  $justifySelf?: ResponsiveT<JustifySelfT>,
  $position?: ResponsiveT<PositionT>,
  $width?: ResponsiveT<ScaleT>,
  $minWidth?: ResponsiveT<ScaleT>,
  $maxWidth?: ResponsiveT<ScaleT>,
  $height?: ResponsiveT<ScaleT>,
  $minHeight?: ResponsiveT<ScaleT>,
  $maxHeight?: ResponsiveT<ScaleT>,
  $overflow?: ResponsiveT<OverflowT>,
  $margin?: ResponsiveT<ScaleT>,
  $marginTop?: ResponsiveT<ScaleT>,
  $marginRight?: ResponsiveT<ScaleT>,
  $marginBottom?: ResponsiveT<ScaleT>,
  $marginLeft?: ResponsiveT<ScaleT>,
  $padding?: ResponsiveT<ScaleT>,
  $paddingTop?: ResponsiveT<ScaleT>,
  $paddingRight?: ResponsiveT<ScaleT>,
  $paddingBottom?: ResponsiveT<ScaleT>,
  $paddingLeft?: ResponsiveT<ScaleT>,
  $placeContent?: ResponsiveT<string>,
  $placeItems?: ResponsiveT<string>,
  $placeSelf?: ResponsiveT<string>,
  $flexWrap?: ResponsiveT<boolean>,
  $left?: ResponsiveT<ScaleT>,
  $top?: ResponsiveT<ScaleT>,
  $right?: ResponsiveT<ScaleT>,
  $bottom?: ResponsiveT<ScaleT>,
  $textOverflow?: ResponsiveT<string>,
  $whiteSpace?: ResponsiveT<WhiteSpaceT>,
};
