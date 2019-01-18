import React from 'react';
import {Slider} from 'baseui/slider';

export default class Basic extends React.Component {
  state = {value: [25, 60]};

  render() {
    return (
      <Slider
        value={this.state.value}
        range={[0, 100]}
        onChange={({value}) => this.setState({value})}
      />
    );
  }
}
