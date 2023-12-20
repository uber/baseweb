/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import {
  FixedMarker,
  PINHEAD_SIZES_SHAPES,
  NEEDLE_SIZES,
  KIND,
  BADGE_ENHANCER_SIZES,
  LABEL_ENHANCER_POSITIONS,
} from "baseui/map-marker";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";
import { Check, Upload, Search } from "baseui/icon";

export const theme = [];

export const fixedMarkerProps = {
  label: {
    value: "Uber HQ",
    type: PropTypes.String,
    description: "Text to display inside of the marker.",
  },
  dragging: {
    value: false,
    type: PropTypes.Boolean,
    description:
      "Renders the component with circular shadow to represent dragging.",
    defaultValue: false,
  },
  size: {
    value: "PINHEAD_SIZES_SHAPES.medium",
    enumName: "PINHEAD_SIZES_SHAPES",
    defaultValue: "PINHEAD_SIZES_SHAPES.medium",
    options: PINHEAD_SIZES_SHAPES,
    type: PropTypes.Enum,
    description: "Size of the pinhead (top container) of the marker.",
    imports: {
      "baseui/map-marker": {
        named: ["PINHEAD_SIZES_SHAPES"],
      },
    },
  },
  needle: {
    value: "NEEDLE_SIZES.medium",
    enumName: "NEEDLE_SIZES",
    defaultValue: "NEEDLE_SIZES.medium",
    options: NEEDLE_SIZES,
    type: PropTypes.Enum,
    description: "Size of the needle (bottom element) of the marker.",
    imports: {
      "baseui/map-marker": {
        named: ["NEEDLE_SIZES"],
      },
    },
  },
  startEnhancer: {
    value: "({size}) => <Upload size={size}/>",
    placeholder: "({size}) => <Upload size={size}/>",
    type: PropTypes.Function,
    description:
      "Icon or element to render in the leading slot (before the label).",
    imports: {
      "baseui/icon": {
        named: ["Upload"],
      },
    },
  },
  endEnhancer: {
    value: undefined,
    placeholder: "({size}) => <Search size={size}/>",
    type: PropTypes.Function,
    description:
      "Icon or element to render in the trailing slot (after the label).",
    imports: {
      "baseui/icon": {
        named: ["Search"],
      },
    },
  },
  kind: {
    value: "KIND.default",
    enumName: "KIND",
    defaultValue: "KIND.default",
    options: KIND,
    type: PropTypes.Enum,
    description: "Kind changes colors of the PinHead, Needle and DragShadow.",
    imports: {
      "baseui/map-marker": {
        named: ["KIND"],
      },
    },
  },
  badgeEnhancerSize: {
    value: "BADGE_ENHANCER_SIZES.none",
    enumName: "BADGE_ENHANCER_SIZES",
    defaultValue: "BADGE_ENHANCER_SIZES.none",
    options: BADGE_ENHANCER_SIZES,
    type: PropTypes.Enum,
    description: "Size of the badge enhancer.",
    imports: {
      "baseui/map-marker": {
        named: ["BADGE_ENHANCER_SIZES"],
      },
    },
  },
  badgeEnhancerContent: {
    value: "({size}) => <Check size={size}/>",
    placeholder: "({size}) => <Check size={size}/>",
    type: PropTypes.Function,
    description: "Content to render inside of the badge enhancer.",
    imports: {
      "baseui/icon": {
        named: ["Check"],
      },
    },
  },
  labelEnhancerContent: {
    value: "Uber Eats",
    type: PropTypes.String,
    description: "Text to display as the optional label enhancer.",
  },
  labelEnhancerPosition: {
    value: "LABEL_ENHANCER_POSITIONS.bottom",
    enumName: "LABEL_ENHANCER_POSITIONS",
    defaultValue: "LABEL_ENHANCER_POSITIONS.bottom",
    options: LABEL_ENHANCER_POSITIONS,
    type: PropTypes.Enum,
    description: "Position of the label enhancer.",
    imports: {
      "baseui/map-marker": {
        named: ["LABEL_ENHANCER_POSITIONS"],
      },
    },
  },
};

const FixedMarkerConfig: TConfig = {
  componentName: "FixedMarker",
  imports: {
    "baseui/map-marker": {
      named: ["FixedMarker"],
    },
    "baseui/icon": {
      named: ["Check"],
    },
  },
  scope: {
    FixedMarker,
    NEEDLE_SIZES,
    KIND,
    PINHEAD_SIZES_SHAPES,
    BADGE_ENHANCER_SIZES,
    Check,
    Upload,
    LABEL_ENHANCER_POSITIONS,
    Search,
  },
  theme,
  props: {
    ...fixedMarkerProps,
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Lets you customize all aspects of the component.",
      custom: {
        names: [
          "Root",
          "PinHead",
          "LabelSlot",
          "Label",
          "EnhancerSlot",
          "PinHeadContainer",
          "Needle",
          "DragShadow",
          "DragShadowContainer",
          "DragContainer",
          "BadgeEnhancer",
          "LabelEnhancerContainer",
          "LabelEnhancer",
        ],
        sharedProps: {},
      },
    },
  },
};

export default FixedMarkerConfig;
