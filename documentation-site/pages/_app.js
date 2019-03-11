/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env browser */

import React from 'react';
import {LightTheme, LightThemeMove, ThemeProvider} from 'baseui';
import App, {Container} from 'next/app';
import {Provider as StyletronProvider} from 'styletron-react';
import {Block} from 'baseui/block';
import Router from 'next/router';

import {styletron} from '../helpers/styletron';
import {trackPageView} from '../helpers/ga';
import '../prism-coy.css';

const LS_THEME_KEY = 'theme';
const themes = {
  LightTheme,
  LightThemeMove,
};

export default class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      theme: LightTheme,
    };
  }

  componentDidMount() {
    Router.onRouteChangeComplete = url => {
      trackPageView(url);
    };

    this.setTheme();
  }

  setTheme() {
    let themeToSet;

    if (window.location.search.includes('font=move')) {
      window.localStorage.setItem(LS_THEME_KEY, 'LightThemeMove');
      themeToSet = LightThemeMove;
    }

    if (window.location.search.includes('font=system')) {
      window.localStorage.setItem(LS_THEME_KEY, 'LightTheme');
      themeToSet = LightTheme;
    }

    const savedTheme = localStorage.getItem(LS_THEME_KEY);
    this.setState({
      theme: themeToSet || themes[savedTheme] || LightTheme,
    });
  }

  render() {
    const {Component, pageProps} = this.props;
    return (
      <Container>
        <StyletronProvider value={styletron}>
          <ThemeProvider theme={this.state.theme}>
            <Component {...pageProps} />
            <Block marginBottom="300px" />
          </ThemeProvider>
        </StyletronProvider>
      </Container>
    );
  }
}
