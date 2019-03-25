/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env browser */

import React from 'react';
import {
  DarkTheme,
  DarkThemeMove,
  LightTheme,
  LightThemeMove,
  ThemeProvider,
} from 'baseui';

import App, {Container} from 'next/app';
import {Provider as StyletronProvider} from 'styletron-react';
import {Block} from 'baseui/block';
import Router from 'next/router';

import {styletron} from '../helpers/styletron';
import {trackPageView} from '../helpers/ga';
import '../prism-coy.css';

const themes = {
  LightTheme,
  LightThemeMove,
  DarkTheme,
  DarkThemeMove,
};

const BlockOverrides = {
  Block: {
    style: ({$theme}) => ({
      backgroundColor: $theme.colors.background,
    }),
  },
};

export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      theme: LightTheme,
    };
  }

  static async getInitialProps({Component, ctx}) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {path: ctx.asPath, pageProps};
  }

  componentDidMount() {
    Router.onRouteChangeComplete = url => {
      trackPageView(url);
    };
    this.setTheme();
  }

  setTheme() {
    const search = window.location.search;
    const ls = window.localStorage;

    const config = {
      font: 'system',
      theme: 'light',
    };

    const presetFont = ls.getItem('docs-font');
    const presetTheme = ls.getItem('docs-theme');

    let fontToSet;
    let themeToSet;

    if (search.includes('font=move')) {
      fontToSet = 'move';
      ls.setItem('docs-font', fontToSet);
    }

    if (search.includes('font=system')) {
      fontToSet = 'system';
      ls.setItem('docs-font', fontToSet);
    }

    if (search.includes('theme=dark')) {
      themeToSet = 'dark';
      ls.setItem('docs-theme', themeToSet);
    }

    if (search.includes('theme=light')) {
      themeToSet = 'light';
      ls.setItem('docs-theme', themeToSet);
    }

    config.font = fontToSet || presetFont || config.font;
    config.theme = themeToSet || presetTheme || config.theme;

    let themeName = '';

    if (config.theme === 'dark') {
      themeName += 'DarkTheme';
    } else if (config.theme === 'light') {
      themeName += 'LightTheme';
    }

    if (config.font === 'move') {
      themeName += 'Move';
    }

    this.setState({
      theme: themes[themeName] || LightTheme,
    });
  }

  render() {
    const {Component, pageProps, path} = this.props;
    return (
      <Container>
        <StyletronProvider value={styletron}>
          <ThemeProvider theme={this.state.theme}>
            <Block overrides={BlockOverrides}>
              <Component {...pageProps} path={path} />
              <Block overrides={BlockOverrides} height="300px" />
            </Block>
          </ThemeProvider>
        </StyletronProvider>
      </Container>
    );
  }
}
