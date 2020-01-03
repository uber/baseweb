/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {LightTheme} from 'baseui';
import {Block} from 'baseui/block';
import type {BorderT} from 'baseui/styles/types';

import {Header, ExampleWrapper} from './common';
import {themedStyled} from '../../pages/_app';

const StyledBorderBox = themedStyled<{$border: BorderT}>(
  'div',
  ({$theme, $border = {}}) => {
    return {
      marginTop: $theme.sizing.scale200,
      height: $theme.sizing.scale4800,
      backgroundColor: $theme.colors.mono100,
      ...$border,
    };
  },
);

function BorderPreview({name, border}) {
  return (
    <Block width="250px" margin="scale800">
      <Block font="font300">
        {name} ({border.borderWidth} {border.borderStyle} {border.borderColor})
      </Block>
      <StyledBorderBox $border={border} />
    </Block>
  );
}

function Borders() {
  const borders = {
    border100: LightTheme.borders.border100,
    border200: LightTheme.borders.border200,
    border300: LightTheme.borders.border300,
    border400: LightTheme.borders.border400,
    border500: LightTheme.borders.border500,
    border600: LightTheme.borders.border600,
  };

  return (
    <div>
      <Header>Borders</Header>
      <ExampleWrapper>
        {Object.keys(borders).map(bordersKey => (
          <BorderPreview
            key={bordersKey}
            name={bordersKey}
            border={borders[bordersKey]}
          />
        ))}
      </ExampleWrapper>
    </div>
  );
}

export default Borders;
