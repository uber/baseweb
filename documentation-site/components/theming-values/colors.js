/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {LightTheme} from 'baseui';
import {Block} from 'baseui/block';

import {Header, ExampleWrapper} from './common';
import {themedStyled} from '../../pages/_app';

const StyledColorWrapper = themedStyled<{
  $dark: boolean,
  $backgroundColor: string,
}>('div', ({$dark = false, $backgroundColor = '', $theme}) => {
  return {
    color: $dark ? 'black' : 'white',
    backgroundColor: $backgroundColor,
    display: 'flex',
    justifyContent: 'space-between',
    padding: $theme.sizing.scale300,
    width: '250px',
  };
});

const StyledColorPreview = themedStyled<{}>('div', ({$theme}) => {
  return {
    marginTop: $theme.sizing.scale400,
    marginRight: $theme.sizing.scale400,
    marginBottom: $theme.sizing.scale400,
    marginLeft: $theme.sizing.scale400,
  };
});

function ColorSwatch({dark, colorName, colorValue}) {
  return (
    <StyledColorWrapper $dark={dark} $backgroundColor={colorValue}>
      <span>{colorName}</span>
      <span>{colorValue}</span>
    </StyledColorWrapper>
  );
}

function ColorPreview({
  colors,
}: {
  colors: {[string]: {color: string, dark: boolean}},
}) {
  return (
    <StyledColorPreview>
      {Object.keys(colors).map(colorKey => {
        return (
          <ColorSwatch
            key={colorKey}
            colorName={colorKey}
            colorValue={colors[colorKey].color}
            dark={colors[colorKey].dark}
          />
        );
      })}
    </StyledColorPreview>
  );
}

function Colors() {
  const primaryColors = {
    primary: {color: LightTheme.colors.primary, dark: false},
    primary700: {color: LightTheme.colors.primary700, dark: false},
    primary600: {color: LightTheme.colors.primary600, dark: false},
    primary500: {color: LightTheme.colors.primary500, dark: false},
    primary400: {color: LightTheme.colors.primary400, dark: false},
    primary300: {color: LightTheme.colors.primary300, dark: true},
    primary200: {color: LightTheme.colors.primary200, dark: true},
    primary100: {color: LightTheme.colors.primary100, dark: true},
    primary50: {color: LightTheme.colors.primary50, dark: true},
  };

  const accentColors = {
    accent: {color: LightTheme.colors.accent, dark: false},
    accent700: {color: LightTheme.colors.accent700, dark: false},
    accent600: {color: LightTheme.colors.accent600, dark: false},
    accent500: {color: LightTheme.colors.accent500, dark: false},
    accent400: {color: LightTheme.colors.accent400, dark: false},
    accent300: {color: LightTheme.colors.accent300, dark: true},
    accent200: {color: LightTheme.colors.accent200, dark: true},
    accent100: {color: LightTheme.colors.accent100, dark: true},
    accent50: {color: LightTheme.colors.accent50, dark: true},
  };

  const negativeColors = {
    negative: {color: LightTheme.colors.negative, dark: false},
    negative700: {color: LightTheme.colors.negative700, dark: false},
    negative600: {color: LightTheme.colors.negative600, dark: false},
    negative500: {color: LightTheme.colors.negative500, dark: false},
    negative400: {color: LightTheme.colors.negative400, dark: false},
    negative300: {color: LightTheme.colors.negative300, dark: true},
    negative200: {color: LightTheme.colors.negative200, dark: true},
    negative100: {color: LightTheme.colors.negative100, dark: true},
    negative50: {color: LightTheme.colors.negative50, dark: true},
  };

  const warningColors = {
    warning: {color: LightTheme.colors.warning, dark: false},
    warning700: {color: LightTheme.colors.warning700, dark: false},
    warning600: {color: LightTheme.colors.warning600, dark: false},
    warning500: {color: LightTheme.colors.warning500, dark: false},
    warning400: {color: LightTheme.colors.warning400, dark: false},
    warning300: {color: LightTheme.colors.warning300, dark: true},
    warning200: {color: LightTheme.colors.warning200, dark: true},
    warning100: {color: LightTheme.colors.warning100, dark: true},
    warning50: {color: LightTheme.colors.warning50, dark: true},
  };

  const positiveColors = {
    positive: {color: LightTheme.colors.positive, dark: false},
    positive700: {color: LightTheme.colors.positive700, dark: false},
    positive600: {color: LightTheme.colors.positive600, dark: false},
    positive500: {color: LightTheme.colors.positive500, dark: false},
    positive400: {color: LightTheme.colors.positive400, dark: false},
    positive300: {color: LightTheme.colors.positive300, dark: true},
    positive200: {color: LightTheme.colors.positive200, dark: true},
    positive100: {color: LightTheme.colors.positive100, dark: true},
    positive50: {color: LightTheme.colors.positive50, dark: true},
  };

  const monoColors = {
    mono100: {color: LightTheme.colors.mono100, dark: true},
    mono200: {color: LightTheme.colors.mono200, dark: true},
    mono300: {color: LightTheme.colors.mono300, dark: true},
    mono400: {color: LightTheme.colors.mono400, dark: true},
    mono500: {color: LightTheme.colors.mono500, dark: true},
    mono600: {color: LightTheme.colors.mono600, dark: true},
    mono700: {color: LightTheme.colors.mono700, dark: true},
    mono800: {color: LightTheme.colors.mono800, dark: false},
    mono900: {color: LightTheme.colors.mono900, dark: false},
    mono1000: {color: LightTheme.colors.mono1000, dark: false},
  };

  const ratingColors = {
    rating200: {color: LightTheme.colors.rating200, dark: true},
    rating400: {color: LightTheme.colors.rating400, dark: true},
  };

  return (
    <Block font="font200">
      <Header>Colors</Header>
      <ExampleWrapper>
        <ColorPreview colors={primaryColors} />
        <ColorPreview colors={accentColors} />
        <ColorPreview colors={negativeColors} />
        <ColorPreview colors={warningColors} />
        <ColorPreview colors={positiveColors} />
        <ColorPreview colors={monoColors} />
        <ColorPreview colors={ratingColors} />
      </ExampleWrapper>
    </Block>
  );
}

export default Colors;
