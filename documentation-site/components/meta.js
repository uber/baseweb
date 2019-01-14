/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import Head from 'next/head';

export default () => (
  <Head>
    <title>Base UI documentation</title>
    <meta
      name="viewport"
      content="initial-scale=1.0, width=device-width"
      key="viewport"
    />
    <style>{`
      body {
        margin: 0;
      }
    `}</style>
  </Head>
);
