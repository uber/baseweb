import {ProgressSteps, Step} from 'baseui/progress-steps';
import {Button} from 'baseui/button';
import {PropTypes} from '../const';
import {TConfig} from '../types';

const ProgressStepsConfig: TConfig = {
  imports: {
    'baseui/progress-steps': {named: ['ProgressSteps']},
  },
  scope: {
    ProgressSteps,
    Step,
    Button,
  },
  theme: [''],
  props: {
    current: {
      value: '0',
      type: PropTypes.Number,
      description: 'Defines the current active step index.',
      stateful: true,
    },
    children: {
      value: `<Step title="Verify Address">
  <p>Address on file: 1455 Market Street</p>
  <Button size="compact" onClick={() => setCurrent(1)}>
    Next
  </Button>
</Step>
<Step title="Verify Payment">
  Payment verified
</Step>`,
      type: PropTypes.ReactNode,
      description: `An array of Tab components.`,
      imports: {
        'baseui/progress-steps': {named: ['Step']},
        'baseui/button': {named: ['Button']},
      },
      propHook: ({getYardOnChange, fnBodyAppend}) => ({
        JSXAttribute(path: any) {
          if (path.get('name').node.name === 'onClick') {
            fnBodyAppend(path.get('value'), getYardOnChange('1', 'current'));
          }
        },
      }),
    },
    overrides: {
      value: undefined,
      type: PropTypes.Overrides,
      description: 'Lets you customize all aspects of the component.',
      names: [
        'Content',
        'Description',
        'Icon',
        'InnerIcon',
        'Root',
        'Tail',
        'Title',
      ],
      sharedProps: {
        $isActive: {
          type: PropTypes.Boolean,
          description: 'Used when in active state',
        },
        $isCompleted: {
          type: PropTypes.Boolean,
          description: 'Used when in completed state',
        },
        $disabled: {
          type: PropTypes.Boolean,
          description: 'Used when in disabled state',
        },
      },
    },
  },
};

export default ProgressStepsConfig;
