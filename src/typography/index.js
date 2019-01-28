/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import Block from '../block/block.js';
import type {BlockPropsT} from '../block/types.js';

// Captions - aka Caption, CaptionLabel
export function Caption1(props: BlockPropsT) {
  const {children, ...otherProps} = props;
  return (
    <Block font="font200" {...otherProps}>
      {children}
    </Block>
  );
}

export function Caption2(props: BlockPropsT) {
  const {children, ...otherProps} = props;
  return (
    <Block font="font250" {...otherProps}>
      {children}
    </Block>
  );
}

// Display
export function Display(props: BlockPropsT) {
  const {children, ...otherProps} = props;
  return (
    <Block font="font1100" {...otherProps}>
      {children}
    </Block>
  );
}

// Headings
export function H1(props: BlockPropsT) {
  const {children, ...otherProps} = props;
  return (
    <Block as="h1" font="font1000" {...otherProps}>
      {children}
    </Block>
  );
}

export function H2(props: BlockPropsT) {
  const {children, ...otherProps} = props;
  return (
    <Block as="h2" font="font900" {...otherProps}>
      {children}
    </Block>
  );
}

export function H3(props: BlockPropsT) {
  const {children, ...otherProps} = props;
  return (
    <Block as="h3" font="font800" {...otherProps}>
      {children}
    </Block>
  );
}

export function H4(props: BlockPropsT) {
  const {children, ...otherProps} = props;
  return (
    <Block as="h4" font="font700" {...otherProps}>
      {children}
    </Block>
  );
}

export function H5(props: BlockPropsT) {
  const {children, ...otherProps} = props;
  return (
    <Block as="h5" font="font600" {...otherProps}>
      {children}
    </Block>
  );
}

export function H6(props: BlockPropsT) {
  const {children, ...otherProps} = props;
  return (
    <Block as="h6" font="font500" {...otherProps}>
      {children}
    </Block>
  );
}

// Labels - aka Label1, Label2 - should they be *50 which is bold or *00?
export function Label1(props: BlockPropsT) {
  const {children, ...otherProps} = props;
  return (
    <Block font="font350" {...otherProps}>
      {children}
    </Block>
  );
}

export function Label2(props: BlockPropsT) {
  const {children, ...otherProps} = props;
  return (
    <Block font="font450" {...otherProps}>
      {children}
    </Block>
  );
}

// Paragraphs - Paragraph1, Paragraph2
export function Paragraph1(props: BlockPropsT) {
  const {children, ...otherProps} = props;
  return (
    <Block as="p" font="font300" {...otherProps}>
      {children}
    </Block>
  );
}

export function Paragraph2(props: BlockPropsT) {
  const {children, ...otherProps} = props;
  return (
    <Block as="p" font="font400" {...otherProps}>
      {children}
    </Block>
  );
}
