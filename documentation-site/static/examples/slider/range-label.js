import React from 'react';
import {Slider} from 'baseui/slider';

export default class Basic extends React.Component {
  state = {value: [50]};

  render() {
    return (
      <Slider
        value={this.state.value}
        range={[
          {value: 0, label: 'Bad'},
          {value: 50, label: 'Better'},
          {value: 100, label: 'Best'},
        ]}
        onChange={({value}) => this.setState({value})}
      />
    );
  }
}
