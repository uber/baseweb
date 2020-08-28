// @flow
import * as React from 'react';
import {ProgressSteps, NumberedStep} from 'baseui/progress-steps';
import {Button, SHAPE} from 'baseui/button';
import {useStyletron} from 'baseui';

function SpacedButton(props) {
  return (
    <Button
      {...props}
      shape={SHAPE.pill}
      overrides={{
        BaseButton: {
          style: ({$theme}) => ({
            marginLeft: $theme.sizing.scale200,
            marginRight: $theme.sizing.scale200,
            marginTop: $theme.sizing.scale800,
            width: $theme.sizing.scale1800,
            height: $theme.sizing.scale900,
            color: $theme.colors.primaryA,
            backgroundColor: $theme.colors.primary100,
            ...$theme.typography.font200,
          }),
        },
      }}
    />
  );
}

function ProgressStepsContainer() {
  const [current, setCurrent] = React.useState(0);
  const [css, theme] = useStyletron();
  return (
    <ProgressSteps current={current}>
      <NumberedStep title="Create Account">
        <div className={css({...theme.typography.font200})}>
          Here is some step content
        </div>
        <SpacedButton disabled>Previous</SpacedButton>
        <SpacedButton onClick={() => setCurrent(1)}>
          Next
        </SpacedButton>
      </NumberedStep>
      <NumberedStep title="Verify Payment">
        <div className={css({...theme.typography.font200})}>
          Here is some more content
        </div>
        <SpacedButton onClick={() => setCurrent(0)}>
          Previous
        </SpacedButton>
        <SpacedButton onClick={() => setCurrent(2)}>
          Next
        </SpacedButton>
      </NumberedStep>
      <NumberedStep title="Add Payment Method">
        <div className={css({...theme.typography.font200})}>
          Here too!
        </div>
        <SpacedButton onClick={() => setCurrent(1)}>
          Previous
        </SpacedButton>
        <SpacedButton disabled>Next</SpacedButton>
      </NumberedStep>
    </ProgressSteps>
  );
}

export default ProgressStepsContainer;
