/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global fetch process */

import * as React from 'react';
import CodeSandboxer from 'react-codesandboxer';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import {Button, KIND} from 'baseui/button';
import {Card} from 'baseui/card';
import {Block} from 'baseui/block';
import Check from 'baseui/icon/check';
import {StyledLink} from 'baseui/link';
import {styled} from 'baseui/styles';

const Link = styled(StyledLink, {cursor: 'pointer'});

const index = `
import React from "react";
import ReactDOM from "react-dom";

import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

import Example from "./example";

const engine = new Styletron();

function App() {
  return <Example />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StyletronProvider value={engine}>
    <App />
  </StyletronProvider>,
  rootElement
);
`;

function Source(props: {children: ?React.Node}) {
  if (!props.children || typeof props.children !== 'string') return null;

  return (
    <Block
      padding="scale800"
      overrides={{Block: {style: {fontFamily: 'courier'}}}}
    >
      {props.children
        .trim()
        .split('\n')
        .map((line, index) => (
          <Block key={index}>{line ? line : <br />}</Block>
        ))}
    </Block>
  );
}

type PropsT = {
  children: React.Node,
  path: string, // required to fetch the uncompiled source code
  title: string,
};

type StateT = {
  isCopied: boolean,
  source: ?string,
};

class Example extends React.Component<PropsT, StateT> {
  state = {
    isCopied: false,
    source: null,
  };

  async componentDidMount() {
    const sourcePath = `${String(process.env.STATIC_ROOT)}${this.props.path}`;
    const res = await fetch(sourcePath);
    const source = await res.text();
    this.setState({source});
  }

  handleCopy = () => {
    this.setState({isCopied: true}, () =>
      setTimeout(() => this.setState({isCopied: false}), 5000),
    );
  };

  render() {
    return (
      <Card
        overrides={{
          Root: {style: {minWidth: '776px'}},
          Contents: {style: {margin: 0}},
        }}
      >
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          paddingTop="scale600"
          paddingRight="scale500"
          paddingBottom="scale600"
          paddingLeft="scale800"
        >
          <Block as="span" font="font500" color="mono1000">
            {this.props.title}
          </Block>
          <CopyToClipboard onCopy={this.handleCopy} text={this.state.source}>
            {this.state.isCopied ? (
              <Button
                kind={KIND.secondary}
                endEnhancer={() => <Check size="scale800" />}
              >
                Copied to clipboard
              </Button>
            ) : (
              <Button kind={KIND.secondary}>Copy to clipboard</Button>
            )}
          </CopyToClipboard>
        </Block>

        <Block
          padding="scale600"
          overrides={{
            Block: {
              style: ({$theme}) => ({
                borderTop: `1px solid ${$theme.colors.border}`,
                borderBottom: `1px solid ${$theme.colors.border}`,
              }),
            },
          }}
        >
          {this.props.children}
        </Block>

        <Block>
          <Source>{this.state.source}</Source>
        </Block>

        <Block paddingLeft="scale800">
          <CodeSandboxer
            examplePath="/"
            example={this.state.source}
            name={this.props.title}
            dependencies={{
              baseui: '5.1.0',
              react: '16.5.2',
              'react-dom': '16.5.2',
              'react-scripts': '2.0.3',
              'styletron-engine-atomic': '1.0.9',
              'styletron-react': '4.3.6',
              'styletron-react-core': '1.3.3',
            }}
            providedFiles={{'index.js': {content: index}}}
            template="create-react-app"
          >
            {() => <Link>Open in CodeSandbox</Link>}
          </CodeSandboxer>
        </Block>
      </Card>
    );
  }
}

export default Example;
