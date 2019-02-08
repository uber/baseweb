import React from 'react';
import {Slider} from 'baseui/slider';

export default class Basic extends React.Component {
  state = {values: [90]};

  render() {
    return (
      <Slider
        values={this.state.values}
        min={-300}
        max={300}
        step={10}
        onChange={({values}) => this.setState({values})}
      />
    );
  }
}
