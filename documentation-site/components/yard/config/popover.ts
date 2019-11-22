import pick from 'just-pick';
import {
  StatefulPopover,
  ACCESSIBILITY_TYPE,
  PLACEMENT,
  TRIGGER_TYPE,
} from 'baseui/popover';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

import {changeHandlers} from './common';

const popoverProps = require('!!extract-react-types-loader!../../../../src/popover/stateful-popover.js');

const PopoverConfig: TConfig = {
  imports: {
    'baseui/popover': {named: ['StatefulPopover']},
  },
  scope: {
    StatefulPopover,
    ACCESSIBILITY_TYPE,
    PLACEMENT,
    TRIGGER_TYPE,
  },
  theme: [],
  props: {
    content: {
      value: `() => 'Hello, there! 👋'`,
      type: PropTypes.Function,
      description: `The content of the popover.`,
    },
    children: {
      value: `Click me`,
      type: PropTypes.ReactNode,
      description: `The content that will trigger the popover.`,
    },
    placement: {
      value: 'PLACEMENT.auto',
      defaultValue: 'PLACEMENT.auto',
      options: PLACEMENT,
      type: PropTypes.Enum,
      description:
        'Controls how to position the popover relative to the target.',
      imports: {
        'baseui/popover': {
          named: ['PLACEMENT'],
        },
      },
    },
    triggerType: {
      value: 'TRIGGER_TYPE.click',
      defaultValue: 'TRIGGER_TYPE.click',
      options: TRIGGER_TYPE,
      enumName: 'TRIGGER_TYPE',
      type: PropTypes.Enum,
      description:
        'Controls how to position the popover relative to the target.',
      imports: {
        'baseui/popover': {
          named: ['TRIGGER_TYPE'],
        },
      },
    },
    showArrow: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        'If true, an arrow will be shown pointing from the popover to the trigger element.',
    },
    accessibilityType: {
      value: 'ACCESSIBILITY_TYPE.menu',
      defaultValue: 'ACCESSIBILITY_TYPE.menu',
      options: ACCESSIBILITY_TYPE,
      enumName: 'ACCESSIBILITY_TYPE',
      type: PropTypes.Enum,
      description:
        'Controls how this popover behaves for screen readers and other assistive devices.',
      imports: {
        'baseui/popover': {
          named: ['ACCESSIBILITY_TYPE'],
        },
      },
      hidden: true,
    },
    animateOutTime: {
      value: undefined,
      placeholder: '0',
      type: PropTypes.Number,
      description: 'Number of milliseconds used to fade out the popover.',
      hidden: true,
    },
    onMouseEnterDelay: {
      value: undefined,
      placeholder: '200',
      type: PropTypes.Number,
      description:
        'Number of milliseconds to wait before showing the popover after mouse enters the trigger element.',
      hidden: true,
    },
    onMouseLeaveDelay: {
      value: undefined,
      placeholder: '200',
      type: PropTypes.Number,
      description:
        'Number of milliseconds to wait before showing the popover after mouse leaves the trigger element.',
      hidden: true,
    },
    ignoreBoundary: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        'If true, popover element will not avoid element boundaries.',
      hidden: true,
    },
    mountNode: {
      value: undefined,
      type: PropTypes.String,
      description: 'Defines where to mount the popover.',
      hidden: true,
    },
    popperOptions: {
      value: undefined,
      type: PropTypes.Object,
      description:
        'Popper options override https://popper.js.org/popper-documentation.html#Popper.Defaults.',
      hidden: true,
    },
    ...pick(changeHandlers, [
      'onBlur',
      'onFocus',
      'onEsc',
      'onMouseEnter',
      'onMouseLeave',
    ]),
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Arrow', 'Body', 'Inner'],
        sharedProps: {
          $showArrow: 'showArrow',
          $placement: 'placement',
          $isOpen: {
            type: PropTypes.Boolean,
            description: 'True when the popover is opened.',
          },
          $isAnimating: {
            type: PropTypes.Boolean,
            description: 'True when the popover is animating.',
          },
        },
      },
    },
  },
  mapTokensToProps: {
    StatefulPopover: popoverProps,
  },
};

export default PopoverConfig;
