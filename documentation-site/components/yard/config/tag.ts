/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { Tag, KIND, HIERARCHY, SIZE } from "baseui/tag";
import { PropTypes } from "react-view";
import type { TConfig } from "../types";

const TagConfig: TConfig = {
  componentName: "Tag",
  imports: {
    "baseui/tag": {
      named: ["Tag"],
    },
  },
  scope: {
    Tag,
    KIND,
    HIERARCHY,
    SIZE,
  },
  theme: [
    "tagFontDisabledRampUnit",
    "tagSolidFontRampUnit",
    "tagSolidRampUnit",
    "tagOutlinedHoverRampUnit",
    "tagOutlinedFontRampUnit",
    "tagOutlinedRampUnit",

    "tagNeutralFontDisabled",
    "tagNeutralOutlinedDisabled",
    "tagNeutralSolidFont",
    "tagNeutralSolidBackground",
    "tagNeutralOutlinedBackground",
    "tagNeutralOutlinedFont",

    "tagPrimaryFontDisabled",
    "tagPrimaryOutlinedDisabled",
    "tagPrimarySolidFont",
    "tagPrimarySolidBackground",
    "tagPrimaryOutlinedBackground",
    "tagPrimaryOutlinedFont",

    "tagAccentFontDisabled",
    "tagAccentOutlinedDisabled",
    "tagAccentSolidFont",
    "tagAccentSolidBackground",
    "tagAccentOutlinedBackground",
    "tagAccentOutlinedFont",

    "tagPositiveFontDisabled",
    "tagPositiveOutlinedDisabled",
    "tagPositiveSolidFont",
    "tagPositiveSolidBackground",
    "tagPositiveOutlinedBackground",
    "tagPositiveOutlinedFont",

    "tagNegativeFontDisabled",
    "tagNegativeOutlinedDisabled",
    "tagNegativeSolidFont",
    "tagNegativeSolidBackground",
    "tagNegativeOutlinedBackground",
    "tagNegativeOutlinedFont",

    "tagWarningFontDisabled",
    "tagWarningOutlinedDisabled",
    "tagWarningSolidFont",
    "tagWarningSolidBackground",
    "tagWarningOutlinedBackground",
    "tagWarningOutlinedFont",
  ],
  props: {
    children: {
      value: "this is a tag",
      type: PropTypes.ReactNode,
      description: `Visible label.`,
    },
    onClick: {
      value: undefined,
      placeholder: '() => alert("click")',
      type: PropTypes.Function,
      description: `onClick handler for the tag. Passing an onClick handler also makes the tag clickable.`,
    },
    onActionClick: {
      value: undefined,
      placeholder: '() => alert("click")',
      type: PropTypes.Function,
      description: `onClick handler for the action button element.`,
    },
    closeable: {
      value: true,
      defaultValue: true,
      type: PropTypes.Boolean,
      description: `Include or exclude the "x" button and click action.`,
    },
    kind: {
      value: "KIND.primary",
      defaultValue: "KIND.primary",
      options: KIND,
      type: PropTypes.Enum,
      description:
        "Defines tags look by purpose. Set it to one of KIND[key] values. Defaults to KIND.primary.",
      imports: {
        "baseui/tag": {
          named: ["KIND"],
        },
      },
    },
    color: {
      value: undefined,
      type: PropTypes.String,
      description: `The color theme to be applied to a Tag. To make this custom color active, you have to set kind to custom.`,
    },
    hierarchy: {
      value: "HIERARCHY.secondary",
      defaultValue: "HIERARCHY.secondary",
      options: HIERARCHY,
      type: PropTypes.Enum,
      description:
        "Defines tags look. Set it to one of HIERARCHY[key] values. Defaults to HIERARCHY.secondary.",
      imports: {
        "baseui/tag": {
          named: ["HIERARCHY"],
        },
      },
    },
    size: {
      value: "SIZE.small",
      defaultValue: "SIZE.small",
      options: SIZE,
      type: PropTypes.Enum,
      description: "Determines how large the Tag will be.",
      imports: {
        "baseui/tag": {
          named: ["SIZE"],
        },
      },
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: `Disable the tag from being changed.`,
    },
    title: {
      value: undefined,
      type: PropTypes.String,
      description: `Text to display in native OS tooltip on long hover.`,
      hidden: true,
    },
    onKeyDown: {
      value: undefined,
      placeholder: '() => alert("click")',
      type: PropTypes.Function,
      description: `onkeydown handler for the tag.`,
      hidden: true,
    },
    onActionKeyDown: {
      value: undefined,
      placeholder: '() => alert("click")',
      type: PropTypes.Function,
      description: `keydown handler for the action button element.`,
      hidden: true,
    },
    startEnhancer: {
      value: undefined,
      placeholder: "() => <span>🦊</span>",
      type: PropTypes.Function,
      description: `A component rendered at the start of the tag.`,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: "Lets you customize all aspects of the component.",
      custom: {
        names: [
          "Root",
          "Action",
          "ActionIcon",
          "StartEnhancerContainer",
          "Text",
        ],
        sharedProps: {
          $kind: "kind",
          $hierarchy: "hierarchy",
          $closeable: "closeable",
          $isActive: {
            type: PropTypes.Boolean,
            description: "Is tag active.",
          },
          $disabled: "disabled",
          $isHovered: {
            type: PropTypes.Boolean,
            description: "Is tag hovered.",
          },
          $isFocused: {
            type: PropTypes.Boolean,
            description: "Is tag focused.",
          },
        },
      },
    },
  },
};

export default TagConfig;
