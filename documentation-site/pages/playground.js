/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import Layout from '../components/layout';

function Playground() {
  return (
    <Layout>
      <iframe
        title="codesandbox"
        src="https://codesandbox.io/embed/18qzmnz88q"
        style={{
          width: '100%',
          height: '700px',
          border: 0,
          borderRadius: '4px',
          overflow: 'hidden',
        }}
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      />
    </Layout>
  );
}

export default Playground;
