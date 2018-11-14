/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';
import {ProgressSteps, Step, NumberedStep} from './';
import examples from './examples-list';
import {Button} from '../button';
import {styled} from '../styles/index';
import type {ThemeT} from '../styles/types';

const SpacedButton = styled(Button, ({$theme}: {$theme: ThemeT}) => ({
  marginLeft: $theme.sizing.scale200,
  marginRight: $theme.sizing.scale200,
  marginTop: $theme.sizing.scale200,
}));

type DefaultExampleComponentPropsT = {
  isNumber: boolean,
};

type DefaultExampleComponentStateT = {
  current: number,
};

class DefaultExampleComponent extends React.Component<
  DefaultExampleComponentPropsT,
  DefaultExampleComponentStateT,
> {
  static defaultProps = {
    isNumber: false,
  };

  constructor(...props) {
    super(...props);

    this.state = {
      current: 0,
    };
  }

  render() {
    const {isNumber} = this.props;
    const GenericStep = isNumber ? NumberedStep : Step;

    return (
      <ProgressSteps current={this.state.current}>
        <GenericStep title="Create Account" isCompleted>
          <div>Here is some step content</div>
          <div>
            <SpacedButton disabled>Previous</SpacedButton>
            <SpacedButton onClick={() => this.setState({current: 1})}>
              Next
            </SpacedButton>
          </div>
        </GenericStep>
        <GenericStep title="Verify Payment" isCompleted>
          <div>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit...
          </div>
          <div>
            <SpacedButton onClick={() => this.setState({current: 0})}>
              Previous
            </SpacedButton>
            <SpacedButton onClick={() => this.setState({current: 2})}>
              Next
            </SpacedButton>
          </div>
        </GenericStep>
        <GenericStep title="Add Payment Method" isActive>
          <div>Here is some step content</div>
          <div>
            <SpacedButton onClick={() => this.setState({current: 1})}>
              Previous
            </SpacedButton>
            <SpacedButton disabled>Next</SpacedButton>
          </div>
        </GenericStep>
      </ProgressSteps>
    );
  }
}

export default {
  [examples.DEFAULT]: function Story1() {
    return <DefaultExampleComponent />;
  },
  [examples.NUMBERED]: function Story2() {
    return <DefaultExampleComponent isNumber />;
  },
};
