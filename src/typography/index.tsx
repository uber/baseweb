/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { Block, type BlockComponentType } from '../block';

export const DisplayLarge = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-displaylarge"
    {...props}
    font={props.font || 'DisplayLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'div'>;
DisplayLarge.displayName = 'DisplayLarge';

export const DisplayMedium = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-displaymedium"
    {...props}
    font={props.font || 'DisplayMedium'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'div'>;
DisplayMedium.displayName = 'DisplayMedium';

export const DisplaySmall = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-displaysmall"
    {...props}
    font={props.font || 'DisplaySmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'div'>;
DisplaySmall.displayName = 'DisplaySmall';

export const DisplayXSmall = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-displayxsmall"
    {...props}
    font={props.font || 'DisplayXSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'div'>;
DisplayXSmall.displayName = 'DisplayXSmall';

export const HeadingXXLarge = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-headingxxlarge"
    as={props.as || 'h1'}
    {...props}
    font={props.font || 'HeadingXXLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'h1'>;
HeadingXXLarge.displayName = 'HeadingXXLarge';

export const HeadingXLarge = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-headingxlarge"
    as={props.as || 'h2'}
    {...props}
    font={props.font || 'HeadingXLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'h2'>;
HeadingXLarge.displayName = 'HeadingXLarge';

export const HeadingLarge = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-headinglarge"
    as={props.as || 'h3'}
    {...props}
    font={props.font || 'HeadingLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'h3'>;
HeadingLarge.displayName = 'HeadingLarge';

export const HeadingMedium = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-headingmedium"
    as={props.as || 'h4'}
    {...props}
    font={props.font || 'HeadingMedium'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'h4'>;
HeadingMedium.displayName = 'HeadingMedium';

export const HeadingSmall = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-headingsmall"
    as={props.as || 'h5'}
    {...props}
    font={props.font || 'HeadingSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'h5'>;
HeadingSmall.displayName = 'HeadingSmall';

export const HeadingXSmall = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-headingxsmall"
    as={props.as || 'h6'}
    {...props}
    font={props.font || 'HeadingXSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'h6'>;
HeadingXSmall.displayName = 'HeadingXSmall';

export const LabelLarge = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-labellarge"
    {...props}
    font={props.font || 'LabelLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'div'>;
LabelLarge.displayName = 'LabelLarge';

export const LabelMedium = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-labelmedium"
    {...props}
    font={props.font || 'LabelMedium'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'div'>;
LabelMedium.displayName = 'LabelMedium';

export const LabelSmall = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-labelsmall"
    {...props}
    font={props.font || 'LabelSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'div'>;
LabelSmall.displayName = 'LabelSmall';

export const LabelXSmall = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-labelxsmall"
    {...props}
    font={props.font || 'LabelXSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'div'>;
LabelXSmall.displayName = 'LabelXSmall';

export const ParagraphLarge = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-paragraphlarge"
    as={props.as || 'p'}
    {...props}
    font={props.font || 'ParagraphLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'p'>;
ParagraphLarge.displayName = 'ParagraphLarge';

export const ParagraphMedium = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-paragraphmedium"
    as={props.as || 'p'}
    {...props}
    font={props.font || 'ParagraphMedium'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'p'>;
ParagraphMedium.displayName = 'ParagraphMedium';

export const ParagraphSmall = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-paragraphsmall"
    as={props.as || 'p'}
    {...props}
    font={props.font || 'ParagraphSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'div'>;
ParagraphSmall.displayName = 'ParagraphSmall';

export const ParagraphXSmall = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-paragraphxsmall"
    as={props.as || 'p'}
    {...props}
    font={props.font || 'ParagraphXSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'p'>;
ParagraphXSmall.displayName = 'ParagraphXSmall';

export const MonoDisplayLarge = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monodisplaylarge"
    {...props}
    font={props.font || 'MonoDisplayLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'div'>;
MonoDisplayLarge.displayName = 'MonoDisplayLarge';

export const MonoDisplayMedium = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monodisplaymedium"
    {...props}
    font={props.font || 'MonoDisplayMedium'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'div'>;
MonoDisplayMedium.displayName = 'MonoDisplayMedium';

export const MonoDisplaySmall = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monodisplaysmall"
    {...props}
    font={props.font || 'MonoDisplaySmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'div'>;
MonoDisplaySmall.displayName = 'MonoDisplaySmall';

export const MonoDisplayXSmall = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monodisplayxsmall"
    {...props}
    font={props.font || 'MonoDisplayXSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'div'>;
MonoDisplayXSmall.displayName = 'MonoDisplayXSmall';

export const MonoHeadingXXLarge = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monoheadingxxlarge"
    as={props.as || 'h1'}
    {...props}
    font={props.font || 'MonoHeadingXXLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'h1'>;
MonoHeadingXXLarge.displayName = 'MonoHeadingXXLarge';

export const MonoHeadingXLarge = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monoheadingxlarge"
    as={props.as || 'h2'}
    {...props}
    font={props.font || 'MonoHeadingXLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'h2'>;
MonoHeadingXLarge.displayName = 'MonoHeadingXLarge';

export const MonoHeadingLarge = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monoheadinglarge"
    as={props.as || 'h3'}
    {...props}
    font={props.font || 'MonoHeadingLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'h3'>;
MonoHeadingLarge.displayName = 'MonoHeadingLarge';

export const MonoHeadingMedium = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monoheadingmedium"
    as={props.as || 'h4'}
    {...props}
    font={props.font || 'MonoHeadingMedium'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'h4'>;
MonoHeadingMedium.displayName = 'MonoHeadingMedium';

export const MonoHeadingSmall = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monoheadingsmall"
    as={props.as || 'h5'}
    {...props}
    font={props.font || 'MonoHeadingSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'h5'>;
MonoHeadingSmall.displayName = 'MonoHeadingSmall';

export const MonoHeadingXSmall = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monoheadingxsmall"
    as={props.as || 'h6'}
    {...props}
    font={props.font || 'MonoHeadingXSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'h6'>;
MonoHeadingXSmall.displayName = 'MonoHeadingXSmall';

export const MonoLabelLarge = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monolabellarge"
    {...props}
    font={props.font || 'MonoLabelLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'div'>;
MonoLabelLarge.displayName = 'MonoLabelLarge';

export const MonoLabelMedium = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monolabelmedium"
    {...props}
    font={props.font || 'MonoLabelMedium'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'div'>;
MonoLabelMedium.displayName = 'MonoLabelMedium';

export const MonoLabelSmall = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monolabelsmall"
    {...props}
    font={props.font || 'MonoLabelSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'div'>;
MonoLabelSmall.displayName = 'MonoLabelSmall';

export const MonoLabelXSmall = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monolabelxsmall"
    {...props}
    font={props.font || 'MonoLabelXSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'div'>;
MonoLabelXSmall.displayName = 'MonoLabelXSmall';

export const MonoParagraphLarge = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monoparagraphlarge"
    as={props.as || 'p'}
    {...props}
    font={props.font || 'MonoParagraphLarge'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'p'>;
MonoParagraphLarge.displayName = 'MonoParagraphLarge';

export const MonoParagraphMedium = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monoparagraphmedium"
    as={props.as || 'p'}
    {...props}
    font={props.font || 'MonoParagraphMedium'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'p'>;
MonoParagraphMedium.displayName = 'MonoParagraphMedium';

export const MonoParagraphSmall = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monoparagraphsmall"
    as={props.as || 'p'}
    {...props}
    font={props.font || 'MonoParagraphSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'p'>;
MonoParagraphSmall.displayName = 'MonoParagraphSmall';

export const MonoParagraphXSmall = React.forwardRef((props, ref) => (
  <Block
    data-baseweb="typo-monoparagraphxsmall"
    as={props.as || 'p'}
    {...props}
    font={props.font || 'MonoParagraphXSmall'}
    color={props.color || 'contentPrimary'}
    ref={ref}
  />
)) as BlockComponentType<'p'>;
MonoParagraphXSmall.displayName = 'MonoParagraphXSmall';
