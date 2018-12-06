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

export type BlockPropsT = {
  children?: Node,
  as?: ElementType,
  overrides?: OverridesT,
  color?: string,
  font?: string,
  alignContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'stretch',
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  flexDirection?: 'row' | 'column',
  display?: 'none' | 'flex' | 'block' | 'inline-block',
  flex?: 'grow' | 'shrink' | 'none',
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around',
  justifySelf?: string,
  position?: 'static' | 'absolute' | 'relative' | 'fixed',
  width?: string,
  minWidth?: string,
  maxWidth?: string,
  height?: string,
  minHeight?: string,
  maxHeight?: string,
  overflow?: 'visible' | 'hidden' | 'scroll' | 'scrollX' | 'scrollY' | 'auto',
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
  $alignContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'stretch',
  $alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  $alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch',
  $flexDirection?: 'row' | 'column',
  $display?: 'none' | 'flex' | 'block' | 'inline-block',
  $flex?: 'grow' | 'shrink' | 'none',
  $justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around',
  $justifySelf?: string,
  $position?: 'static' | 'absolute' | 'relative' | 'fixed',
  $width?: string,
  $minWidth?: string,
  $maxWidth?: string,
  $height?: string,
  $minHeight?: string,
  $maxHeight?: string,
  $overflow?: 'visible' | 'hidden' | 'scroll' | 'scrollX' | 'scrollY' | 'auto',
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
