import React from 'react';
import {Slider} from 'baseui/slider';

export default class Basic extends React.Component {
  state = {values: [40]};
  render() {
    return (
      <Slider
        disabled
        values={this.state.values}
        onChange={({values}) => this.setState({values})}
      />
    );
  }
}
