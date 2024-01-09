/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { ProgressSteps, Step, ORIENTATION } from "baseui/progress-steps";
import { Button } from "baseui/button";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";

const ProgressStepsConfig: TConfig = {
  componentName: "ProgressSteps",
  imports: {
    "baseui/progress-steps": { named: ["ProgressSteps"] },
  },
  scope: {
    ProgressSteps,
    Step,
    ORIENTATION,
    Button,
  },
  theme: [""],
  props: {
    current: {
      value: "0",
      type: PropTypes.Number,
      description: "Defines the current active step index.",
      stateful: true,
    },
    orientation: {
      value: "ORIENTATION.vertical",
      defaultValue: "ORIENTATION.vertical",
      type: PropTypes.Enum,
      options: ORIENTATION,
      description: "The orientation of the progress steps component.",
      imports: {
        "baseui/progress-steps": { named: ["ORIENTATION"] },
      },
    },
    alwaysShowDescription: {
      value: false,
      type: PropTypes.Boolean,
      description:
        "When true, each step's description will always be displayed regardless of whether it is the currently active step",
    },
    children: {
      value: `<Step title="Verify Address">
  <p>Address on file: 1455 Market Street</p>
  <Button size="compact" onClick={() => setCurrent(1)}>
    Next
  </Button>
</Step>
<Step title="Verify Payment">
  Payment verified
</Step>`,
      type: PropTypes.ReactNode,
      description: `An array of Tab components.`,
      imports: {
        "baseui/progress-steps": { named: ["Step"] },
        "baseui/button": { named: ["Button"] },
      },
      propHook: ({ getInstrumentOnChange, fnBodyAppend }) => ({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        JSXAttribute(path: any) {
          if (path.get("name").node.name === "onClick") {
            fnBodyAppend(
              path.get("value"),
              getInstrumentOnChange("1", "current"),
            );
          }
        },
      }),
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Lets you customize all aspects of the component.",
      custom: {
        names: [
          "Content",
          "Description",
          "Icon",
          "IconContainer",
          "InnerIcon",
          "Root",
          "StepRoot",
          "Tail",
          "Title",
        ],
        sharedProps: {
          $isActive: {
            type: PropTypes.Boolean,
            description: "Used when in active state",
          },
          $isCompleted: {
            type: PropTypes.Boolean,
            description: "Used when in completed state",
          },
          $disabled: {
            type: PropTypes.Boolean,
            description: "Used when in disabled state",
          },
        },
      },
    },
  },
};

export default ProgressStepsConfig;
