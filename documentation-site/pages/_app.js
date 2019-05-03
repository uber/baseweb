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
import {LayersManager} from 'baseui/layer';
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

const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';
const LIGHT_MEDIA_QUERY = '(prefers-color-scheme: light)';

const BlockOverrides = {
  Block: {
    style: ({$theme}) => ({
      backgroundColor: $theme.colors.background,
      maxWidth: '100vw',
      overflow: 'hidden',
    }),
  },
};

export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      theme: LightTheme,
    };
    this.mediaQueryListener = this.mediaQueryListener.bind(this);
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
    if (window.matchMedia) {
      const mmDark = window.matchMedia(DARK_MEDIA_QUERY);
      const mmLight = window.matchMedia(LIGHT_MEDIA_QUERY);
      if (mmDark.media === DARK_MEDIA_QUERY) {
        const theme = mmDark.matches ? 'dark' : 'light';
        localStorage.setItem('docs-theme', theme);
      }
      mmDark.addListener(this.mediaQueryListener);
      mmLight.addListener(this.mediaQueryListener);
    }
    this.setTheme();
  }

  componentWillUnmount() {
    if (window.matchMedia) {
      const mmDark = window.matchMedia(DARK_MEDIA_QUERY);
      const mmLight = window.matchMedia(LIGHT_MEDIA_QUERY);
      mmDark.removeListener(this.mediaQueryListener);
      mmLight.removeListener(this.mediaQueryListener);
    }
  }

  mediaQueryListener(e) {
    if (e && e.matches) {
      if (e.media === DARK_MEDIA_QUERY) {
        this.setThemeStyle('dark');
      }
      if (e.media === LIGHT_MEDIA_QUERY) {
        this.setThemeStyle('light');
      }
      this.setTheme();
    }
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

  getThemeStyle() {
    return localStorage.getItem('docs-theme');
  }

  setThemeStyle(theme) {
    localStorage.setItem('docs-theme', theme);
  }

  toggleTheme() {
    const theme = this.getThemeStyle();

    if (!theme) {
      this.setThemeStyle('dark');
    }

    if (theme === 'dark') {
      this.setThemeStyle('light');
    } else {
      this.setThemeStyle('dark');
    }

    this.setTheme();
  }

  render() {
    const {Component, pageProps, path} = this.props;
    return (
      <Container>
        <StyletronProvider value={styletron}>
          <LayersManager>
            <ThemeProvider theme={this.state.theme}>
              <Block overrides={BlockOverrides}>
                <Component
                  {...pageProps}
                  path={path}
                  toggleTheme={this.toggleTheme.bind(this)}
                />
                <Block overrides={BlockOverrides} height="300px" />
              </Block>
            </ThemeProvider>
          </LayersManager>
        </StyletronProvider>
      </Container>
    );
  }
}
