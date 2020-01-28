/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Block} from '../../block/index.js';
import {Button} from '../../button/index.js';
import {ProgressSteps, Step} from '../index.js';

export const name = 'progress-steps';

export const component = () => <ProgressStepsContainer />;

class ProgressStepsContainer extends React.Component<{}, {current: number}> {
  state = {current: 0};

  render() {
    return (
      <ProgressSteps current={this.state.current}>
        <Step title="Create Account">
          <Block data-e2e="content-1" font="font400">
            Here is some step content
          </Block>
          <Button
            data-e2e="button-next"
            onClick={() => this.setState({current: 1})}
          >
            Next
          </Button>
        </Step>
        <Step title="Verify Payment">
          <Block data-e2e="content-2" font="font400">
            Here is some more content
          </Block>
          <Button
            data-e2e="button-previous"
            onClick={() => this.setState({current: 0})}
          >
            Previous
          </Button>
          <Button onClick={() => this.setState({current: 2})}>Next</Button>
        </Step>
        <Step title="Add Payment Method">
          <Block data-e2e="content-3" font="font400">
            Here too!
          </Block>
          <Button onClick={() => this.setState({current: 1})}>Previous</Button>
        </Step>
      </ProgressSteps>
    );
  }
}
