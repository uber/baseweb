/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

import * as React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';
import {Provider as StyletronProvider} from 'styletron-react';

import Favicons from '../components/meta-favicons';
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

  initDelighted() {
    return {
      __html: `
        !function(e,t,r,n,a){if(!e[a]){for(var i=e[a]=[],s=0;s<r.length;s++){var c=r[s];i[c]=i[c]||function(e){return function(){var t=Array.prototype.slice.call(arguments);i.push([e,t])}}(c)}i.SNIPPET_VERSION="1.0.1";var o=t.createElement("script");o.type="text/javascript",o.async=!0,o.src="https://d2yyd1h5u9mauk.cloudfront.net/integrations/web/v1/library/"+n+"/"+a+".js";var p=t.getElementsByTagName("script")[0];p.parentNode.insertBefore(o,p)}}(window,document,["survey","reset","config","init","set","get","event","identify","track","page","screen","group","alias"],"5ey7SgIHHblqnpdL","delighted");
        delighted.survey({recurringPeriod: 1});
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
          <link
            rel="preload"
            href="https://d1a3f4spazzrp4.cloudfront.net/dotcom-assets/fonts/UberMoveText-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="https://d1a3f4spazzrp4.cloudfront.net/dotcom-assets/fonts/UberMoveText-Medium.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/static/fonts.css" />
          <style>{`
            * {
              box-sizing: border-box;
            }
            body {
              margin: 0;
            }
            ::selection {
              background: #276EF1;
              color: white;
            }
          `}</style>
          <Favicons />
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
              <script dangerouslySetInnerHTML={this.initDelighted()} />
            </React.Fragment>
          )}
        </body>
      </html>
    );
  }
}
