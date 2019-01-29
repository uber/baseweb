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
export const Caption1 = (props: BlockPropsT) => (
  <Block font="font200" {...props} />
);

export const Caption2 = (props: BlockPropsT) => (
  <Block font="font250" {...props} />
);

// Display
export const Display = (props: BlockPropsT) => (
  <Block font="font1100" {...props} />
);

// Headings
export function H1(props: BlockPropsT) {
  const as = props.as || 'h1';
  return <Block as={as} font="font1000" {...props} />;
}

export function H2(props: BlockPropsT) {
  const as = props.as || 'h2';
  return <Block as={as} font="font900" {...props} />;
}

export function H3(props: BlockPropsT) {
  const as = props.as || 'h3';
  return <Block as={as} font="font800" {...props} />;
}

export function H4(props: BlockPropsT) {
  const as = props.as || 'h4';
  return <Block as={as} font="font700" {...props} />;
}

export function H5(props: BlockPropsT) {
  const as = props.as || 'h5';
  return <Block as={as} font="font600" {...props} />;
}

export function H6(props: BlockPropsT) {
  const as = props.as || 'h6';
  return <Block as={as} font="font500" {...props} />;
}

// Labels - aka Label1, Label2
export const Label1 = (props: BlockPropsT) => (
  <Block font="font350" {...props} />
);

export const Label2 = (props: BlockPropsT) => (
  <Block font="font450" {...props} />
);

// Paragraphs - Paragraph1, Paragraph2
export function Paragraph1(props: BlockPropsT) {
  const as = props.as || 'p';
  return <Block as={as} font="font300" {...props} />;
}

export function Paragraph2(props: BlockPropsT) {
  const as = props.as || 'p';
  return <Block as={as} font="font400" {...props} />;
}
