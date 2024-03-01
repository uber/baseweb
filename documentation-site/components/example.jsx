/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global window */
//

import * as React from "react";
import { Button, KIND, SIZE } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";
import { Card } from "baseui/card";
import { Block } from "baseui/block";
import sdk from "@stackblitz/sdk";

import Code from "./code";
import CodeIcon from "./code-icon";
import { trackEvent } from "../helpers/ga";
import { H3 } from "./markdown-elements";

function Source(props) {
  if (!props.children || typeof props.children !== "string") return null;
  return <Code content={props.children} />;
}

function Example(props) {
  const { additionalPackages = {}, path, children, title = null } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  // The example code for each of our three supported languages.
  const [code, setCode] = React.useState(null);

  // Load example code for various languages on initial mount.
  React.useEffect(() => {
    (async () => {
      const tsCode = await import(
        /* webpackMode: "eager" */ `!!raw-loader!../examples/${path.replace(
          ".js",
          ".tsx"
        )}`
      );
      setCode(tsCode.default);
    })();
  }, []);

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
        <ButtonGroup>
          <Button
            kind={KIND.secondary}
            startEnhancer={() => <CodeIcon />}
            onClick={(event, index) => {
              trackEvent("show_ts_source", title);
              setIsOpen((p) => !p);
            }}
          >
            Code
          </Button>
          <Button
            kind={KIND.secondary}
            onClick={async (event, index) => {
              const response = await fetch(
                "https://registry.npmjs.org/baseui/next"
              );
              const data = await response.json();
              const PACKAGE_JSON = {
                name: "stackblitz-baseui-example",
                version: "0.0.0",
                private: true,
                dependencies: {
                  "@types/react": "18.2.45",
                  "@types/react-dom": "18.2.18",
                  baseui: data.version,
                  react: "18.2.0",
                  "react-dom": "18.2.0",
                  "react-scripts": "latest",
                  "styletron-engine-monolithic": "^1.0.0",
                  "styletron-react": ">=6",
                },
                scripts: {
                  start: "react-scripts start",
                  build: "react-scripts build",
                  test: "react-scripts test --env=jsdom",
                  eject: "react-scripts eject",
                },
              };
              sdk.openProject(
                {
                  dependencies: PACKAGE_JSON.dependencies,
                  title: "BaseWeb Code Example",
                  description:
                    "Dynamically generated code example from baseweb.design",
                  template: "create-react-app",
                  files: {
                    "index.html": `<div id="app"></div>`,
                    "index.tsx": `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Client as Styletron } from 'styletron-engine-monolithic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import Example from './Example';

const root = createRoot(document.getElementById('app'));

const engine = new Styletron();

root.render(
  <StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Example />
      </BaseProvider>
    </StyletronProvider>
  </StrictMode>
);
`,
                    "Example.tsx": code,
                    "tsconfig.json": `{
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["DOM", "ES2022"],
    "moduleResolution": "node",
    "target": "ES2022"
  }
}`,
                    "package.json": JSON.stringify(PACKAGE_JSON, null, 2),
                  },
                  settings: {
                    compile: {
                      trigger: "auto",
                      clearConsole: false,
                    },
                  },
                },
                {
                  newWindow: true,
                  openFile: ["Example.tsx"],
                }
              );
            }}
          >
            StackBlitz
          </Button>
        </ButtonGroup>
      </Block>

      {isOpen && (
        <React.Fragment>
          <Block>
            <Source>{code}</Source>
          </Block>
        </React.Fragment>
      )}
    </Card>
  );
}

export default Example;
