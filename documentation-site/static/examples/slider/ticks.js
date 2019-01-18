import React from 'react';
import {Slider} from 'baseui/slider';

export default class Basic extends React.Component {
  state = {value: [40]};

  render() {
    return (
      <Slider
        value={this.state.value}
        range={[0, 20, 40, 60, 80, 100]}
        onChange={({value}) => this.setState({value})}
      />
    );
  }
}
