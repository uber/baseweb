import * as React from 'react';
import {
  ProgressSteps,
  NumberedStep,
  ORIENTATION,
} from 'baseui/progress-steps';
import {
  Button,
  SHAPE,
  ButtonProps,
  KIND,
  SIZE,
} from 'baseui/button';

function SpacedButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      shape={SHAPE.pill}
      kind={KIND.secondary}
      size={SIZE.compact}
      overrides={{
        BaseButton: {
          style: ({$theme}) => ({
            marginLeft: $theme.sizing.scale200,
            marginRight: $theme.sizing.scale200,
            marginTop: $theme.sizing.scale800,
          }),
        },
      }}
    />
  );
}

function ProgressStepsContainer() {
  const [current, setCurrent] = React.useState(0);
  return (
    <ProgressSteps
      current={current}
      orientation={ORIENTATION.horizontal}
    >
      <NumberedStep title="Create Account">
        <SpacedButton disabled>Previous</SpacedButton>
        <SpacedButton onClick={() => setCurrent(1)}>
          Next
        </SpacedButton>
      </NumberedStep>
      <NumberedStep title="Verify Payment">
        <SpacedButton onClick={() => setCurrent(0)}>
          Previous
        </SpacedButton>
        <SpacedButton onClick={() => setCurrent(2)}>
          Next
        </SpacedButton>
      </NumberedStep>
      <NumberedStep title="Add Payment Method">
        <SpacedButton onClick={() => setCurrent(1)}>
          Previous
        </SpacedButton>
        <SpacedButton disabled>Next</SpacedButton>
      </NumberedStep>
    </ProgressSteps>
  );
}

export default ProgressStepsContainer;
