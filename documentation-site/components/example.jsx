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

import Code from "./code";
import CodeIcon from "./code-icon";
import { trackEvent } from "../helpers/ga";
import { H3 } from "./markdown-elements";
import { deploy } from "../components/code-sandboxer.jsx";

function Source(props) {
  if (!props.children || typeof props.children !== "string")
    return null;
  return <Code>{props.children}</Code>;
}

function Example(props) {
  const {
    additionalPackages = {},
    path,
    children,
    title = null,
  } = props;
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

  async function handleOpenExample() {
    if (code) {
      const url = await deploy(
        `Base Web - ${title || "Example"}`,
        code,
        additionalPackages
      );
      if (url) {
        window.open(url, "_blank");
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
      </Block>

      {isOpen && (
        <React.Fragment>
          <Block>
            <Source>{code}</Source>
          </Block>
          <Button
            kind={KIND.secondary}
            size={SIZE.compact}
            onClick={handleOpenExample}
          >
            Try example on CodeSandbox
          </Button>
        </React.Fragment>
      )}
    </Card>
  );
}

export default Example;
