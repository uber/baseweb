/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { Button, KIND, SIZE, SHAPE, WIDTH_TYPE } from "baseui/button";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";

const ButtonConfig: TConfig = {
  componentName: "Button",
  imports: {
    "baseui/button": {
      named: ["Button"],
    },
  },
  scope: {
    Button,
    KIND,
    SIZE,
    SHAPE,
    WIDTH_TYPE,
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
  ],
  props: {
    children: {
      value: "Hello",
      type: PropTypes.ReactNode,
      description: `Visible label.`,
    },
    onClick: {
      value: '() => alert("click")',
      type: PropTypes.Function,
      description: `Function called when button is clicked.`,
    },
    startEnhancer: {
      value: undefined,
      placeholder: "() => <span>🦊</span>",
      type: PropTypes.Function,
      description: `A component rendered at the start of the button.`,
    },
    endEnhancer: {
      value: undefined,
      placeholder: "<i>world!</i>",
      type: PropTypes.Function,
      description: `A component rendered at the end of the button.`,
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: "Indicates that the button is disabled",
    },
    kind: {
      value: "KIND.primary",
      defaultValue: "KIND.primary",
      options: KIND,
      type: PropTypes.Enum,
      description: "Defines the kind (purpose) of a button.",
      imports: {
        "baseui/button": {
          named: ["KIND"],
        },
      },
    },
    size: {
      value: "SIZE.medium",
      defaultValue: "SIZE.medium",
      options: SIZE,
      type: PropTypes.Enum,
      description: "Defines the size of the button.",
      imports: {
        "baseui/button": {
          named: ["SIZE"],
        },
      },
    },
    shape: {
      value: "SHAPE.rectangular",
      defaultValue: "SHAPE.rectangular",
      options: SHAPE,
      type: PropTypes.Enum,
      description: "Defines the shape of the button.",
      imports: {
        "baseui/button": {
          named: ["SHAPE"],
        },
      },
    },
    widthType: {
      value: "WIDTH_TYPE.hug",
      defaultValue: "WIDTH_TYPE.hug",
      options: WIDTH_TYPE,
      type: PropTypes.Enum,
      description: `Controls the button's width behavior.`,
      imports: {
        "baseui/button": {
          named: ["WIDTH_TYPE"],
        },
      },
      enumName: "WIDTH_TYPE",
    },
    colors: {
      value: undefined,
      defaultValue: '{backgroundColor: "#03703c", color: "white"}',
      type: PropTypes.Object,
      description: "Lets you customize the background and text color.",
    },
    isLoading: {
      value: false,
      type: PropTypes.Boolean,
      description: "Show loading button style and spinner.",
    },
    isSelected: {
      value: false,
      type: PropTypes.Boolean,
      description: "Indicates that the button is selected.",
    },
    backgroundSafe: {
      value: false,
      type: PropTypes.Boolean,
      description: "Applies styles for a floating action button.",
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Lets you customize all aspects of the component.",
      custom: {
        names: [
          "BaseButton",
          "EndEnhancer",
          "LoadingSpinner",
          "LoadingSpinnerContainer",
          "StartEnhancer",
        ],
        sharedProps: {
          $kind: "kind",
          $isSelected: "isSelected",
          $shape: "shape",
          $size: "size",
          $isLoading: "isLoading",
          $disabled: "disabled",
        },
      },
    },
  },
};

export default ButtonConfig;
