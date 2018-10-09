/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {styled} from '../styles';
import {ProgressBar} from './index';

export const suite = 'ProgressBar Test Suite';
export const tests = {
  SIMPLE_EXAMPLE: 'ProgressBar component',
  STYLE_PROPS_OVERRIDES: 'ProgressBar style and props overrides',
  CUSTOM_SUCCESS_VALUE: 'ProgressBar with custom success value of 2000',
  SIMPLE_EXAMPLE_WITH_HIDDEN_LABEL: 'ProgressBar with hidden label',
};
let updateProgress;

class ProgressBarContainer extends React.Component<
  {
    value: number,
    successValue: number,
    showLabel: boolean,
    overrides?: *,
    getProgressLabel?: *,
  },
  {value: number},
> {
  static defaultProps = {
    value: 0,
    successValue: 100,
    showLabel: true,
    overrides: {},
  };
  state = {value: this.props.value};
  componentDidMount() {
    updateProgress = setInterval(() => {
      const newValue =
        this.state.value < this.props.successValue
          ? (this.state.value +
              Math.round(
                (Math.random() * 10 * this.props.successValue) / 100,
              )) %
            this.props.successValue
          : 0;
      this.setState({value: newValue});
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(updateProgress);
  }
  render() {
    const {getProgressLabel, showLabel} = this.props;
    const extraProps = getProgressLabel ? {getProgressLabel} : {};
    return (
      <Centered>
        <ProgressBar
          showLabel={showLabel}
          overrides={this.props.overrides}
          value={this.state.value}
          successValue={this.props.successValue}
          {...extraProps}
        />
      </Centered>
    );
  }
}

const Centered = styled('div', {
  display: 'flex',
  alignItems: 'center',
  height: '90vh',
});

export default {
  [tests.SIMPLE_EXAMPLE]: function Story1() {
    return <ProgressBarContainer />;
  },
  [tests.CUSTOM_SUCCESS_VALUE]: function Story2() {
    return (
      <ProgressBarContainer
        successValue={2000}
        getProgressLabel={(value, successValue) =>
          `${value} out of ${successValue} loaded`
        }
      />
    );
  },
  [tests.SIMPLE_EXAMPLE_WITH_HIDDEN_LABEL]: function Story3() {
    return <ProgressBarContainer showLabel={false} />;
  },
  [tests.STYLE_PROPS_OVERRIDES]: function Story4() {
    return (
      <ProgressBarContainer
        getProgressLabel={(value, successValue) =>
          `${Math.round((value / successValue) * 100)}% Loaded Successfully`
        }
        overrides={{
          BarProgress: {
            style: ({$theme, $value}) => {
              return {
                backgroundColor: 'red',
                position: 'relative',
                ':after': {
                  position: 'absolute',
                  content: `"${$value}%"`,
                  right: '0px',
                },
              };
            },
          },
          Bar: {
            style: ({$theme, $value}) => {
              return {
                height: '20px',
              };
            },
          },
        }}
      />
    );
  },
};
