/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from '../../styles/index.js';
import {Button} from '../../button/index.js';
import {ProgressSteps, NumberedStep} from '../index.js';

export const name = 'numbered-steps';

const SpacedButton = props => {
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
};

export const component = () => {
  const [current, setCurrent] = React.useState(0);
  const [useCss, theme] = useStyletron();
  return (
    <ProgressSteps current={current}>
      <NumberedStep title="Create Account">
        <div className={useCss({...theme.typography.font400})}>
          Here is some step content
        </div>
        <SpacedButton disabled>Previous</SpacedButton>
        <SpacedButton onClick={() => setCurrent(1)}>Next</SpacedButton>
      </NumberedStep>
      <NumberedStep title="Verify Payment">
        <div className={useCss({...theme.typography.font400})}>
          Here is some more content
        </div>
        <SpacedButton onClick={() => setCurrent(0)}>Previous</SpacedButton>
        <SpacedButton onClick={() => setCurrent(2)}>Next</SpacedButton>
      </NumberedStep>
      <NumberedStep title="Add Payment Method">
        <div className={useCss({...theme.typography.font400})}>Here too!</div>
        <SpacedButton onClick={() => setCurrent(1)}>Previous</SpacedButton>
        <SpacedButton disabled>Next</SpacedButton>
      </NumberedStep>
    </ProgressSteps>
  );
};
