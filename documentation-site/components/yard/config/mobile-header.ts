/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { MobileHeader, TYPE } from 'baseui/mobile-header';
import { PropTypes } from 'react-view';
import type { TConfig } from '../types';
import { ArrowLeft, Plus, Check } from 'baseui/icon';

const MobileHeaderConfig: TConfig = {
  componentName: 'MobileHeader',
  imports: {
    'baseui/mobile-header': {
      named: ['MobileHeader'],
    },
    'baseui/icon': {
      named: ['ArrowLeft', 'Plus', 'Check'],
    },
  },
  scope: {
    MobileHeader,
    TYPE,
    ArrowLeft,
    Plus,
    Check,
  },
  theme: [],
  props: {
    title: {
      value: 'Header title',
      type: PropTypes.String,
      description: 'Title to be displayed in MobileHeader. Ignored when using the floating type.',
    },
    expanded: {
      value: false,
      type: PropTypes.Boolean,
      description:
        'Determines whether MobileHeader is expanded. Ignored when using the floating type.',
      defaultValue: false,
    },
    navButton: {
      value:
        '{content: ArrowLeft, onClick: () => alert("nav button click"), ariaLabel: "Go back to the previous screen"}',
      type: PropTypes.Object,
      description:
        'Determines the content (can be an icon or a string), onClick, and ariaLabel for the nav button',
    },
    additionalButtons: {
      value:
        '[{content: Plus, onClick: () => alert("plus button click"), ariaLabel: "Add another entry"}, {content: Check, onClick: () => alert("check button click"), ariaLabel: "Approve entries"}]',
      type: PropTypes.Array,
      description:
        'Determines the content (can be an icon or a string), onClick, and ariaLabel for the up to two additional buttons opposite the nav button.',
    },
    type: {
      value: undefined,
      defaultValue: undefined,
      options: TYPE,
      enumName: 'TYPE',
      type: PropTypes.Enum,
      description: 'Determines whether header if fixed or floating',
      imports: {
        'baseui/mobile-header': {
          named: ['TYPE'],
        },
      },
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'Title', 'NavContainer', 'HeaderButton', 'AdditionalButtonsContainer'],
        sharedProps: {},
      },
    },
  },
};

export default MobileHeaderConfig;
