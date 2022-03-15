/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import Block from '../block/block.js';
import type { BlockPropsT } from '../block/types.js';

export const DisplayLarge = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-displaylarge"
    {...props}
    font={props.font || 'DisplayLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
DisplayLarge.displayName = 'DisplayLarge';

export const DisplayMedium = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-displaymedium"
    {...props}
    font={props.font || 'DisplayMedium'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
DisplayMedium.displayName = 'DisplayMedium';

export const DisplaySmall = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-displaysmall"
    {...props}
    font={props.font || 'DisplaySmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
DisplaySmall.displayName = 'DisplaySmall';

export const DisplayXSmall = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-displayxsmall"
    {...props}
    font={props.font || 'DisplayXSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
DisplayXSmall.displayName = 'DisplayXSmall';

export const HeadingXXLarge = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-headingxxlarge"
    as={props.as || 'h1'}
    {...props}
    font={props.font || 'HeadingXXLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
HeadingXXLarge.displayName = 'HeadingXXLarge';

export const HeadingXLarge = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-headingxlarge"
    as={props.as || 'h2'}
    {...props}
    font={props.font || 'HeadingXLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
HeadingXLarge.displayName = 'HeadingXLarge';

export const HeadingLarge = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-headinglarge"
    as={props.as || 'h3'}
    {...props}
    font={props.font || 'HeadingLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
HeadingLarge.displayName = 'HeadingLarge';

export const HeadingMedium = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-headingmedium"
    as={props.as || 'h4'}
    {...props}
    font={props.font || 'HeadingMedium'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
HeadingMedium.displayName = 'HeadingMedium';

export const HeadingSmall = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-headingsmall"
    as={props.as || 'h5'}
    {...props}
    font={props.font || 'HeadingSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
HeadingSmall.displayName = 'HeadingSmall';

export const HeadingXSmall = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-headingxsmall"
    as={props.as || 'h6'}
    {...props}
    font={props.font || 'HeadingXSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
HeadingXSmall.displayName = 'HeadingXSmall';

export const LabelLarge = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-labellarge"
    {...props}
    font={props.font || 'LabelLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
LabelLarge.displayName = 'LabelLarge';

export const LabelMedium = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-labelmedium"
    {...props}
    font={props.font || 'LabelMedium'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
LabelMedium.displayName = 'LabelMedium';

export const LabelSmall = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-labelsmall"
    {...props}
    font={props.font || 'LabelSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
LabelSmall.displayName = 'LabelSmall';

export const LabelXSmall = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-labelxsmall"
    {...props}
    font={props.font || 'LabelXSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
LabelXSmall.displayName = 'LabelXSmall';

export const ParagraphLarge = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-paragraphlarge"
    as={props.as || 'p'}
    {...props}
    font={props.font || 'ParagraphLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
ParagraphLarge.displayName = 'ParagraphLarge';

export const ParagraphMedium = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-paragraphmedium"
    as={props.as || 'p'}
    {...props}
    font={props.font || 'ParagraphMedium'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
ParagraphMedium.displayName = 'ParagraphMedium';

export const ParagraphSmall = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-paragraphsmall"
    as={props.as || 'p'}
    {...props}
    font={props.font || 'ParagraphSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
ParagraphSmall.displayName = 'ParagraphSmall';

export const ParagraphXSmall = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-paragraphxsmall"
    as={props.as || 'p'}
    {...props}
    font={props.font || 'ParagraphXSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
ParagraphXSmall.displayName = 'ParagraphXSmall';

export const MonoDisplayLarge = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monodisplaylarge"
    {...props}
    font={props.font || 'MonoDisplayLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoDisplayLarge.displayName = 'MonoDisplayLarge';

export const MonoDisplayMedium = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monodisplaymedium"
    {...props}
    font={props.font || 'MonoDisplayMedium'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoDisplayMedium.displayName = 'MonoDisplayMedium';

export const MonoDisplaySmall = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monodisplaysmall"
    {...props}
    font={props.font || 'MonoDisplaySmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoDisplaySmall.displayName = 'MonoDisplaySmall';

export const MonoDisplayXSmall = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monodisplayxsmall"
    {...props}
    font={props.font || 'MonoDisplayXSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoDisplayXSmall.displayName = 'MonoDisplayXSmall';

export const MonoHeadingXXLarge = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monoheadingxxlarge"
    as={props.as || 'h1'}
    {...props}
    font={props.font || 'MonoHeadingXXLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoHeadingXXLarge.displayName = 'MonoHeadingXXLarge';

export const MonoHeadingXLarge = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monoheadingxlarge"
    as={props.as || 'h2'}
    {...props}
    font={props.font || 'MonoHeadingXLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoHeadingXLarge.displayName = 'MonoHeadingXLarge';

export const MonoHeadingLarge = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monoheadinglarge"
    as={props.as || 'h3'}
    {...props}
    font={props.font || 'MonoHeadingLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoHeadingLarge.displayName = 'MonoHeadingLarge';

export const MonoHeadingMedium = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monoheadingmedium"
    as={props.as || 'h4'}
    {...props}
    font={props.font || 'MonoHeadingMedium'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoHeadingMedium.displayName = 'MonoHeadingMedium';

export const MonoHeadingSmall = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monoheadingsmall"
    as={props.as || 'h5'}
    {...props}
    font={props.font || 'MonoHeadingSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoHeadingSmall.displayName = 'MonoHeadingSmall';

export const MonoHeadingXSmall = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monoheadingxsmall"
    as={props.as || 'h6'}
    {...props}
    font={props.font || 'MonoHeadingXSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoHeadingXSmall.displayName = 'MonoHeadingXSmall';

export const MonoLabelLarge = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monolabellarge"
    {...props}
    font={props.font || 'MonoLabelLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoLabelLarge.displayName = 'MonoLabelLarge';

export const MonoLabelMedium = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monolabelmedium"
    {...props}
    font={props.font || 'MonoLabelMedium'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoLabelMedium.displayName = 'MonoLabelMedium';

export const MonoLabelSmall = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monolabelsmall"
    {...props}
    font={props.font || 'MonoLabelSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoLabelSmall.displayName = 'MonoLabelSmall';

export const MonoLabelXSmall = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monolabelxsmall"
    {...props}
    font={props.font || 'MonoLabelXSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoLabelXSmall.displayName = 'MonoLabelXSmall';

export const MonoParagraphLarge = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monoparagraphlarge"
    as={props.as || 'p'}
    {...props}
    font={props.font || 'MonoParagraphLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoParagraphLarge.displayName = 'MonoParagraphLarge';

export const MonoParagraphMedium = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monoparagraphmedium"
    as={props.as || 'p'}
    {...props}
    font={props.font || 'MonoParagraphMedium'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoParagraphMedium.displayName = 'MonoParagraphMedium';

export const MonoParagraphSmall = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monoparagraphsmall"
    as={props.as || 'p'}
    {...props}
    font={props.font || 'MonoParagraphSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoParagraphSmall.displayName = 'MonoParagraphSmall';

export const MonoParagraphXSmall = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  // $FlowExpectedError[cannot-spread-inexact]
  <Block
    data-baseweb="typo-monoparagraphxsmall"
    as={props.as || 'p'}
    {...props}
    font={props.font || 'MonoParagraphXSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
));
MonoParagraphXSmall.displayName = 'MonoParagraphXSmall';
