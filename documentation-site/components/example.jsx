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
                private: true,
                version: "0.0.0",
                type: "module",
                scripts: {
                  dev: "vite",
                  build: "tsc && vite build",
                  preview: "vite preview",
                },
                dependencies: {
                  baseui: data.version,
                  react: "^18.2.0",
                  "react-dom": "^18.2.0",
                  "styletron-engine-monolithic": "^1.0.0",
                  "styletron-react": ">=6",
                },
                devDependencies: {
                  "@types/react": "^18.2.64",
                  "@types/react-dom": "^18.2.21",
                  "@vitejs/plugin-react": "^4.2.1",
                  typescript: "^5.2.2",
                  vite: "^5.1.6",
                },
              };
              sdk.openProject(
                {
                  title: "BaseWeb Code Example",
                  description:
                    "Dynamically generated code example from baseweb.design",
                  template: "node",
                  files: {
                    "index.html": `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BaseWeb + Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
                    "src/main.tsx": `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Client as Styletron } from 'styletron-engine-monolithic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import Example from './Example.tsx';

const root = createRoot(document.getElementById('root')!);

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
                    "src/Example.tsx": code,
                    "tsconfig.json": `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`,
                    "tsconfig.node.json": `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}`,
                    "vite.config.ts": `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
`,
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
                  openFile: ["src/Example.tsx"],
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
