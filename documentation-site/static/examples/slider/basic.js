import React from 'react';
import {Slider} from 'baseui/slider';

export default class Basic extends React.Component {
  state = {values: [60]};
  render() {
    return (
      <Slider
        values={this.state.values}
        onChange={({values}) => this.setState({values})}
      />
    );
  }
}
