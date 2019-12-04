/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import Block from '../block/block.js';
import type {BlockPropsT} from '../block/types.js';

export const DisplayLarge = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-displaylarge"
      {...props}
      font={props.font || 'font1450'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
DisplayLarge.displayName = 'DisplayLarge';

export const DisplayMedium = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-displaymedium"
      {...props}
      font={props.font || 'font1350'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
DisplayMedium.displayName = 'DisplayMedium';

export const DisplaySmall = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-displaysmall"
      {...props}
      font={props.font || 'font1250'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
DisplaySmall.displayName = 'DisplaySmall';

export const DisplayXSmall = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-displayxsmall"
      {...props}
      font={props.font || 'font1150'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
DisplayXSmall.displayName = 'DisplayXSmall';

export const HeadingXXLarge = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-headingxxlarge"
      as={props.as || 'h1'}
      {...props}
      font={props.font || 'font1050'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
HeadingXXLarge.displayName = 'HeadingXXLarge';

export const HeadingXLarge = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-headingxlarge"
      as={props.as || 'h2'}
      {...props}
      font={props.font || 'font950'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
HeadingXLarge.displayName = 'HeadingXLarge';

export const HeadingLarge = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-headinglarge"
      as={props.as || 'h3'}
      {...props}
      font={props.font || 'font850'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
HeadingLarge.displayName = 'HeadingLarge';

export const HeadingMedium = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-headingmedium"
      as={props.as || 'h4'}
      {...props}
      font={props.font || 'font750'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
HeadingMedium.displayName = 'HeadingMedium';

export const HeadingSmall = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-headingsmall"
      as={props.as || 'h5'}
      {...props}
      font={props.font || 'font650'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
HeadingSmall.displayName = 'HeadingSmall';

export const HeadingXSmall = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-headingxsmall"
      as={props.as || 'h6'}
      {...props}
      font={props.font || 'font550'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
HeadingXSmall.displayName = 'HeadingXSmall';

export const LabelLarge = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-labellarge"
      {...props}
      font={props.font || 'font450'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
LabelLarge.displayName = 'LabelLarge';

export const LabelMedium = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-labelmedium"
      {...props}
      font={props.font || 'font350'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
LabelMedium.displayName = 'LabelMedium';

export const LabelSmall = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-labelsmall"
      {...props}
      font={props.font || 'font250'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
LabelSmall.displayName = 'LabelSmall';

export const LabelXSmall = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-labelxsmall"
      {...props}
      font={props.font || 'font150'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
LabelXSmall.displayName = 'LabelXSmall';

export const ParagraphLarge = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-paragraphlarge"
      as={props.as || 'p'}
      {...props}
      font={props.font || 'font400'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
ParagraphLarge.displayName = 'ParagraphLarge';

export const ParagraphMedium = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-paragraphmedium"
      as={props.as || 'p'}
      {...props}
      font={props.font || 'font300'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
ParagraphMedium.displayName = 'ParagraphMedium';

export const ParagraphSmall = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-paragraphsmall"
      as={props.as || 'p'}
      {...props}
      font={props.font || 'font200'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
ParagraphSmall.displayName = 'ParagraphSmall';

export const ParagraphXSmall = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-paragraphxsmall"
      as={props.as || 'p'}
      {...props}
      font={props.font || 'font100'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
ParagraphXSmall.displayName = 'ParagraphXSmall';

// TODO(v10): remove
// Aliases for backwards compatability
export const Display = DisplayLarge;
export const Display1 = DisplayLarge;
export const Display2 = DisplayMedium;
export const Display3 = DisplaySmall;
export const Display4 = DisplayXSmall;
export const H1 = HeadingXXLarge;
export const H2 = HeadingXLarge;
export const H3 = HeadingLarge;
export const H4 = HeadingMedium;
export const H5 = HeadingSmall;
export const H6 = HeadingXSmall;
export const Paragraph1 = ParagraphLarge;
export const Paragraph2 = ParagraphMedium;
export const Paragraph3 = ParagraphSmall;
export const Paragraph4 = ParagraphXSmall;
export const Label1 = LabelLarge;
export const Label2 = LabelMedium;
export const Label3 = LabelSmall;
export const Label4 = LabelXSmall;

export const Caption1 = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Paragraph4 {...props} color={props.color || 'colorSecondary'} ref={ref} />
  ),
);
Caption1.displayName = 'Caption1';
export const Caption2 = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => <Label4 {...props} color={props.color || 'colorSecondary'} />,
);
Caption2.displayName = 'Caption2';
