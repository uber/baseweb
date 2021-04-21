/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

import * as React from 'react';
import Head from 'next/head';

function MetaSeo(props) {
  return (
    <Head>
      {props.description ? (
        <meta
          name="description"
          property="og:description"
          content={props.description}
          key="description"
        />
      ) : null}

      {props.keywords ? (
        <meta name="keywords" content={props.keywords} key="keywords" />
      ) : null}
    </Head>
  );
}

export default MetaSeo;
