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
import {GA_ID} from '../helpers/ga';

export default class MyDocument extends Document {
  static getInitialProps(props) {
    const page = props.renderPage(App => props => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    ));
    const stylesheets = styletron.getStylesheets() || [];
    // eslint-disable-next-line cup/no-undef
    const isProduction = process.env.NODE_ENV === 'production';
    return {...page, stylesheets, isProduction};
  }

  setGoogleTags() {
    return {
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `,
    };
  }

  /**
   * Docs for thermostat
   * https://thermostat.io/help/embed/
   */
  initThermostat() {
    return {
      __html: `
        thermostatio.start({
          email: true,
          name: false,
          lockout_period: 90,
          closeLockout: 90,
          minPageLoadsBeforeShowing: 5,
          pageLoadTrackingPeriod: 10,
        });
      `,
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script
            type="text/javascript"
            src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
          />
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{__html: sheet.css}}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs['data-hydrate']}
              key={i}
            />
          ))}
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
          />
          <link rel="stylesheet" href="/static/fonts.css" />
          <style>{`
            body {
              margin: 0;
            }

            #thermostat_io_popup #thermostat_io_popup_score {
              max-width: 1000px;
            }

            #thermostat_io_popup_score a {
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 4px;
              font-weight: 600;
            }
          `}</style>
          <Meta />
        </Head>
        <body>
          <Main />
          <NextScript />
          {this.props.isProduction && (
            <React.Fragment>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              />
              <script dangerouslySetInnerHTML={this.setGoogleTags()} />
            </React.Fragment>
          )}
          <script src="https://thermostat.io/s/5b7d20ec/survey.js" />
          <script dangerouslySetInnerHTML={this.initThermostat()} />
        </body>
      </html>
    );
  }
}
