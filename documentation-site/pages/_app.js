import React from 'react';
import App, {Container} from 'next/app';

import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, ThemeProvider} from 'baseui';

import getStyletron from '../helpers/styletron';
import Head from '../components/meta';

export default class MyApp extends App {
  static async getInitialProps({Component, router, ctx}) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {pageProps};
  }

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
