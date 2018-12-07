/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import type {Node, ElementType} from 'react';
import type {ThemeT} from '../styles/types.js';
import type {OverrideT} from '../helpers/overrides.js';

export type OverridesT = {
  Block?: OverrideT<*>,
};

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

export type BlockPropsT = {
  children?: Node,
  as?: ElementType,
  overrides?: OverridesT,
  color?: string,
  font?: string,
  alignContent?: AlignContentT,
  alignItems?: AlignItemsT,
  alignSelf?: AlignSelfT,
  flexDirection?: FlexDirectionT,
  display?: DisplayT,
  flex?: string,
  justifyContent?: JustifyContentT,
  justifySelf?: JustifySelfT,
  position?: PositionT,
  width?: string,
  minWidth?: string,
  maxWidth?: string,
  height?: string,
  minHeight?: string,
  maxHeight?: string,
  overflow?: OverflowT,
  margin?: string,
  marginTop?: string,
  marginRight?: string,
  marginBottom?: string,
  marginLeft?: string,
  padding?: string,
  paddingTop?: string,
  paddingRight?: string,
  paddingBottom?: string,
  paddingLeft?: string,
  flexWrap?: boolean,
  left?: string,
  top?: string,
  right?: string,
  bottom?: string,
};

export type StyledBlockPropsT = {
  $theme: ThemeT,
  $as?: ElementType,
  $color?: string,
  $font?: string,
  $alignContent?: AlignContentT,
  $alignItems?: AlignItemsT,
  $alignSelf?: AlignSelfT,
  $flexDirection?: FlexDirectionT,
  $display?: DisplayT,
  $flex?: string,
  $justifyContent?: JustifyContentT,
  $justifySelf?: JustifySelfT,
  $position?: PositionT,
  $width?: string,
  $minWidth?: string,
  $maxWidth?: string,
  $height?: string,
  $minHeight?: string,
  $maxHeight?: string,
  $overflow?: OverflowT,
  $margin?: string,
  $marginTop?: string,
  $marginRight?: string,
  $marginBottom?: string,
  $marginLeft?: string,
  $padding?: string,
  $paddingTop?: string,
  $paddingRight?: string,
  $paddingBottom?: string,
  $paddingLeft?: string,
  $flexWrap?: boolean,
  $left?: string,
  $top?: string,
  $right?: string,
  $bottom?: string,
};
