/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import Code from './code.js';

type PropsT = {
  src: string,
};

const JSONViewer = (props: PropsT) => (
  <Code>{JSON.stringify(props.src, null, 2)}</Code>
);

export default JSONViewer;
