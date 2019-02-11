import React from 'react';
import {Slider} from 'baseui/slider';

export default class Basic extends React.Component {
  state = {value: [25, 75]};

  render() {
    return (
      <Slider
        value={this.state.value}
        onChange={({value}) => this.setState({value})}
      />
    );
  }
}
