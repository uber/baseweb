/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { SystemBanner } from "baseui/system-banner";
import { KIND } from "baseui/banner";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";
import Alert from "baseui/icon/alert";

const SystemBannerConfig: TConfig = {
  componentName: "SystemBanner",
  imports: {
    "baseui/system-banner": {
      named: ["SystemBanner"],
    },
    "baseui/banner": {
      named: ["KIND"],
    },
    "baseui/icon/alert": {
      named: [],
      default: "Alert",
    },
  },
  scope: {
    SystemBanner,
    KIND,
    Alert,
  },
  theme: [
    "bannerActionLowInfo",
    "bannerActionLowNegative",
    "bannerActionLowPositive",
    "bannerActionLowWarning",
    "bannerActionHighInfo",
    "bannerActionHighNegative",
    "bannerActionHighPositive",
    "bannerActionHighWarning",
  ],
  props: {
    children: {
      value: "System-wide notification",
      type: PropTypes.ReactNode,
      description: "Message displayed in the banner.",
    },
    title: {
      value: "Attention",
      type: PropTypes.ReactNode,
      description: "Title displayed at the top of the banner.",
    },
    artworkIcon: {
      value: "({ size }) => <Alert size={size} />",
      placeholder: "({ size }) => <Alert size={size} />",
      imports: {
        "baseui/icon/alert": {
          named: [],
          default: "Alert",
        },
      },
      type: PropTypes.ReactNode,
      description: "Icon component to display in the banner.",
    },
    primaryAction: {
      value:
        "{ onClick: () => alert('Primary action clicked'), label: 'Action' }",
      type: PropTypes.Object,
      description:
        "Primary action configuration with onClick, label, and optional icon.",
    },
    secondaryAction: {
      value:
        "{ onClick: () => alert('Secondary action clicked'), label: 'Dismiss' }",
      type: PropTypes.Object,
      description:
        "Secondary action configuration with onClick, label, and optional icon.",
    },
    kind: {
      value: "KIND.info",
      defaultValue: "KIND.info",
      options: KIND,
      type: PropTypes.Enum,
      description: "Determines color scheme and conveys message intent.",
      imports: {
        "baseui/banner": {
          named: ["KIND"],
        },
      },
    },
    nested: {
      value: false,
      type: PropTypes.Boolean,
      description:
        "Used to make the banner visually distinct from its container element.",
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Lets you customize all aspects of the component.",
      custom: {
        names: [
          "BelowContent",
          "LeadingContent",
          "Message",
          "MessageContent",
          "Root",
          "Title",
          "TrailingContent",
          "TrailingButtonContainer",
          "TrailingIconButton",
        ],
        sharedProps: {
          $kind: "kind",
          $nested: "nested",
        },
      },
    },
  },
};

export default SystemBannerConfig;
