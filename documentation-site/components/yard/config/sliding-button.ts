/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { SlidingButton, THRESHOLD } from "baseui/sliding-button";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";

const SlidingButtonConfig: TConfig = {
  componentName: "SlidingButton",
  imports: {
    "baseui/sliding-button": {
      named: ["SlidingButton"],
    },
  },
  scope: {
    SlidingButton,
    THRESHOLD,
  },
  theme: [],
  props: {
    label: {
      value: "Slide to confirm",
      type: PropTypes.String,
      description: "Text displayed in the button track.",
    },
    onComplete: {
      value: '() => console.log("completed!")',
      type: PropTypes.Function,
      description: "Called once when the user drags past the threshold.",
    },
    threshold: {
      value: "THRESHOLD.high",
      defaultValue: "THRESHOLD.high",
      options: THRESHOLD,
      type: PropTypes.Enum,
      description:
        "Completion threshold — 'high' requires 80%, 'low' requires 20%.",
      imports: {
        "baseui/sliding-button": {
          named: ["THRESHOLD"],
        },
      },
    },
    isLoading: {
      value: false,
      type: PropTypes.Boolean,
      description: "Shows loading spinner, disables interaction.",
    },
    isDisabled: {
      value: false,
      type: PropTypes.Boolean,
      description: "Grays out the component, disables interaction.",
    },
    slideBackAfterMs: {
      value: undefined,
      type: PropTypes.Number,
      description: "Auto-reset to idle state after N milliseconds.",
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Override internal elements.",
    },
  },
};

export default SlidingButtonConfig;
