/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {styled} from '../styles/index.js';
import type {Font} from '../styles/types.js';
import type {StyledBlockPropsT} from './types.js';

export const StyledBlock = styled(
  'div',
  ({
    $theme,
    $color,
    $font,
    $alignContent,
    $alignItems,
    $alignSelf,
    $flexDirection,
    $display,
    $flex,
    $justifyContent,
    $justifySelf,
    $position,
    $width,
    $minWidth,
    $maxWidth,
    $height,
    $minHeight,
    $maxHeight,
    $overflow,
    $margin,
    $marginTop,
    $marginRight,
    $marginBottom,
    $marginLeft,
    $padding,
    $paddingTop,
    $paddingRight,
    $paddingBottom,
    $paddingLeft,
    $flexWrap,
    $left,
    $top,
    $right,
    $bottom,
    ...other
  }: StyledBlockPropsT) => {
    const {colors, typography, sizing} = $theme;

    let styles = {};

    if ($color !== undefined) {
      styles.color = colors[$color] || $color;
    }

    if ($font !== undefined) {
      const font: Font = typography[$font];
      styles.fontFamily = font.fontFamily;
      styles.fontWeight = font.fontWeight;
      styles.fontSize = font.fontSize;
      styles.lineHeight = font.lineHeight;
    }

    if ($alignContent !== undefined) {
      styles.alignContent = $alignContent;
    }

    if ($alignItems !== undefined) {
      styles.alignItems = $alignItems;
    }

    if ($alignSelf !== undefined) {
      styles.alignSelf = $alignSelf;
    }

    if ($flexDirection !== undefined) {
      styles.flexDirection = $flexDirection;
    }

    if ($display !== undefined) {
      styles.display = $display;
    }

    if ($flex !== undefined) {
      styles.flex = $flex;
    }

    if ($justifyContent !== undefined) {
      styles.justifyContent = $justifyContent;
    }

    if ($justifySelf !== undefined) {
      styles.justifySelf = $justifySelf;
    }

    if ($position !== undefined) {
      styles.position = $position;
    }

    if ($width !== undefined) {
      styles.width = $width;
    }

    if ($minWidth !== undefined) {
      styles.minWidth = $minWidth;
    }

    if ($maxWidth !== undefined) {
      styles.maxWidth = $maxWidth;
    }

    if ($height !== undefined) {
      styles.height = $height;
    }

    if ($minHeight !== undefined) {
      styles.minHeight = $minHeight;
    }

    if ($maxHeight !== undefined) {
      styles.maxHeight = $maxHeight;
    }

    if ($overflow === 'scrollX') {
      styles.overflowX = 'scroll';
    } else if ($overflow === 'scrollY') {
      styles.overflowY = 'scroll';
    } else if ($overflow !== undefined) {
      styles.overflow = $overflow;
    }

    if ($margin !== undefined) {
      styles.margin = sizing[$margin] || $margin;
    }

    if ($marginTop !== undefined) {
      styles.marginTop = sizing[$marginTop] || $marginTop;
    }

    if ($marginRight !== undefined) {
      styles.marginRight = sizing[$marginRight] || $marginRight;
    }

    if ($marginBottom !== undefined) {
      styles.marginBottom = sizing[$marginBottom] || $marginBottom;
    }

    if ($marginLeft !== undefined) {
      styles.marginLeft = sizing[$marginLeft] || $marginLeft;
    }

    if ($padding !== undefined) {
      styles.padding = sizing[$padding] || $padding;
    }

    if ($paddingTop !== undefined) {
      styles.paddingTop = sizing[$paddingTop] || $paddingTop;
    }

    if ($paddingRight !== undefined) {
      styles.paddingRight = sizing[$paddingRight] || $paddingRight;
    }

    if ($paddingBottom !== undefined) {
      styles.paddingBottom = sizing[$paddingBottom] || $paddingBottom;
    }

    if ($paddingLeft !== undefined) {
      styles.paddingLeft = sizing[$paddingLeft] || $paddingLeft;
    }

    if ($flexWrap !== undefined) {
      styles.flexWrap = 'wrap';
    }

    if ($left !== undefined) {
      styles.left = $left;
    }

    if ($top !== undefined) {
      styles.top = $top;
    }

    if ($right !== undefined) {
      styles.right = $right;
    }

    if ($bottom !== undefined) {
      styles.bottom = $bottom;
    }

    return styles;
  },
);
