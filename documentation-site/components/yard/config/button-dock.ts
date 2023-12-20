/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { ButtonDock } from "baseui/button-dock";
import { PropTypes } from "react-view";
import { Button, KIND } from "baseui/button";
import { Checkbox } from "baseui/checkbox";

import type { TConfig } from "../types";

const ButtonDockConfig: TConfig = {
  componentName: "ButtonDock",
  imports: {
    "baseui/button-dock": {
      named: ["ButtonDock"],
    },
  },
  scope: {
    ButtonDock,
    Button,
    KIND,
    Checkbox,
  },
  theme: [],
  props: {
    primaryAction: {
      value: "<Button>Primary Action</Button>",
      type: PropTypes.ReactNode,
      description: "Defines the content of the primary action. Required",
      imports: {
        "baseui/button": {
          named: ["Button", "KIND"],
        },
      },
    },
    secondaryActions: {
      value:
        '[<Button kind={KIND.secondary} key="first">Secondary Action 1</Button>,<Button kind={KIND.secondary} key="second">Secondary Action 2</Button>,]',
      type: PropTypes.Array,
      description: "A list of up to two additional actions.",
      imports: {
        "baseui/button": {
          named: ["Button", "KIND"],
        },
      },
    },
    dismissiveAction: {
      value: "<Button kind={KIND.tertiary}>Dismiss</Button>",
      type: PropTypes.ReactNode,
      description: "Defines the content of the dissmissive action.",
      imports: {
        "baseui/button": {
          named: ["Button", "KIND"],
        },
      },
    },
    topAccessory: {
      value: undefined,
      placeholder: "<Checkbox>label</Checkbox>",
      type: PropTypes.ReactNode,
      description: "Defines the content of the dismissive action.",
      imports: {
        "baseui/checkbox": {
          named: ["Checkbox"],
        },
      },
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Lets you customize all aspects of the component.",
      custom: {
        names: ["Root", "ActionContainer", "ActionSubContainer"],
        sharedProps: {},
      },
    },
  },
};

export default ButtonDockConfig;
