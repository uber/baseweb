import React from 'react';
import {Radio, RadioGroup} from 'baseui/radio';

export default class Stateless extends React.Component {
  state = {value: null};
  render() {
    return (
      <RadioGroup
        name="radio group"
        onChange={e => this.setState({value: e.target.value})}
        value={this.state.value}
      >
        <Radio value="1">First</Radio>
        <Radio value="2">Second</Radio>
        <Radio value="3">Third</Radio>
      </RadioGroup>
    );
  }
}
