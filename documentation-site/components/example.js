/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global window */
// @flow

import * as React from 'react';
import { Button, KIND, SIZE } from 'baseui/button';
import { ButtonGroup } from 'baseui/button-group';
import { Card } from 'baseui/card';
import { Block } from 'baseui/block';

import Code from './code';
import CodeIcon from './code-icon';
//$FlowFixMe
import { trackEvent } from '../helpers/ga';
import { H3 } from './markdown-elements';
import { deploy } from '../components/code-sandboxer.js';

function Source(props: { children: ?React.Node }) {
  if (!props.children || typeof props.children !== 'string') return null;
  return <Code>{props.children}</Code>;
}

type PropsT = {
  additionalPackages: { [string]: string },
  children: React.Node,
  path: string, // required to fetch the uncompiled source code
  title: ?string,
};

function Example(props: PropsT) {
  const { additionalPackages = {}, path, children, title = null } = props;

  // Which language the example should be displayed in.
  const [selectedLanguage, setSelectedLanguage] = React.useState(-1);

  // The example code for each of our three supported languages.
  const [code, setCode] = React.useState({
    js: null,
    ts: null,
    flow: null,
  });

  // Load example code for various languages on initial mount.
  React.useEffect(() => {
    (async () => {
      const flowCode = await import(/* webpackMode: "eager" */ `!!raw-loader!../examples/${path}`);
      const tsCode = await import(
        /* webpackMode: "eager" */ `!!raw-loader!../examples/${path.replace('.js', '.tsx')}`
      );

      setCode({
        flow: flowCode.default,
        ts: tsCode.default,
        js: jsCode.default
          // flow-remove-types doesn't remove // from the first line
          .replace(/^\/\//, '')
          // remove all instances of <{}>
          .replace(/<\{.*\}>/g, '')
          // remove all instances of <any>
          .replace(/<any>/g, '')
          .trim(),
      });
    })();
  }, []);

  async function handleOpenExample() {
    if (code.js) {
      const url = await deploy(`Base Web - ${title || 'Example'}`, code.js, additionalPackages);
      if (url) {
        window.open(url, '_blank');
      }
    }
  }

  return (
    <Card
      overrides={{
        Root: {
          style: ({ $theme }) => ({
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
      {title && <H3>{title}</H3>}
      {children}

      <Block paddingTop="scale400">
        <ButtonGroup
          mode="radio"
          size={SIZE.compact}
          selected={selectedLanguage}
          onClick={(event, index) => {
            if (selectedLanguage !== index) {
              setSelectedLanguage(index);
            } else {
              setSelectedLanguage(-1);
            }
          }}
        >
          <Button
            kind={KIND.secondary}
            startEnhancer={() => <CodeIcon />}
            onClick={() => {
              trackEvent('show_js_source', title);
            }}
          >
            JS
          </Button>
          <Button
            kind={KIND.secondary}
            startEnhancer={() => <CodeIcon />}
            onClick={() => {
              trackEvent('show_flow_source', title);
            }}
          >
            Flow
          </Button>
          <Button
            kind={KIND.secondary}
            startEnhancer={() => <CodeIcon />}
            onClick={() => {
              trackEvent('show_ts_source', title);
            }}
          >
            TS
          </Button>
        </ButtonGroup>
      </Block>

      {selectedLanguage > -1 && (
        <React.Fragment>
          <Block overflow="scrollX">
            {selectedLanguage === 0 && <Source>{code.js}</Source>}
            {selectedLanguage === 1 && <Source>{code.flow}</Source>}
            {selectedLanguage === 2 && <Source>{code.ts}</Source>}
          </Block>
          <Button kind={KIND.secondary} size={SIZE.compact} onClick={handleOpenExample}>
            Try example on CodeSandbox
          </Button>
        </React.Fragment>
      )}
    </Card>
  );
}

export default Example;
