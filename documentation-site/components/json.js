/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import Code from './code.js';
import {Block} from 'baseui/block';

type PropsT = {
  src: string,
};

const JSONViewer = (props: PropsT) => (
  <Block
    paddingLeft="scale600"
    overrides={{
      Block: {
        style: {
          borderLeft: '5px solid #f6ba8b',
        },
      },
    }}
  >
    <Code language="javascript">{JSON.stringify(props.src, null, 2)}</Code>
  </Block>
);

export default JSONViewer;
