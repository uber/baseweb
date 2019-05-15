/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {Block} from 'baseui/block';

type PropsT = {
  children: string,
  language: string,
};

const Code = (props: PropsT) => (
  <Block overflow="scroll">
    <SyntaxHighlighter
      language={props.language}
      useInlineStyles={false}
      style={{overflow: 'scroll'}}
    >
      {props.children}
    </SyntaxHighlighter>
  </Block>
);

Code.defaultProps = {
  language: 'jsx',
};

export default Code;
