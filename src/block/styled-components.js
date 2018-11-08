/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {styled} from '../styles/index';
import type {Font} from '../styles/types';
import type {StyledBlockPropsT} from './types';

export const StyledBlock = styled(
  'div',
  ({
    $theme,
    $color,
    $font,
    $alignContent,
    $alignItems,
    $alignSelf,
    $direction,
    $display,
    $flex,
    $justifyContent,
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
    $wrap,
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

    if ($alignContent) {
      styles.alignContent = $alignContent;
    }

    if ($alignItems) {
      styles.alignItems = $alignItems;
    }

    if ($alignSelf) {
      styles.alignSelf = $alignSelf;
    }

    if ($direction) {
      styles.direction = $direction;
    }

    if ($display) {
      styles.display = $display;
    }

    if ($flex) {
      styles.flex = $flex;
    }

    if ($justifyContent) {
      styles.justifyContent = $justifyContent;
    }

    if ($position) {
      styles.position = $position;
    }

    if ($width) {
      styles.width = $width;
    }

    if ($minWidth) {
      styles.minWidth = $minWidth;
    }

    if ($maxWidth) {
      styles.maxWidth = $maxWidth;
    }

    if ($height) {
      styles.height = $height;
    }

    if ($minHeight) {
      styles.minHeight = $minHeight;
    }

    if ($maxHeight) {
      styles.maxHeight = $maxHeight;
    }

    if ($overflow === 'scrollX') {
      styles.overflowX = 'scroll';
    } else if ($overflow === 'scrollY') {
      styles.overflowY = 'scroll';
    } else if ($overflow !== undefined) {
      styles.overflow = $overflow;
    }

    if ($margin) {
      styles.margin = sizing[$margin] || $margin;
    }

    if ($marginTop) {
      styles.marginTop = sizing[$marginTop] || $marginTop;
    }

    if ($marginRight) {
      styles.marginRight = sizing[$marginRight] || $marginRight;
    }

    if ($marginBottom) {
      styles.marginBottom = sizing[$marginBottom] || $marginBottom;
    }

    if ($marginLeft) {
      styles.marginLeft = sizing[$marginLeft] || $marginLeft;
    }

    if ($padding) {
      styles.padding = sizing[$padding] || $padding;
    }

    if ($paddingTop) {
      styles.paddingTop = sizing[$paddingTop] || $paddingTop;
    }

    if ($marginRight) {
      styles.paddingRight = sizing[$marginRight] || $marginRight;
    }

    if ($paddingBottom) {
      styles.paddingBottom = sizing[$paddingBottom] || $paddingBottom;
    }

    if ($paddingLeft) {
      styles.paddingLeft = sizing[$paddingLeft] || $paddingLeft;
    }

    if ($wrap) {
      styles.flexWrap = 'wrap';
    }

    return styles;
  },
);
