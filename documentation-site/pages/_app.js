/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import App, {Container} from 'next/app';

import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, ThemeProvider} from 'baseui';

import getStyletron from '../helpers/styletron';
import Head from '../components/meta';

export default class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props;

    return (
      <Container>
        <Head />
        <StyletronProvider value={getStyletron()}>
          <ThemeProvider theme={LightTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </StyletronProvider>
      </Container>
    );
  }
}
