import pick from 'just-pick';
import {
  StatefulPopover,
  ACCESSIBILITY_TYPE,
  PLACEMENT,
  TRIGGER_TYPE,
} from 'spaceweb/popover';
import {Button} from 'baseui/button';
import {Block} from 'baseui/block';
import {Input} from 'baseui/input';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

import {changeHandlers} from './common/common';

const popoverProps = require('!!extract-react-types-loader!../../../../src/popover/stateful-popover.js');

const PopoverConfig: TConfig = {
  componentName: 'StatefulPopover',
  imports: {
    'baseui/popover': {named: ['StatefulPopover']},
  },
  scope: {
    Button,
    Block,
    Input,
    StatefulPopover,
    ACCESSIBILITY_TYPE,
    PLACEMENT,
    TRIGGER_TYPE,
  },
  theme: [],
  props: {
    content: {
      value: `() => (
  <Block padding={'20px'}>Hello, there! 👋
    <Input placeholder="Focusable Element" />
  </Block>
)
      `,
      type: PropTypes.Function,
      description: `The content of the popover.`,
      imports: {
        'baseui/input': {
          named: ['Input'],
        },
      },
    },
    children: {
      value: `<Button>Click me</Button>`,
      type: PropTypes.ReactNode,
      description: `The content that will trigger the popover.`,
      imports: {
        'baseui/button': {
          named: ['Button'],
        },
      },
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
    focusLock: {
      value: false,
      type: PropTypes.Boolean,
      description: 'If true, focus will be locked to the popover contents.',
    },
    returnFocus: {
      value: true,
      type: PropTypes.Boolean,
      description:
        'If true, focus will shift back to the original element after popover closes. Set this to false if focusing the original element triggers the popover.',
    },
    renderAll: {
      value: false,
      type: PropTypes.Boolean,
      description:
        'Renders all popover content for SEO purposes regardless of popover isOpen state.',
    },
    autoFocus: {
      value: true,
      type: PropTypes.Boolean,
      description:
        'If true, focus will shift to the first interactive element within the popover.',
      hidden: true,
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
