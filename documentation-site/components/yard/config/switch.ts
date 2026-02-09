/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import pick from "just-pick";
import { Switch, LABEL_PLACEMENT, SIZE } from "baseui/switch";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";
import { changeHandlers } from "./common/common";

const SwitchConfig: TConfig = {
  componentName: "Switch",
  imports: {
    "baseui/switch": {
      named: ["Switch"],
    },
  },
  scope: {
    Switch,
    LABEL_PLACEMENT,
    SIZE,
  },
  theme: [
    "contentStateDisabled",
    "contentTertiary",
    "contentPrimary",
    "hoverOverlayAlpha",
    "contentInversePrimary",
    "hoverOverlayInverseAlpha",
    "backgroundTertiary",
    "backgroundStateDisabled",
    "backgroundInversePrimary",
    "borderStateDisabled",
  ],
  props: {
    checked: {
      value: false,
      type: PropTypes.Boolean,
      description: "Renders component in checked state.",
      stateful: true,
    },
    children: {
      value: `Sign up for the newsletter`,
      type: PropTypes.ReactNode,
      description: `The React Nodes displayed next to the switch.`,
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: "Renders component in disabled state.",
    },
    onChange: {
      value: "e => setChecked(e.target.checked)",
      type: PropTypes.Function,
      description: "Called when switch value is changed.",
      propHook: {
        what: "e.target.checked",
        into: "checked",
      },
    },
    showIcon: {
      value: false,
      type: PropTypes.Boolean,
      description: "Renders check icon when switch is enabled.",
    },
    labelPlacement: {
      value: "LABEL_PLACEMENT.right",
      options: LABEL_PLACEMENT,
      type: PropTypes.Enum,
      enumName: "LABEL_PLACEMENT",
      description:
        "Determines how to position the label relative to the switch.",
      imports: {
        "baseui/switch": {
          named: ["LABEL_PLACEMENT"],
        },
      },
    },
    size: {
      value: "SIZE.default",
      options: SIZE,
      type: PropTypes.Enum,
      enumName: "SIZE",
      description: "Determines the size of the switch(including the label).",
      imports: {
        "baseui/switch": {
          named: ["SIZE"],
        },
      },
    },
    required: {
      value: false,
      type: PropTypes.Boolean,
      description: "Renders component in required state.",
      hidden: true,
    },
    inputRef: {
      value: undefined,
      type: PropTypes.Ref,
      description: "A ref to access an input element.",
      hidden: true,
    },
    autoFocus: {
      value: false,
      type: PropTypes.Boolean,
      description: "If true the component will be focused on the first mount.",
      hidden: true,
    },
    containsInteractiveElement: {
      value: false,
      type: PropTypes.Boolean,
      description:
        "Indicates the switch label contains an interactive element, and the default label behavior should be prevented for child elements.",
      hidden: true,
    },
    name: {
      value: undefined,
      type: PropTypes.String,
      description: "Name attribute.",
      hidden: true,
    },
    title: {
      value: undefined,
      type: PropTypes.String,
      description: "Title attribute.",
      hidden: true,
    },
    "aria-label": {
      value: undefined,
      type: PropTypes.String,
      description: "Aria-label attribute",
      hidden: true,
    },
    ...pick(changeHandlers, [
      "onBlur",
      "onFocus",
      "onMouseDown",
      "onMouseEnter",
      "onMouseLeave",
    ]),
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Lets you customize all aspects of the component.",
      custom: {
        names: ["Root", "Toggle", "ToggleTrack", "Label", "Input"],
        sharedProps: {
          $isFocused: {
            type: PropTypes.Boolean,
            description: "True when the component is focused.",
          },
          $isHovered: {
            type: PropTypes.Boolean,
            description: "True when the component is hovered.",
          },
          $isActive: {
            type: PropTypes.Boolean,
            description: "True when the component is active.",
          },
          $checked: "checked",
          $required: "required",
          $disabled: "disabled",
          $labelPlacement: "labelPlacement",
          $size: "size",
          $showIcon: "showIcon",
        },
      },
    },
  },
};

export default SwitchConfig;
