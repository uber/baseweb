/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';
import {Provider as StyletronProvider} from 'styletron-react';

import Meta from '../components/meta';
import {styletron} from '../helpers/styletron';

export default class MyDocument extends Document {
  static getInitialProps(props) {
    const page = props.renderPage(App => props => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    ));
    const stylesheets = styletron.getStylesheets() || [];
    return {...page, stylesheets};
  }
  render() {
    return (
      <html lang="en">
        <Head>
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{__html: sheet.css}}
              media={sheet.attrs.media || ''}
              key={i}
            />
          ))}
        </Head>
        <Meta />
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
