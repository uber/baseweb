import {ProgressSteps, NumberedStep} from 'baseui/progress-steps';
import {Button} from 'baseui/button';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

import ProgressStepsConfig from './progress-steps';

const progressStepsProps = require('!!extract-react-types-loader!../../../../src/progress-steps/progress-steps.js');
const numberedStepProps = require('!!extract-react-types-loader!../../../../src/progress-steps/numbered-step.js');
const buttonProps = require('!!extract-react-types-loader!../../../../src/button/button.js');

const ProgressStepsNumberedConfig: TConfig = {
  ...ProgressStepsConfig,
  scope: {
    ProgressSteps,
    NumberedStep,
    Button,
  },
  props: {
    ...ProgressStepsConfig.props,
    children: {
      value: `<NumberedStep title="Verify Address">
  <p>Address on file: 1455 Market Street</p>
  <Button size="compact" onClick={() => setCurrent(1)}>
    Next
  </Button>
</NumberedStep>
<NumberedStep title="Verify Payment">
  Payment verified
</NumberedStep>`,
      type: PropTypes.ReactNode,
      description: `An array of Tab components.`,
      imports: {
        'baseui/progress-steps': {named: ['NumberedStep']},
        'baseui/button': {named: ['Button']},
      },
      propHook: ProgressStepsConfig.props.children.propHook,
    },
  },
  mapTokensToProps: {
    ProgressSteps: progressStepsProps,
    NumberedStep: numberedStepProps,
    Button: buttonProps,
  },
};

export default ProgressStepsNumberedConfig;
