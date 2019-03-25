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
        <Radio
          value="2"
          description="This is a radio description, it gives a little more in-yo-face context about what this is."
        >
          Second
        </Radio>
        <Radio value="3">Third</Radio>
      </RadioGroup>
    );
  }
}
