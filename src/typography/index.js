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
  <Block
    data-baseweb="typo-caption1"
    {...props}
    font={props.font || 'font200'}
    color={props.color || 'colorSecondary'}
  />
);

export const Caption2 = (props: BlockPropsT) => (
  <Block
    data-baseweb="typo-caption2"
    {...props}
    font={props.font || 'font250'}
    color={props.color || 'colorSecondary'}
  />
);

// Display
export const Display = (props: BlockPropsT) => (
  <Block
    data-baseweb="typo-display"
    {...props}
    font={props.font || 'font1100'}
    color={props.color || 'colorPrimary'}
  />
);

// Headings
export function H1(props: BlockPropsT) {
  const as = props.as || 'h1';
  return (
    <Block
      data-baseweb="typo-h1"
      as={as}
      {...props}
      font={props.font || 'font1000'}
      color={props.color || 'colorPrimary'}
    />
  );
}

export function H2(props: BlockPropsT) {
  const as = props.as || 'h2';
  return (
    <Block
      data-baseweb="typo-h2"
      as={as}
      {...props}
      font={props.font || 'font900'}
      color={props.color || 'colorPrimary'}
    />
  );
}

export function H3(props: BlockPropsT) {
  const as = props.as || 'h3';
  return (
    <Block
      data-baseweb="typo-h3"
      as={as}
      {...props}
      font={props.font || 'font800'}
      color={props.color || 'colorPrimary'}
    />
  );
}

export function H4(props: BlockPropsT) {
  const as = props.as || 'h4';
  return (
    <Block
      data-baseweb="typo-h4"
      as={as}
      {...props}
      font={props.font || 'font700'}
      color={props.color || 'colorPrimary'}
    />
  );
}

export function H5(props: BlockPropsT) {
  const as = props.as || 'h5';
  return (
    <Block
      data-baseweb="typo-h5"
      as={as}
      {...props}
      font={props.font || 'font600'}
      color={props.color || 'colorPrimary'}
    />
  );
}

export function H6(props: BlockPropsT) {
  const as = props.as || 'h6';
  return (
    <Block
      data-baseweb="typo-h6"
      as={as}
      {...props}
      font={props.font || 'font500'}
      color={props.color || 'colorPrimary'}
    />
  );
}

// Labels - aka Label1, Label2
export const Label1 = (props: BlockPropsT) => (
  <Block
    data-baseweb="typo-label1"
    {...props}
    font={props.font || 'font350'}
    color={props.color || 'colorPrimary'}
  />
);

export const Label2 = (props: BlockPropsT) => (
  <Block
    data-baseweb="typo-label2"
    {...props}
    font={props.font || 'font450'}
    color={props.color || 'colorPrimary'}
  />
);

// Paragraphs - Paragraph1, Paragraph2
export function Paragraph1(props: BlockPropsT) {
  const as = props.as || 'p';
  return (
    <Block
      data-baseweb="typo-p1"
      as={as}
      {...props}
      font={props.font || 'font300'}
      color={props.color || 'colorPrimary'}
    />
  );
}

export function Paragraph2(props: BlockPropsT) {
  const as = props.as || 'p';
  return (
    <Block
      data-baseweb="typo-p2"
      as={as}
      {...props}
      font={props.font || 'font400'}
      color={props.color || 'colorPrimary'}
    />
  );
}
