/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {ThemeConsumer} from 'baseui';
import {Block} from 'baseui/block';

import {Header, ExampleWrapper} from './common';
import {themedStyled} from '../../pages/_app';

import type {ThemeT} from 'baseui';

const StyledColorWrapper = themedStyled<{
  $dark: boolean,
  $backgroundColor: string,
}>('div', ({$dark = false, $backgroundColor = '', $theme}) => {
  return {
    color: typeof $dark === 'string' ? $dark : $dark ? 'black' : 'white',
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
  theme,
}: {
  colors: {[string]: {color: string, dark: boolean | string}},
  theme: ThemeT,
}) {
  return (
    <StyledColorPreview>
      {Object.keys(colors).map(colorKey => {
        return (
          <ColorSwatch
            key={colorKey}
            colorName={colorKey}
            colorValue={theme.colors[colors[colorKey].color]}
            dark={
              typeof colors[colorKey].dark === 'string'
                ? theme.colors[colors[colorKey].dark]
                : colors[colorKey].dark
            }
          />
        );
      })}
    </StyledColorPreview>
  );
}

function Colors() {
  const primaryColors = {
    primary: {color: 'primary', dark: 'foregroundInv'},
    primary700: {color: 'primary700', dark: false},
    primary600: {color: 'primary600', dark: false},
    primary500: {color: 'primary500', dark: false},
    primary400: {color: 'primary400', dark: false},
    primary300: {color: 'primary300', dark: true},
    primary200: {color: 'primary200', dark: true},
    primary100: {color: 'primary100', dark: true},
    primary50: {color: 'primary50', dark: true},
  };

  const accentColors = {
    accent: {color: 'accent', dark: false},
    accent700: {color: 'accent700', dark: false},
    accent600: {color: 'accent600', dark: false},
    accent500: {color: 'accent500', dark: false},
    accent400: {color: 'accent400', dark: false},
    accent300: {color: 'accent300', dark: true},
    accent200: {color: 'accent200', dark: true},
    accent100: {color: 'accent100', dark: true},
    accent50: {color: 'accent50', dark: true},
  };

  const negativeColors = {
    negative: {color: 'negative', dark: false},
    negative700: {color: 'negative700', dark: false},
    negative600: {color: 'negative600', dark: false},
    negative500: {color: 'negative500', dark: false},
    negative400: {color: 'negative400', dark: false},
    negative300: {color: 'negative300', dark: true},
    negative200: {color: 'negative200', dark: true},
    negative100: {color: 'negative100', dark: true},
    negative50: {color: 'negative50', dark: true},
  };

  const warningColors = {
    warning: {color: 'warning', dark: false},
    warning700: {color: 'warning700', dark: false},
    warning600: {color: 'warning600', dark: false},
    warning500: {color: 'warning500', dark: false},
    warning400: {color: 'warning400', dark: false},
    warning300: {color: 'warning300', dark: true},
    warning200: {color: 'warning200', dark: true},
    warning100: {color: 'warning100', dark: true},
    warning50: {color: 'warning50', dark: true},
  };

  const positiveColors = {
    positive: {color: 'positive', dark: false},
    positive700: {color: 'positive700', dark: false},
    positive600: {color: 'positive600', dark: false},
    positive500: {color: 'positive500', dark: false},
    positive400: {color: 'positive400', dark: false},
    positive300: {color: 'positive300', dark: true},
    positive200: {color: 'positive200', dark: true},
    positive100: {color: 'positive100', dark: true},
    positive50: {color: 'positive50', dark: true},
  };

  const monoColors = {
    mono1000: {color: 'mono1000', dark: false},
    mono900: {color: 'mono900', dark: false},
    mono800: {color: 'mono800', dark: false},
    mono700: {color: 'mono700', dark: 'foreground'},
    mono600: {color: 'mono600', dark: 'foreground'},
    mono500: {color: 'mono500', dark: 'foreground'},
    mono400: {color: 'mono400', dark: 'foreground'},
    mono300: {color: 'mono300', dark: true},
    mono200: {color: 'mono200', dark: true},
    mono100: {color: 'mono100', dark: true},
  };

  const blackAndWhiteColors = {
    black: {color: 'black', dark: false},
    white: {color: 'white', dark: true},
  };

  const ratingColors = {
    rating400: {color: 'rating400', dark: true},
    rating200: {color: 'rating200', dark: true},
  };

  return (
    <ThemeConsumer>
      {theme => (
        <Block font="font200">
          <Header>Colors</Header>
          <ExampleWrapper>
            <ColorPreview colors={primaryColors} theme={theme} />
            <ColorPreview colors={accentColors} theme={theme} />
            <ColorPreview colors={negativeColors} theme={theme} />
            <ColorPreview colors={warningColors} theme={theme} />
            <ColorPreview colors={positiveColors} theme={theme} />
            <ColorPreview colors={monoColors} theme={theme} />
            <ColorPreview colors={ratingColors} theme={theme} />
            <ColorPreview colors={blackAndWhiteColors} theme={theme} />
          </ExampleWrapper>
        </Block>
      )}
    </ThemeConsumer>
  );
}

export default Colors;
