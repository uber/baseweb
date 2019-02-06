import React from 'react';
import {StyledRadio, RadioGroup} from 'baseui/radio';

export default class Stateless extends React.Component {
  state = {value: null};
  render() {
    return (
      <RadioGroup
        align="horizontal"
        name="radio group"
        onChange={e => this.setState({value: e.target.value})}
        value={this.state.value}
      >
        <StyledRadio value="1">First</StyledRadio>
        <StyledRadio value="2">Second</StyledRadio>
        <StyledRadio value="3">Third</StyledRadio>
      </RadioGroup>
    );
  }
}
