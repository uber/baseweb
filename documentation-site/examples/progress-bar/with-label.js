// @flow
import * as React from 'react';
import {ProgressBar} from 'baseui/progress-bar';

const SUCCESS_VALUE = 100;

export default class Basic extends React.Component<
  {},
  {value: number},
> {
  state = {value: 0};
  timerId: IntervalID;

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      if (this.state.value < SUCCESS_VALUE) {
        this.setState({value: this.state.value + 10});
      } else {
        this.setState({value: 0});
      }
    }, 1500);
  }

  render() {
    return (
      <ProgressBar
        value={this.state.value}
        successValue={SUCCESS_VALUE}
        showLabel
      />
    );
  }
}
