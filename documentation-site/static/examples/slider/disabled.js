// @flow
import * as React from 'react';
import {Slider} from 'baseui/slider';

export default class Basic extends React.Component<
  {},
  {value: number[]},
> {
  state = {value: [40]};
  render() {
    return (
      <Slider
        disabled
        value={this.state.value}
        onChange={({value}) => this.setState({value})}
      />
    );
  }
}
