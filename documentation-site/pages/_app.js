/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env browser */

import * as React from 'react';
import {
  createTheme,
  BaseProvider,
  DarkTheme,
  DarkThemeMove,
  LightTheme,
  LightThemeMove,
} from 'baseui';

import App, {Container} from 'next/app';
import {Provider as StyletronProvider} from 'styletron-react';
import {Block} from 'baseui/block';
import Router from 'next/router';

import {styletron, debug} from '../helpers/styletron';
import {trackPageView} from '../helpers/ga';

import '../prism-coy.css'; // light theme code highlighting
import '../tomorrow-night.css'; // dark theme code highlighting
import ThemeEditor from '../components/theme-editor';

const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';
const LIGHT_MEDIA_QUERY = '(prefers-color-scheme: light)';

const blockProps = {
  backgroundColor: 'background',
  maxWidth: '100vw',
  overflow: 'hidden',
};

/**
 * Create a map for reset purposes
 */
const THEME_MAP = {
  dark: DarkTheme,
  light: LightTheme,
  darkMove: DarkThemeMove,
  lightMove: LightThemeMove,
};

export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      dark: createTheme({}, DarkTheme),
      light: createTheme({}, LightTheme),
      darkMove: createTheme({}, DarkThemeMove),
      lightMove: createTheme({}, LightThemeMove),
      theme: createTheme({}, LightTheme),
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
  // Why are we updating the theme style and then updating the theme????
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

    this.setState({
      theme:
        this.state[`${config.theme}${config.font === 'move' ? 'Move' : ''}`] ||
        LightTheme,
    });
  }

  setCustomTheme = theme => {
    this.setState({[localStorage.getItem('docs-theme')]: theme, theme});
  };

  resetTheme = () => {
    const current = localStorage.getItem('docs-theme') || 'light';
    const theme = createTheme({}, THEME_MAP[current]);
    this.setState({[current]: theme, theme});
  };

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
        <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
          <BaseProvider theme={this.state.theme}>
            <Block {...blockProps}>
              <ThemeEditor
                current={this.state.theme}
                setTheme={this.setCustomTheme}
                resetTheme={this.resetTheme}
              />
              <Component
                {...pageProps}
                path={path}
                toggleTheme={this.toggleTheme.bind(this)}
              />
              <Block {...blockProps} height="300px" />
            </Block>
          </BaseProvider>
        </StyletronProvider>
      </Container>
    );
  }
}
