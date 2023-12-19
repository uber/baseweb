/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

//

import { finaliseCSB, sendFilesToCSB } from "codesandboxer";
import packageJson from "../../package.json";
import { trackEvent } from "../helpers/ga";

const html = `<div id="root" />`;
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

export async function deploy(
  title /*: string */,
  source /*: string */,
  additionalDependencies /*: ?{[string]: string} */
) /*: Promise<?string> */ {
  try {
    const { devDependencies } = packageJson;
    const { parameters } = finaliseCSB(
      {
        files: {
          "public/index.html": { content: html },
          "src/index.tsx": { content: index },
          "src/example.tsx": { content: source },
        },
        deps: {
          baseui: "latest",
          react: "latest",
          "react-dom": "latest",
          "styletron-engine-atomic":
            devDependencies["styletron-engine-atomic"],
          "styletron-react":
            devDependencies["styletron-react"],
          "react-scripts": "latest",
          ...additionalDependencies,
        },
      },
      {
        fileName: "src/example.tsx",
        name: title,
      }
    );
    const { sandboxId } = await sendFilesToCSB(parameters);
    trackEvent("codesandbox_deployed", title);
    return `https://codesandbox.io/s/${sandboxId}?module=src/example.tsx`;
  } catch (error) {
    console.error(
      "Failed to deploy code sandbox example:",
      error
    );
    trackEvent("codesandbox_deployed_error", title);
    return null;
  }
}
