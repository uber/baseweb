import * as React from 'react';
import {ProgressBar} from 'baseui/progress-bar';

const SUCCESS_VALUE = 400;

export default class Basic extends React.Component {
  state = {value: 0};

  componentDidMount() {
    setInterval(() => {
      if (this.state.value < SUCCESS_VALUE) {
        this.setState({value: this.state.value + 10});
      } else {
        this.setState({value: 0});
      }
    }, 1000);
  }

  render() {
    return (
      <ProgressBar
        value={this.state.value}
        successValue={SUCCESS_VALUE}
      />
    );
  }
}
