/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import { StatefulInput, SIZE } from '../index.js';

export function Scenario() {
  return (
    <>
      <StatefulInput size={SIZE.mini} initialState={{ value: 'Mini' }} endEnhancer=".com" />

      <br />
      <StatefulInput size={SIZE.compact} initialState={{ value: 'Compact' }} endEnhancer=".com" />

      <br />
      <StatefulInput initialState={{ value: 'Default' }} endEnhancer=".com" />
      <br />
      <StatefulInput size={SIZE.large} initialState={{ value: 'Large' }} endEnhancer=".com" />
    </>
  );
}
