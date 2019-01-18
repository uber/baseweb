import React from 'react';
import {Slider} from 'baseui/slider';

export default class Basic extends React.Component {
  state = {value: [4]};

  render() {
    return (
      <Slider
        value={this.state.value}
        range={[0, 10]}
        step={2}
        onChange={({value}) => this.setState({value})}
      />
    );
  }
}
