import * as React from 'react';
import {Slider} from 'baseui/slider';

export default class Basic extends React.Component {
  state = {value: [90]};

  render() {
    return (
      <Slider
        value={this.state.value}
        min={-300}
        max={300}
        step={10}
        onChange={({value}) => this.setState({value})}
      />
    );
  }
}
