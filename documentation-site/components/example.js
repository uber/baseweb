/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global fetch process */

import * as React from 'react';
import CodeSandboxer from 'react-codesandboxer';
import {withStyle} from 'styletron-react';
import {Button, KIND, SIZE} from 'baseui/button';
import {Card} from 'baseui/card';
import {Block} from 'baseui/block';
import {StyledLink} from 'baseui/link';

import {version} from '../../package.json';
import Code from './code';
import {trackEvent} from '../helpers/ga';
import {H2} from './markdown-elements';

const Link = withStyle(StyledLink, {cursor: 'pointer'});

const index = `
import React from "react";
import ReactDOM from "react-dom";

import {BaseProvider, LightTheme} from 'baseui';
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
    <BaseProvider theme={LightTheme}>
      <App />
    </BaseProvider>
  </StyletronProvider>,
  rootElement
);
`;

function Source(props: {children: ?React.Node}) {
  if (!props.children || typeof props.children !== 'string') return null;
  return <Code>{props.children}</Code>;
}

type PropsT = {
  additionalPackages: {[string]: string},
  children: React.Node,
  path: string, // required to fetch the uncompiled source code
  title: string,
};

type StateT = {
  isSourceOpen: boolean,
  source: ?string,
};

class Example extends React.Component<PropsT, StateT> {
  static defaultProps = {additionalPackages: {}};
  state = {
    isSourceOpen: false,
    source: null,
  };

  async componentDidMount() {
    const sourcePath = `${String(process.env.STATIC_ROOT)}${this.props.path}`;
    const res = await fetch(sourcePath);
    const source = await res.text();
    this.setState({source});
  }

  render() {
    return (
      <Card
        overrides={{
          Root: {
            style: ({$theme}) => ({
              marginTop: 0,
              marginBottom: 0,
              boxShadow: 'none',
              borderWidth: 0,
              backgroundColor: $theme.colors.background,
            }),
          },
          Contents: {
            style: {
              marginLeft: 0,
              marginRight: 0,
              marginTop: 0,
              marginBottom: 0,
            },
          },
        }}
      >
        <H2>{this.props.title}</H2>
        {this.props.children}

        <Block paddingTop="scale400">
          <Button
            kind={KIND.secondary}
            size={SIZE.compact}
            onClick={() => {
              this.setState(prevState => ({
                isSourceOpen: !prevState.isSourceOpen,
              }));
              trackEvent('show_source', this.props.title);
            }}
          >
            {this.state.isSourceOpen ? 'Hide' : 'Show'} Source
          </Button>
        </Block>

        {this.state.isSourceOpen && (
          <React.Fragment>
            <Block overflow="scrollX">
              <Source>{this.state.source}</Source>
            </Block>

            <CodeSandboxer
              examplePath="/"
              example={this.state.source}
              name={this.props.title}
              afterDeploy={() => {
                trackEvent('codesandbox_deployed', this.props.title);
              }}
              afterDeployError={() => {
                trackEvent('codesandbox_deployed_error', this.props.title);
              }}
              dependencies={{
                baseui: version,
                react: '16.8.6',
                'react-dom': '16.8.6',
                'react-scripts': '2.0.3',
                'styletron-engine-atomic': '1.0.9',
                'styletron-react': '5.1.2',
                ...this.props.additionalPackages,
              }}
              providedFiles={{'index.js': {content: index}}}
              template="create-react-app"
            >
              {() => (
                <Link>
                  <Button kind={KIND.secondary} size={SIZE.compact}>
                    Edit on CodeSandbox
                  </Button>
                </Link>
              )}
            </CodeSandboxer>
          </React.Fragment>
        )}
      </Card>
    );
  }
}

export default Example;
