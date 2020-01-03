/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {ThemeConsumer} from 'baseui';
import {Block} from 'baseui/block';
import {H4, H5, Paragraph} from '../../components/markdown-elements.js';
import {Header, ExampleWrapper} from './common';
import {themedStyled} from '../../pages/_app';

import type {ThemeT} from 'baseui';

const StyledColorWrapper = themedStyled<{
  $dark: boolean,
  $backgroundColor: string,
  $width?: string,
}>('div', ({$dark = false, $backgroundColor = '', $theme, $width}) => {
  return {
    color: typeof $dark === 'string' ? $dark : $dark ? 'black' : 'white',
    backgroundColor: $backgroundColor,
    display: 'flex',
    justifyContent: 'space-between',
    padding: $theme.sizing.scale300,
    width: $width || '250px',
  };
});

const StyledColorPreview = themedStyled<{$width?: string}>(
  'div',
  ({$theme, $width}) => {
    return {
      marginTop: $theme.sizing.scale400,
      marginRight: $theme.sizing.scale400,
      marginBottom: $theme.sizing.scale400,
      marginLeft: $theme.sizing.scale400,
      width: $width || 'auto',
    };
  },
);

const StyledTextContainer = themedStyled('span', () => {
  return {
    overflowWrap: 'break-word',
  };
});

function ColorSwatch({dark, colorName, colorValue, width}) {
  return (
    <StyledColorWrapper
      $dark={dark}
      $backgroundColor={colorValue}
      $width={width}
    >
      <StyledTextContainer>{colorName}</StyledTextContainer>
      <StyledTextContainer $style={{textAlign: 'right'}}>
        {colorValue}
      </StyledTextContainer>
    </StyledColorWrapper>
  );
}

function ColorPreview({
  colors,
  theme,
  width,
}: {
  colors: {[string]: {color: string, dark: boolean | string}},
  theme: ThemeT,
  width?: string,
}) {
  return (
    <StyledColorPreview $width={width}>
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
            width={width}
          />
        );
      })}
    </StyledColorPreview>
  );
}

const SemanticColors = ({theme}) => {
  const foundationColors = {
    primaryA: {color: 'primaryA', dark: 'contentInversePrimary'},
    primaryB: {color: 'primaryB', dark: 'contentPrimary'},
    accent: {color: 'accent', dark: 'contentOnColor'},
    negative: {color: 'negative', dark: 'contentOnColor'},
    warning: {color: 'warning', dark: 'contentOnColor'},
    positive: {color: 'positive', dark: 'contentOnColor'},
  };
  const coreBackgroundColors = {
    // core
    backgroundPrimary: {color: 'backgroundPrimary', dark: 'contentPrimary'},
    backgroundSecondary: {
      color: 'backgroundSecondary',
      dark: 'contentSecondary',
    },
    backgroundTertiary: {color: 'backgroundTertiary', dark: 'contentTertiary'},
    backgroundInversePrimary: {
      color: 'backgroundInversePrimary',
      dark: 'contentInversePrimary',
    },
    backgroundInverseSecondary: {
      color: 'backgroundInverseSecondary',
      dark: 'contentPcontentInverseSecondaryositive',
    },
    // extentions
    backgroundStateDisabled: {
      color: 'backgroundStateDisabled',
      dark: 'contentStateDisabled',
    },
    backgroundOverlayDark: {
      color: 'backgroundOverlayDark',
      dark: 'contentPrimary',
    },
    backgroundOverlayLight: {
      color: 'backgroundOverlayLight',
      dark: 'contentPrimary',
    },
    backgroundAccent: {
      color: 'backgroundAccent',
      dark: 'contentOnColor',
    },
    backgroundNegative: {
      color: 'backgroundNegative',
      dark: 'contentOnColor',
    },
    backgroundWarning: {
      color: 'backgroundWarning',
      dark: 'contentOnColor',
    },
    backgroundPositive: {
      color: 'backgroundPositive',
      dark: 'contentOnColor',
    },
    backgroundLightAccent: {
      color: 'backgroundLightAccent',
      dark: 'contentAccent',
    },
    backgroundLightNegative: {
      color: 'backgroundLightNegative',
      dark: 'contentNegative',
    },
    backgroundLightWarning: {
      color: 'backgroundLightWarning',
      dark: 'contentWarning',
    },
    backgroundLightPositive: {
      color: 'backgroundLightPositive',
      dark: 'contentPositive',
    },
    backgroundAlwaysDark: {
      color: 'backgroundAlwaysDark',
      dark: 'contentOnColor',
    },
  };
  const coreContentColors = {
    // core
    contentPrimary: {color: 'contentPrimary', dark: 'backgroundPrimary'},
    contentSecondary: {color: 'contentSecondary', dark: 'backgroundSecondary'},
    contentTertiary: {color: 'contentTertiary', dark: 'backgroundTertiary'},
    contentInversePrimary: {
      color: 'contentInversePrimary',
      dark: 'backgroundInversePrimary',
    },
    contentInverseSecondary: {
      color: 'contentInverseSecondary',
      dark: 'backgroundInverseSecondary',
    },
    contentInverseTertiary: {
      color: 'contentInverseTertiary',
      dark: 'backgroundInverseSecondary',
    },
    // extensions
    contentStateDisabled: {
      color: 'contentStateDisabled',
      dark: 'backgroundStateDisabled',
    },
    contentAccent: {color: 'contentAccent', dark: 'contentOnColor'},
    contentOnColor: {color: 'contentOnColor', dark: 'contentAccent'},
    contentNegative: {color: 'contentNegative', dark: 'contentOnColor'},
    contentWarning: {color: 'contentWarning', dark: 'contentOnColor'},
    contentPositive: {color: 'contentPositive', dark: 'contentOnColor'},
  };
  const coreBorderColors = {
    // core
    borderSelected: {color: 'borderSelected', dark: 'contentInversePrimary'},
    borderOpaque: {color: 'borderOpaque', dark: 'contentPrimary'},
    borderTransparent: {color: 'borderTransparent', dark: 'contentPrimary'},
    borderInverseSelected: {
      color: 'borderInverseSelected',
      dark: 'contentPrimary',
    },
    borderInverseOpaque: {
      color: 'borderInverseOpaque',
      dark: 'contentInversePrimary',
    },
    borderInverseTransparent: {
      color: 'borderInverseTransparent',
      dark: 'contentPrimary',
    },
    // extentions
    borderStateDisabled: {color: 'borderStateDisabled', dark: 'contentPrimary'},
    borderAccent: {color: 'borderAccent', dark: 'contentPrimary'},
    borderNegative: {color: 'borderNegative', dark: 'contentPrimary'},
    borderWarning: {color: 'borderWarning', dark: 'contentPrimary'},
    borderPositive: {color: 'borderPositive', dark: 'contentPrimary'},
  };
  return (
    <>
      <H5>Foundation</H5>
      <Paragraph>
        Represent foundational colors for the rest of the theme. These theme
        values should not be used directly except when globally changing your
        application accent color.
      </Paragraph>
      <ExampleWrapper>
        <ColorPreview colors={foundationColors} theme={theme} width="100%" />
      </ExampleWrapper>
      <H5>Background</H5>
      <Paragraph>
        Any background container. No icons, no text. Background can be the fill
        of a list view, the backer behind a map control, the page background,
        etc.
      </Paragraph>
      <ExampleWrapper>
        <ColorPreview
          colors={coreBackgroundColors}
          theme={theme}
          width="100%"
        />
      </ExampleWrapper>
      <H5>Content</H5>
      <Paragraph>
        Content is any text or icon element. It can be the fill of an arrow, or
        the color of a paragraph, or the color of label inside a button, etc.
      </Paragraph>
      <ExampleWrapper>
        <ColorPreview colors={coreContentColors} theme={theme} width="100%" />
      </ExampleWrapper>
      <H5>Border</H5>
      <Paragraph>
        All line elements get a border value. This can be a dashed line in a
        receipt, or a selected outline around an input field, or a list view
        divider, etc.
      </Paragraph>
      <ExampleWrapper>
        <ColorPreview colors={coreBorderColors} theme={theme} width="100%" />
      </ExampleWrapper>
    </>
  );
};

function Colors() {
  const primaryColors = {
    primary: {color: 'primary', dark: 'contentInversePrimary'},
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
    mono700: {color: 'mono700', dark: 'contentPrimary'},
    mono600: {color: 'mono600', dark: 'contentPrimary'},
    mono500: {color: 'mono500', dark: 'contentPrimary'},
    mono400: {color: 'mono400', dark: 'contentPrimary'},
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
          <H4>Semantic colors</H4>
          <Paragraph>
            A semantic color value intended to be used according to its semantic
            meaning and allows theming applications in a different way. It
            alises a primitive color token and its value can be changed per
            theme.
          </Paragraph>
          <SemanticColors theme={theme} />
        </Block>
      )}
    </ThemeConsumer>
  );
}

export default Colors;
