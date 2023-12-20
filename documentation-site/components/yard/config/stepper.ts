/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { Stepper } from "baseui/stepper";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";

const StepperConfig: TConfig = {
  componentName: "Stepper",
  imports: {
    "baseui/stepper": {
      named: ["Stepper"],
    },
  },
  scope: {
    Stepper,
  },
  theme: [],
  props: {
    value: {
      value: 0,
      type: PropTypes.Number,
      description: "The value displayed in Stepper.",
      stateful: true,
    },
    minValue: {
      value: 0,
      defaultValue: 0,
      type: PropTypes.Number,
      description: "The minimum value for value.",
    },
    maxValue: {
      value: undefined,
      type: PropTypes.Number,
      description: "The maximum value for value.",
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: "Indicates that the stepper is disabled.",
    },
    setValue: {
      value: "(newValue) => setValue(newValue)",
      type: PropTypes.Function,
      description: `Function called when message card is clicked.`,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Lets you customize all aspects of the component.",
      custom: {
        names: [
          "Root",
          "Input",
          "DecrementButton",
          "DecrementButtonIcon",
          "IncrementButton",
          "IncrementButtonIcon",
        ],
        sharedProps: {},
      },
    },
  },
};

export default StepperConfig;
