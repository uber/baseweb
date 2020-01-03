/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {LightTheme} from 'baseui';
import {Block} from 'baseui/block';

import {Header, ExampleWrapper} from './common';
import {themedStyled} from '../../pages/_app';

const StyledSizeBox = themedStyled<{$size: string}>(
  'div',
  ({$size, $theme}) => {
    return {
      backgroundColor: $theme.colors.primary,
      marginTop: $theme.sizing.scale100,
      width: $size,
      height: $size,
    };
  },
);

function SizePreview({name, size}) {
  return (
    <Block width="250px">
      <Block font="font300">
        {name} ({size})
      </Block>
      <StyledSizeBox $size={size} />
    </Block>
  );
}

function Sizing() {
  const sizing = {
    scale0: LightTheme.sizing.scale0,
    scale100: LightTheme.sizing.scale100,
    scale200: LightTheme.sizing.scale200,
    scale300: LightTheme.sizing.scale300,
    scale400: LightTheme.sizing.scale400,
    scale500: LightTheme.sizing.scale500,
    scale600: LightTheme.sizing.scale600,
    scale700: LightTheme.sizing.scale700,
    scale800: LightTheme.sizing.scale800,
    scale900: LightTheme.sizing.scale900,
    scale1000: LightTheme.sizing.scale1000,
    scale1200: LightTheme.sizing.scale1200,
    scale1400: LightTheme.sizing.scale1400,
    scale1600: LightTheme.sizing.scale1600,
    scale2400: LightTheme.sizing.scale2400,
    scale3200: LightTheme.sizing.scale3200,
    scale4800: LightTheme.sizing.scale4800,
  };

  return (
    <div>
      <Header>Sizing</Header>
      <ExampleWrapper>
        {Object.keys(sizing).map(sizeKey => (
          <SizePreview key={sizeKey} name={sizeKey} size={sizing[sizeKey]} />
        ))}
      </ExampleWrapper>
    </div>
  );
}

export default Sizing;
