/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from "react";
import { useStyletron } from "baseui";
import type { TImportsConfig } from "react-view";
import {
  MdContentCopy,
  MdFormatIndentIncrease,
  MdRotateRight,
} from "react-icons/md";

import { Button, KIND, SIZE } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";

const ActionButtons: React.FC<{
  formatCode: () => void;
  copyCode: () => void;
  copyUrl: () => void;
  reset: () => void;
  code: string;
  componentName: string;
  importsConfig: TImportsConfig;
}> = ({ formatCode, copyCode, reset, code, componentName, importsConfig }) => {
  const [, theme] = useStyletron();

  return (
    <React.Fragment>
      <ButtonGroup
        size={SIZE.compact}
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              flexWrap: "wrap",
              marginTop: $theme.sizing.scale300,
            }),
          },
        }}
      >
        <Button kind={KIND.tertiary} onClick={formatCode}>
          <MdFormatIndentIncrease
            style={{ paddingRight: theme.sizing.scale100 }}
          />{" "}
          Format
        </Button>
        <Button kind={KIND.tertiary} onClick={copyCode}>
          <MdContentCopy style={{ paddingRight: theme.sizing.scale100 }} /> Copy
        </Button>
        <Button
          kind={KIND.tertiary}
          onClick={() => {
            reset();
          }}
        >
          <MdRotateRight style={{ paddingRight: theme.sizing.scale100 }} />{" "}
          Reset
        </Button>
        <Button
          overrides={{
            BaseButton: {
              props: {
                $as: "a",
              },
            },
          }}
          // @ts-ignore
          href={`/cheat-sheet#${Object.keys(importsConfig)[0]
            .split("/")[1]
            .toLowerCase()}`}
          kind={KIND.tertiary}
        >
          API
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
};

export default ActionButtons;
