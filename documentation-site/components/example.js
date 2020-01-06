/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import CodeSandboxer from 'react-codesandboxer';
import {withStyle} from 'styletron-react';
import {Button, KIND, SIZE} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';
import {Card} from 'baseui/card';
import {Block} from 'baseui/block';
import {StyledLink} from 'baseui/link';

import {version} from '../../package.json';
import Code from './code';
import CodeIcon from './code-icon';
//$FlowFixMe
import {trackEvent} from '../helpers/ga';
import {H3} from './markdown-elements';

import {codesandboxIndexCode} from './const';
const Link = withStyle(StyledLink, {cursor: 'pointer'});

function Source(props: {children: ?React.Node}) {
  if (!props.children || typeof props.children !== 'string') return null;
  return <Code>{props.children}</Code>;
}

type PropsT = {
  additionalPackages: {[string]: string},
  children: React.Node,
  path: string, // required to fetch the uncompiled source code
  title: ?string,
};

type StateT = {
  sourceSelected: number,
  source: ?string,
  sourceTs: ?string,
  sourceFlow: ?string,
};

class Example extends React.Component<PropsT, StateT> {
  static defaultProps = {additionalPackages: {}, title: null};
  state = {
    sourceSelected: -1,
    source: null,
    sourceTs: null,
    sourceFlow: null,
  };

  async componentDidMount() {
    const codeFlow = await import(
      /* webpackMode: "eager" */ `!!raw-loader!../examples/${this.props.path}`
    );
    const codeTs = await import(
      /* webpackMode: "eager" */ `!!raw-loader!../examples/${this.props.path.replace(
        '.js',
        '.tsx',
      )}`
    );
    const codeJs = await import(
      /* webpackMode: "eager" */ `!!raw-loader!remove-flow-types-loader?pretty!../examples/${this.props.path}`
    );
    this.setState({
      sourceFlow: codeFlow.default,
      sourceTs: codeTs.default,
      source: codeJs.default
        // flow-remove-types doesn't remove // from the first line
        .replace(/^\/\//, '')
        // remove all instances of <{}>
        .replace(/<\{.*\}>/g, '')
        .trim(),
    });
  }

  render() {
    const isTsx = this.state.sourceSelected === 2;
    // react-codesandboxer doesn't play nicely when you update its props
    // it keeps deploying the same source code that was set on initial mount
    // so if you toggle from JS from TS, it still deploy .js version
    // that's why we are forcing second mount through an unique "key"
    const csProps = {
      name: this.props.title,
      afterDeploy: () => {
        trackEvent('codesandbox_deployed', this.props.title);
      },
      afterDeployError: () => {
        trackEvent('codesandbox_deployed_error', this.props.title);
      },
      dependencies: {
        baseui: version,
        react: '16.8.6',
        'react-dom': '16.8.6',
        'react-scripts': '3.0.1',
        'styletron-engine-atomic': '1.4.0',
        'styletron-react': '5.2.0',
        ...this.props.additionalPackages,
      },
      children: () => (
        <Link>
          <Button kind={KIND.secondary} size={SIZE.compact}>
            Edit on CodeSandbox
          </Button>
        </Link>
      ),
    };
    return (
      <Card
        overrides={{
          Root: {
            style: ({$theme}) => ({
              marginTop: 0,
              marginBottom: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
              borderBottomWidth: 0,
              borderLeftWidth: 0,
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
        {this.props.title && <H3>{this.props.title}</H3>}
        {this.props.children}

        <Block paddingTop="scale400">
          <ButtonGroup
            size={SIZE.compact}
            selected={this.state.sourceSelected}
            mode="radio"
            onClick={(event, index) => {
              if (this.state.sourceSelected !== index) {
                this.setState({sourceSelected: index});
              } else {
                this.setState({sourceSelected: -1});
              }
            }}
          >
            <Button
              kind={KIND.secondary}
              startEnhancer={() => <CodeIcon />}
              onClick={() => {
                trackEvent('show_js_source', this.props.title);
              }}
            >
              JS
            </Button>
            <Button
              kind={KIND.secondary}
              startEnhancer={() => <CodeIcon />}
              onClick={() => {
                trackEvent('show_flow_source', this.props.title);
              }}
            >
              Flow
            </Button>
            <Button
              kind={KIND.secondary}
              startEnhancer={() => <CodeIcon />}
              onClick={() => {
                trackEvent('show_ts_source', this.props.title);
              }}
            >
              TS
            </Button>
          </ButtonGroup>
        </Block>

        {this.state.sourceSelected > -1 && (
          <React.Fragment>
            <Block overflow="scrollX">
              {this.state.sourceSelected === 0 && (
                <Source>{this.state.source}</Source>
              )}
              {this.state.sourceSelected === 1 && (
                <Source>{this.state.sourceFlow}</Source>
              )}
              {this.state.sourceSelected === 2 && (
                <Source>{this.state.sourceTs}</Source>
              )}
            </Block>

            {isTsx ? (
              <CodeSandboxer
                key="tsx"
                examplePath="/example.tsx"
                example={this.state.sourceTs}
                providedFiles={{
                  'index.tsx': {
                    content: codesandboxIndexCode,
                  },
                }}
                template="create-react-app-typescript"
                {...csProps}
                dependencies={{
                  ...csProps.dependencies,
                  '@types/styletron-react': '5.0.1',
                  '@types/styletron-engine-atomic': '1.1.0',
                  '@types/styletron-standard': '2.0.0',
                }}
              />
            ) : (
              <CodeSandboxer
                key="js"
                examplePath="/example.js"
                example={this.state.source}
                providedFiles={{
                  'index.js': {
                    content: codesandboxIndexCode,
                  },
                }}
                template="create-react-app"
                {...csProps}
              />
            )}
          </React.Fragment>
        )}
      </Card>
    );
  }
}

export default Example;
