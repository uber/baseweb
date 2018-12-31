/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import Example from '../components/example';
import Layout from '../components/layout';

import Input from 'examples/input/example.js';

export default function Hello() {
  return (
    <Layout>
      <Example title="Basic usage" path="examples/input/example.js">
        <Input />
      </Example>
    </Layout>
  );
}
