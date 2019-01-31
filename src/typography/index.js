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
  <Block {...props} font={props.font || 'font200'} />
);

export const Caption2 = (props: BlockPropsT) => (
  <Block {...props} font={props.font || 'font250'} />
);

// Display
export const Display = (props: BlockPropsT) => (
  <Block {...props} font={props.font || 'font1100'} />
);

// Headings
export function H1(props: BlockPropsT) {
  const as = props.as || 'h1';
  return <Block as={as} {...props} font={props.font || 'font1000'} />;
}

export function H2(props: BlockPropsT) {
  const as = props.as || 'h2';
  return <Block as={as} {...props} font={props.font || 'font900'} />;
}

export function H3(props: BlockPropsT) {
  const as = props.as || 'h3';
  return <Block as={as} {...props} font={props.font || 'font800'} />;
}

export function H4(props: BlockPropsT) {
  const as = props.as || 'h4';
  return <Block as={as} {...props} font={props.font || 'font700'} />;
}

export function H5(props: BlockPropsT) {
  const as = props.as || 'h5';
  return <Block as={as} {...props} font={props.font || 'font600'} />;
}

export function H6(props: BlockPropsT) {
  const as = props.as || 'h6';
  return <Block as={as} {...props} font={props.font || 'font500'} />;
}

// Labels - aka Label1, Label2
export const Label1 = (props: BlockPropsT) => (
  <Block {...props} font={props.font || 'font350'} />
);

export const Label2 = (props: BlockPropsT) => (
  <Block {...props} font={props.font || 'font450'} />
);

// Paragraphs - Paragraph1, Paragraph2
export function Paragraph1(props: BlockPropsT) {
  const as = props.as || 'p';
  return <Block as={as} {...props} font={props.font || 'font300'} />;
}

export function Paragraph2(props: BlockPropsT) {
  const as = props.as || 'p';
  return <Block as={as} {...props} font={props.font || 'font400'} />;
}
