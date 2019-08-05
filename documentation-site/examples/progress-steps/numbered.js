// @flow
import * as React from 'react';
import {ProgressSteps, NumberedStep} from 'baseui/progress-steps';
import {Button} from 'baseui/button';
import {useStyletron} from 'baseui';

function SpacedButton(props) {
  return (
    <Button
      {...props}
      overrides={{
        BaseButton: {
          style: ({$theme}) => ({
            marginLeft: $theme.sizing.scale200,
            marginRight: $theme.sizing.scale200,
            marginTop: $theme.sizing.scale200,
          }),
        },
      }}
    />
  );
}

function ProgressStepsContainer() {
  const [current, setCurrent] = React.useState(0);
  const [useCss, theme] = useStyletron();
  return (
    <ProgressSteps current={this.state.current}>
      <NumberedStep title="Create Account">
        <div className={useCss({...theme.typography.font400})}>
          Here is some step content
        </div>
        <SpacedButton disabled>Previous</SpacedButton>
        <SpacedButton onClick={() => this.setState({current: 1})}>
          Next
        </SpacedButton>
      </NumberedStep>
      <NumberedStep title="Verify Payment">
        <div className={useCss({...theme.typography.font400})}>
          Here is some more content
        </div>
        <SpacedButton onClick={() => this.setState({current: 0})}>
          Previous
        </SpacedButton>
        <SpacedButton onClick={() => this.setState({current: 2})}>
          Next
        </SpacedButton>
      </NumberedStep>
      <NumberedStep title="Add Payment Method">
        <div className={useCss({...theme.typography.font400})}>
          Here too!
        </div>
        <SpacedButton onClick={() => this.setState({current: 1})}>
          Previous
        </SpacedButton>
        <SpacedButton disabled>Next</SpacedButton>
      </NumberedStep>
    </ProgressSteps>
  );
}

export default ProgressStepsContainer;
