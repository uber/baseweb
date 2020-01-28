import {ProgressSteps, Step} from 'baseui/progress-steps';
import {Button} from 'baseui/button';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const progressStepsProps = require('!!extract-react-types-loader!../../../../src/progress-steps/progress-steps.js');
const stepProps = require('!!extract-react-types-loader!../../../../src/progress-steps/step.js');
const buttonProps = require('!!extract-react-types-loader!../../../../src/button/button.js');

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
      propHook: ({getInstrumentOnChange, fnBodyAppend}) => ({
        JSXAttribute(path: any) {
          if (path.get('name').node.name === 'onClick') {
            fnBodyAppend(
              path.get('value'),
              getInstrumentOnChange('1', 'current'),
            );
          }
        },
      }),
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Content',
          'Description',
          'Icon',
          'InnerIcon',
          'Root',
          'StepRoot',
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
  },
  mapTokensToProps: {
    ProgressSteps: progressStepsProps,
    Step: stepProps,
    Button: buttonProps,
  },
};

export default ProgressStepsConfig;
