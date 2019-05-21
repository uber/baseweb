/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {LightTheme} from 'baseui';
import {Block} from 'baseui/block';

import {Header} from './common';

function TypographyPreview({font}) {
  const {fontSize, fontWeight, lineHeight} = LightTheme.typography[font];

  return (
    <Block margin="scale800">
      <Block font="font400">{font}</Block>
      <Block font={font}>
        We ignite opportunity by setting the world in motion.
      </Block>
      <Block font="font100">
        {`(font-size: ${fontSize}, font-weight: ${fontWeight}, line-height: ${lineHeight})`}
      </Block>
    </Block>
  );
}

function Typography() {
  const typography = [
    'font100',
    'font200',
    'font250',
    'font300',
    'font350',
    'font400',
    'font450',
    'font500',
    'font600',
    'font700',
    'font800',
    'font900',
    'font1000',
  ];

  return (
    <div>
      <Header>Typography</Header>
      {typography.map(font => (
        <TypographyPreview key={font} font={font} />
      ))}
    </div>
  );
}

export default Typography;
