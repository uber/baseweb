/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

type PropsT = {
  children: string,
  language: string,
};

const Code = (props: PropsT) => (
  <SyntaxHighlighter language={props.language} useInlineStyles={false}>
    {props.children}
  </SyntaxHighlighter>
);

Code.defaultProps = {
  language: 'jsx',
};

export default Code;
