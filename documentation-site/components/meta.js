/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* global process */

import React from 'react';
import Head from 'next/head';

const title =
  process.env.WEBSITE_ENV === 'production'
    ? 'Base UI documentation'
    : '[DEV] Base UI documentation';

export default () => (
  <Head>
    <title key="title">{title}</title>
    <meta
      name="viewport"
      content="initial-scale=1.0, width=device-width"
      key="viewport"
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/static/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/static/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/static/favicon-16x16.png"
    />
    <link rel="manifest" href="/static/site.webmanifest" />
    <link
      rel="mask-icon"
      href="/static/safari-pinned-tab.svg"
      color="#5bbad5"
    />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#ffffff" />
  </Head>
);
