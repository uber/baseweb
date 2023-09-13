/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { Dialog, SIZE, PLACEMENT } from "baseui/dialog";
import { Button, KIND } from "baseui/button";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";

const DialogConfig: TConfig = {
  componentName: "Dialog",
  imports: {
    "baseui/dialog": {
      named: ["Dialog"],
    },
    "baseui/button": {
      named: ["Button", "KIND"],
    },
  },
  scope: {
    Dialog,
    SIZE,
    PLACEMENT,
    Button,
    KIND,
  },
  theme: [],
  props: {
    isOpen: {
      value: false,
      type: PropTypes.Boolean,
      description: "Toggles Dialog visibility.",
      stateful: true,
    },
    artwork: {
      value: undefined,
      type: PropTypes.ReactNode,
      description: "Optional leading icon or content.",
    },
    handleDismiss: {
      value: "() => setIsOpen(false);",
      type: PropTypes.Function,
      description: "A callback that controls dimissle of the dialog.",
      propHook: {
        what: "false",
        into: "isOpen",
      },
    },
    showDismissButton: {
      value: true,
      type: PropTypes.Boolean,
      description:
        "Determines whether the dismiss button is shown. Ignored if handleDismiss is null or undefined.",
    },
    heading: {
      value: "Dialog Heading",
      type: PropTypes.String,
      description: "The value of the dialog heading.",
    },
    buttonDock: {
      value: `{
        primaryAction: <Button>Primary Action</Button>,
        dismissiveAction: (
          <Button kind={KIND.tertiary}>
            Dismiss
          </Button>
        ),
        secondaryActions: [
          <Button kind={KIND.secondary} key="first">
            Secondary Action
          </Button>,
        ],
      }`,
      type: PropTypes.Object,
      description: "Directly exposes the ButttonDock API",
    },
    hasOverlay: {
      value: true,
      type: PropTypes.Boolean,
      description: "Determines whether Dialog is presented modally.",
    },
    numHeadingLines: {
      value: 2,
      defaultValue: 2,
      type: PropTypes.Number,
      description:
        "The maximum number of lines the heading can wrap to before truncation.",
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Lets you customize all aspects of the component.",
      custom: {
        names: [
          "Root",
          "ScrollContainer",
          "Heading",
          "Body",
          "ButtonDock",
          "DismissButton",
        ],
        sharedProps: {},
      },
    },
    placement: {
      value: "PLACEMENT.center",
      defaultValue: "PLACEMENT.center",
      options: PLACEMENT,
      enumName: "PLACEMENT",
      type: PropTypes.Enum,
      description: "The position of Dialog relative to the viewport",
      imports: {
        "baseui/dialog": {
          named: ["PLACEMENT"],
        },
      },
    },
    size: {
      value: "SIZE.xSmall",
      defaultValue: "SIZE.xSmall",
      options: SIZE,
      enumName: "SIZE",
      type: PropTypes.Enum,
      description: "Determines the size of the open Dialog",
      imports: {
        "baseui/dialog": {
          named: ["SIZE"],
        },
      },
    },
    children: {
      value: `<p>
      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
      voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
      cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id
      est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
    </p>`,
      type: PropTypes.ReactNode,
      description: "Content of the dialog.",
    },
  },
};

export default DialogConfig;
