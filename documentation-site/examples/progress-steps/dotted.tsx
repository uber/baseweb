import * as React from 'react';
import {ProgressSteps, Step} from 'baseui/progress-steps';
import {Button, ButtonProps} from 'baseui/button';
import {useStyletron} from 'baseui';
import {StatefulSelect, TYPE} from 'baseui/select';

function SpacedButton(props: ButtonProps) {
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
  const [css, theme] = useStyletron();

  return (
    <ProgressSteps current={current}>
      <Step title="Create Account">
        <div className={css({...theme.typography.font300})}>
          Here is some step content
        </div>
        <StatefulSelect
          options={[
            {id: 'AliceBlue', color: '#F0F8FF'},
            {id: 'AntiqueWhite', color: '#FAEBD7'},
            {id: 'Aqua', color: '#00FFFF'},
            {id: 'Aquamarine', color: '#7FFFD4'},
            {id: 'Azure', color: '#F0FFFF'},
            {id: 'Beige', color: '#F5F5DC'},
          ]}
          labelKey="id"
          valueKey="color"
          placeholder="Choose a color"
          maxDropdownHeight="300px"
          type={TYPE.search}
          onChange={event => console.log(event)}
        />
        <SpacedButton disabled>Previous</SpacedButton>
        <SpacedButton onClick={() => setCurrent(1)}>
          Next
        </SpacedButton>
      </Step>
      <Step title="Verify Payment">
        <div className={css({...theme.typography.font300})}>
          Here is some some content
        </div>
        <SpacedButton onClick={() => setCurrent(0)}>
          Previous
        </SpacedButton>
        <SpacedButton onClick={() => setCurrent(2)}>
          Next
        </SpacedButton>
      </Step>
      <Step title="Add Payment Method">
        <div className={css({...theme.typography.font300})}>
          Here too!
        </div>
        <SpacedButton onClick={() => setCurrent(1)}>
          Previous
        </SpacedButton>
        <SpacedButton disabled>Next</SpacedButton>
      </Step>
    </ProgressSteps>
  );
}

export default ProgressStepsContainer;
