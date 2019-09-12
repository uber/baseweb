/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import Block from '../block/block.js';
import type {BlockPropsT} from '../block/types.js';

export const Display1 = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-display1"
      {...props}
      font={props.font || 'font1450'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
Display1.displayName = 'Display1';

export const Display2 = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-display2"
      {...props}
      font={props.font || 'font1350'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
Display2.displayName = 'Display2';

export const Display3 = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-display3"
      {...props}
      font={props.font || 'font1250'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
Display3.displayName = 'Display3';

export const Display4 = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-display4"
      {...props}
      font={props.font || 'font1150'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
Display4.displayName = 'Display4';

export const H1 = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  <Block
    data-baseweb="typo-h1"
    as={props.as || 'h1'}
    {...props}
    font={props.font || 'font1050'}
    color={props.color || 'colorPrimary'}
    ref={ref}
  />
));
H1.displayName = 'H1';

export const H2 = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  <Block
    data-baseweb="typo-h2"
    as={props.as || 'h2'}
    {...props}
    font={props.font || 'font950'}
    color={props.color || 'colorPrimary'}
    ref={ref}
  />
));
H2.displayName = 'H2';

export const H3 = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  <Block
    data-baseweb="typo-h3"
    as={props.as || 'h3'}
    {...props}
    font={props.font || 'font850'}
    color={props.color || 'colorPrimary'}
    ref={ref}
  />
));
H3.displayName = 'H3';

export const H4 = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  <Block
    data-baseweb="typo-h4"
    as={props.as || 'h4'}
    {...props}
    font={props.font || 'font750'}
    color={props.color || 'colorPrimary'}
    ref={ref}
  />
));
H4.displayName = 'H4';

export const H5 = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  <Block
    data-baseweb="typo-h5"
    as={props.as || 'h5'}
    {...props}
    font={props.font || 'font650'}
    color={props.color || 'colorPrimary'}
    ref={ref}
  />
));
H5.displayName = 'H5';

export const H6 = React.forwardRef<BlockPropsT, HTMLElement>((props, ref) => (
  <Block
    data-baseweb="typo-h6"
    as={props.as || 'h6'}
    {...props}
    font={props.font || 'font550'}
    color={props.color || 'colorPrimary'}
    ref={ref}
  />
));
H6.displayName = 'H6';

export const Label1 = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-label1"
      {...props}
      font={props.font || 'font450'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
Label1.displayName = 'Label1';

export const Label2 = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-label2"
      {...props}
      font={props.font || 'font350'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
Label2.displayName = 'Label2';

export const Label3 = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-label3"
      {...props}
      font={props.font || 'font250'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
Label3.displayName = 'Label3';

export const Label4 = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-label4"
      {...props}
      font={props.font || 'font150'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
Label4.displayName = 'Label4';

export const Paragraph1 = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-p1"
      as={props.as || 'p'}
      {...props}
      font={props.font || 'font400'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
Paragraph1.displayName = 'Paragraph1';

export const Paragraph2 = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-p2"
      as={props.as || 'p'}
      {...props}
      font={props.font || 'font300'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
Paragraph2.displayName = 'Paragraph2';

export const Paragraph3 = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-p3"
      as={props.as || 'p'}
      {...props}
      font={props.font || 'font200'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
Paragraph3.displayName = 'Paragraph3';

export const Paragraph4 = React.forwardRef<BlockPropsT, HTMLElement>(
  (props, ref) => (
    <Block
      data-baseweb="typo-p4"
      as={props.as || 'p'}
      {...props}
      font={props.font || 'font100'}
      color={props.color || 'colorPrimary'}
      ref={ref}
    />
  ),
);
Paragraph4.displayName = 'Paragraph4';

// Aliases for backwards compatability
export const Display = Display1;
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
