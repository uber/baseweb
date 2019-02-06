/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';
import Screener, {Steps} from 'screener-storybook/src/screener.js';

import {ProgressSteps, Step, NumberedStep} from './index.js';
import examples from './examples-list.js';
import {Button} from '../button/index.js';
import {Block} from '../block/index.js';
import {styled} from '../styles/index.js';
import type {ThemeT} from '../styles/types.js';

const SpacedButton = styled(Button, ({$theme}: {$theme: ThemeT}) => ({
  marginLeft: $theme.sizing.scale200,
  marginRight: $theme.sizing.scale200,
  marginTop: $theme.sizing.scale200,
}));

type DefaultExampleComponentPropsT = {
  isNumber: boolean,
  isOverridden: boolean,
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
    isOverridden: false,
  };

  state = {
    current: 0,
  };

  render() {
    const {isNumber, isOverridden} = this.props;
    const GenericStep = isNumber ? NumberedStep : Step;

    const overrideProps = isOverridden
      ? {
          overrides: {
            Icon: {
              style: {backgroundColor: 'red'},
            },
            InnerIcon: {
              style: {backgroundColor: 'red'},
            },
            Tail: {
              style: {
                ':after': {
                  content: '""',
                  display: 'inline-block',
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'red',
                },
              },
            },
          },
        }
      : {};

    return (
      <ProgressSteps current={this.state.current}>
        <GenericStep title="Create Account" {...overrideProps}>
          <Block font="font400">
            <div data-e2e="content-1">Here is some step content</div>
            <div>
              <SpacedButton disabled>Previous</SpacedButton>
              <SpacedButton
                data-e2e="button-next"
                onClick={() => this.setState({current: 1})}
              >
                Next
              </SpacedButton>
            </div>
          </Block>
        </GenericStep>
        <GenericStep title="Verify Payment" {...overrideProps}>
          <Block font="font400">
            <div data-e2e="content-2">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit...
            </div>
            <div>
              <SpacedButton
                data-e2e="button-previous"
                onClick={() => this.setState({current: 0})}
              >
                Previous
              </SpacedButton>
              <SpacedButton onClick={() => this.setState({current: 2})}>
                Next
              </SpacedButton>
            </div>
          </Block>
        </GenericStep>
        <GenericStep title="Add Payment Method" {...overrideProps}>
          <Block font="font400">
            <div data-e2e="content-3">Here is some step content</div>
            <div>
              <SpacedButton onClick={() => this.setState({current: 1})}>
                Previous
              </SpacedButton>
              <SpacedButton disabled>Next</SpacedButton>
            </div>
          </Block>
        </GenericStep>
      </ProgressSteps>
    );
  }
}

export default {
  [examples.DEFAULT]: function Story1() {
    const selector = 'button:enabled';

    return (
      <Screener
        steps={new Steps()
          .wait(selector)
          .click(selector)
          .snapshot('progress step next step triggered')
          .end()}
      >
        <DefaultExampleComponent />
      </Screener>
    );
  },
  [examples.NUMBERED]: function Story2() {
    return <DefaultExampleComponent isNumber />;
  },
  [examples.OVERRIDES]: function Story3() {
    return <DefaultExampleComponent isOverridden />;
  },
};
