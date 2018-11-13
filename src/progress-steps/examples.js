/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';
import {ProgressSteps, Step} from './';
import examples from './examples-list';
import {Button} from '../button';
import {styled} from '../styles/index';

const SpacedButton = styled(Button, {
  marginLeft: '6px',
  marginRight: '6px',
  marginTop: '6px',
});

export default {
  [examples.DEFAULT]: function Story1() {
    type DefaultExampleComponentStateT = {
      current: number,
    };

    class DefaultExampleComponent extends React.Component<
      {},
      DefaultExampleComponentStateT,
    > {
      constructor(...props) {
        super(...props);

        this.state = {
          current: 0,
        };
      }

      render() {
        return (
          <ProgressSteps current={this.state.current}>
            <Step title="Create Account" isCompleted>
              <div>Here is some step content</div>
              <div>
                <SpacedButton disabled>Previous</SpacedButton>
                <SpacedButton onClick={() => this.setState({current: 1})}>
                  Next
                </SpacedButton>
              </div>
            </Step>
            <Step title="Verify Payment" isCompleted>
              <div>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur?
              </div>
              <div>
                <SpacedButton onClick={() => this.setState({current: 0})}>
                  Previous
                </SpacedButton>
                <SpacedButton onClick={() => this.setState({current: 2})}>
                  Next
                </SpacedButton>
              </div>
            </Step>
            <Step title="Add Payment Method" isActive>
              <div>Here is some step content</div>
              <div>
                <SpacedButton onClick={() => this.setState({current: 1})}>
                  Previous
                </SpacedButton>
                <SpacedButton disabled>Next</SpacedButton>
              </div>
            </Step>
          </ProgressSteps>
        );
      }
    }

    return <DefaultExampleComponent />;
  },
};
