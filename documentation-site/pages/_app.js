/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import {LightTheme, ThemeProvider} from 'baseui';
import App, {Container} from 'next/app';
import {Provider as StyletronProvider} from 'styletron-react';

import {isServer, styletron} from '../helpers/styletron';

export default class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props;
    return isServer ? (
      <Container>
        <Component {...pageProps} />
      </Container>
    ) : (
      <Container>
        <StyletronProvider value={styletron}>
          <ThemeProvider theme={LightTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </StyletronProvider>
      </Container>
    );
  }
}
