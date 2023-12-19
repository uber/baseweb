/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { ButtonGroup, MODE, SIZE, SHAPE } from "baseui/button-group";
import { Button } from "baseui/button";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";

const ButtonGroupConfig: TConfig = {
  componentName: "ButtonGroup",
  imports: {
    "baseui/button-group": {
      named: ["ButtonGroup"],
    },
  },
  scope: {
    Button,
    ButtonGroup,
    MODE,
    SIZE,
    SHAPE,
  },
  theme: [
    "buttonPrimaryFill",
    "buttonPrimaryText",
    "buttonPrimaryHover",
    "buttonPrimaryActive",
    "buttonSecondaryFill",
    "buttonSecondaryText",
    "buttonSecondaryHover",
    "buttonSecondaryActive",
    "buttonTertiaryFill",
    "buttonTertiaryText",
    "buttonTertiaryHover",
    "buttonTertiaryActive",
    "buttonTertiarySelectedFill",
    "buttonTertiarySelectedText",
    "buttonMinimalFill",
    "buttonMinimalText",
    "buttonMinimalHover",
    "buttonMinimalActive",
    "buttonDisabledFill",
    "buttonDisabledText",
    "buttonPrimarySelectedFill",
    "buttonPrimarySelectedText",
    "buttonSecondarySelectedFill",
    "buttonSecondarySelectedText",
  ],
  props: {
    children: {
      value:
        "<Button>One</Button>\n<Button>Two</Button>\n<Button>Three</Button>",
      type: PropTypes.ReactNode,
      description: "Buttons within the group",
      imports: {
        "baseui/button": {
          named: ["Button"],
        },
      },
    },
    "aria-label": {
      value: undefined,
      type: PropTypes.String,
      description: "Aria-label attribute",
      hidden: true,
    },
    onClick: {
      value: undefined,
      type: PropTypes.Function,
      description: `Function called when any button is clicked. The index of the clicked button is provided as second parameter.`,
      hidden: true,
    },
    selected: {
      value: undefined,
      type: PropTypes.Array,
      description: "Defines which buttons are selected",
      hidden: true,
    },
    size: {
      value: "SIZE.default",
      defaultValue: "SIZE.default",
      options: SIZE,
      type: PropTypes.Enum,
      description: "Defines the size of the button.",
      imports: {
        "baseui/button-group": {
          named: ["SIZE"],
        },
      },
    },
    shape: {
      value: "SHAPE.default",
      defaultValue: "SHAPE.default",
      options: SHAPE,
      type: PropTypes.Enum,
      description: "Defines the shape of the button in the button group.",
      imports: {
        "baseui/button-group": {
          named: ["SHAPE"],
        },
      },
    },
    mode: {
      value: "MODE.checkbox",
      defaultValue: "MODE.checkbox",
      options: MODE,
      type: PropTypes.Enum,
      description:
        "Changes keyboard shortcuts and role attributes. The actual onClick update implementation is up to you.",
      imports: {
        "baseui/button-group": {
          named: ["MODE"],
        },
      },
      hidden: true,
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: "Indicates that the button group is disabled",
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Lets you customize all aspects of the component.",
      custom: {
        names: ["Root"],
        sharedProps: {},
      },
    },
  },
};

export default ButtonGroupConfig;
