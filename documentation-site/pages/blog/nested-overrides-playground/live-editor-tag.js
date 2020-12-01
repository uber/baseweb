/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import Yard from '../../../components/yard/index';
import {Tag, KIND, VARIANT, SIZE} from 'baseui/tag';
import {PropTypes} from 'react-view';

const tagYardConfig = {
  componentName: 'Tag',
  imports: {
    'baseui/tag': {
      named: ['Tag'],
    },
  },
  scope: {
    Tag,
    KIND,
    VARIANT,
    SIZE,
  },
  theme: [
    'tagFontDisabledRampUnit',
    'tagOutlinedDisabledRampUnit',
    'tagSolidFontRampUnit',
    'tagSolidRampUnit',
    'tagOutlinedHoverRampUnit',
    'tagOutlinedFontRampUnit',
    'tagOutlinedRampUnit',

    'tagNeutralFontDisabled',
    'tagNeutralOutlinedDisabled',
    'tagNeutralSolidFont',
    'tagNeutralSolidBackground',
    'tagNeutralOutlinedBackground',
    'tagNeutralOutlinedFont',

    'tagPrimaryFontDisabled',
    'tagPrimaryOutlinedDisabled',
    'tagPrimarySolidFont',
    'tagPrimarySolidBackground',
    'tagPrimaryOutlinedBackground',
    'tagPrimaryOutlinedFont',

    'tagAccentFontDisabled',
    'tagAccentOutlinedDisabled',
    'tagAccentSolidFont',
    'tagAccentSolidBackground',
    'tagAccentOutlinedBackground',
    'tagAccentOutlinedFont',

    'tagPositiveFontDisabled',
    'tagPositiveOutlinedDisabled',
    'tagPositiveSolidFont',
    'tagPositiveSolidBackground',
    'tagPositiveOutlinedBackground',
    'tagPositiveOutlinedFont',

    'tagNegativeFontDisabled',
    'tagNegativeOutlinedDisabled',
    'tagNegativeSolidFont',
    'tagNegativeSolidBackground',
    'tagNegativeOutlinedBackground',
    'tagNegativeOutlinedFont',

    'tagWarningFontDisabled',
    'tagWarningOutlinedDisabled',
    'tagWarningSolidFont',
    'tagWarningSolidBackground',
    'tagWarningOutlinedBackground',
    'tagWarningOutlinedFont',
  ],
  props: {
    children: {
      value: 'this is a tag',
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
      value: 'KIND.primary',
      defaultValue: 'KIND.primary',
      options: KIND,
      type: PropTypes.Enum,
      description:
        'Defines tags look by purpose. Set it to one of KIND[key] values. Defaults to KIND.primary.',
      imports: {
        'baseui/tag': {
          named: ['KIND'],
        },
      },
    },
    color: {
      value: undefined,
      type: PropTypes.String,
      description: `The color theme to be applied to a Tag. To make this custom color active, you have to set kind to custom.`,
    },
    variant: {
      value: 'VARIANT.light',
      defaultValue: 'VARIANT.light',
      options: VARIANT,
      type: PropTypes.Enum,
      description:
        'Defines tags look. Set it to one of VARIANT[key] values. Defaults to VARIANT.light.',
      imports: {
        'baseui/tag': {
          named: ['VARIANT'],
        },
      },
    },
    size: {
      value: 'SIZE.small',
      defaultValue: 'SIZE.small',
      options: SIZE,
      type: PropTypes.Enum,
      description: 'Determines how large the Tag will be.',
      imports: {
        'baseui/tag': {
          named: ['SIZE'],
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
    overrides: {
      value: {
        Text: {
          active: true,
          style: '({ $theme }) => ({\n  color: $theme.colors.accent,\n})',
        },
      },
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'Action', 'ActionIcon', 'Text'],
        sharedProps: {
          $kind: 'kind',
          $variant: 'variant',
          $closeable: 'closeable',
          $isActive: {
            type: PropTypes.Boolean,
            description: 'Is tag active.',
          },
          $disabled: 'disabled',
          $isHovered: 'isHovered',
          $isFocused: 'isFocused',
        },
      },
    },
  },
};

export default () => {
  return <Yard placeholderHeight={34} {...tagYardConfig} initialTab="1" />;
};
