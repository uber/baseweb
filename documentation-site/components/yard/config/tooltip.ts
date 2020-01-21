import {
  StatefulTooltip,
  ACCESSIBILITY_TYPE,
  PLACEMENT,
  TRIGGER_TYPE,
} from 'baseui/tooltip';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';
import {Button} from 'baseui/button';
import {Input} from 'baseui/input';

const tooltipProps = require('!!extract-react-types-loader!../../../../src/popover/stateful-popover.js');

import PopoverConfig from './popover';

const TooltipConfig: TConfig = {
  ...PopoverConfig,
  imports: {
    'baseui/tooltip': {named: ['StatefulTooltip']},
  },
  scope: {
    Button,
    Input,
    StatefulTooltip,
    ACCESSIBILITY_TYPE,
    PLACEMENT,
    TRIGGER_TYPE,
  },
  theme: [],
  props: {
    ...PopoverConfig.props,
    placement: {
      ...PopoverConfig.props.placement,
      imports: {
        'baseui/tooltip': {
          named: ['PLACEMENT'],
        },
      },
    },
    triggerType: {
      ...PopoverConfig.props.triggerType,
      value: 'TRIGGER_TYPE.hover',
      defaultValue: 'TRIGGER_TYPE.hover',
      imports: {
        'baseui/tooltip': {
          named: ['TRIGGER_TYPE'],
        },
      },
    },
    accessibilityType: {
      ...PopoverConfig.props.accessibilityType,
      imports: {
        'baseui/tooltip': {
          named: ['ACCESSIBILITY_TYPE'],
        },
      },
    },
    children: {
      value: `Hover me`,
      type: PropTypes.ReactNode,
      description: `The content that will trigger the popover.`,
    },
  },
  mapTokensToProps: {
    StatefulTooltip: tooltipProps,
  },
};

export default TooltipConfig;
