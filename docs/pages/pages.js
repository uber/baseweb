/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */
import React from 'react';
import {storiesOf} from '@storybook/react';

import ReactMarkdown from 'react-markdown';
import FrontMatter from 'front-matter';

import SyntaxHighlighter from 'react-syntax-highlighter';
import {vs} from 'react-syntax-highlighter/dist/styles/hljs';

import Welcome from './welcome.md';
import GettingStarted from './getting-started.md';

import {styled} from '../../src/styles';

const docs = [Welcome, GettingStarted];

const parsedDocs = docs.map(doc => FrontMatter(doc));

const Root = styled('div', ({$theme}) => ({
  padding: $theme.sizing.scale800,
  width: '600px',
  maxWidth: '500px',
}));

const P = styled('p', ({$theme}) => ({
  ...$theme.typography.font400,
}));

const Anchor = styled('a', ({$theme}) => ({
  color: $theme.colors.primary,
}));

const Code = code => {
  return (
    <SyntaxHighlighter language={code.language} style={vs}>
      {code.value}
    </SyntaxHighlighter>
  );
};

parsedDocs.forEach(doc => {
  storiesOf(doc.attributes.category, module).add(doc.attributes.page, () => {
    return (
      <ReactMarkdown
        renderers={{root: Root, p: P, link: Anchor, code: Code}}
        source={doc.body}
      />
    );
  });
});
