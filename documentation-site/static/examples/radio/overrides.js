import React from 'react';
import {Block} from 'baseui/block';
import {StyledRadio, RadioGroup} from 'baseui/radio';

export default class Stateless extends React.Component {
  state = {value: null};
  render() {
    return (
      <RadioGroup
        name="radio group"
        onChange={e => this.setState({value: e.target.value})}
        value={this.state.value}
        overrides={{
          Label: ({$value}) => (
            <Block font="font400">Custom label for value: {$value}</Block>
          ),
          RadioMark: {
            style: ({$theme}) => ({borderColor: $theme.colors.positive}),
          },
        }}
      >
        <StyledRadio value="1">First</StyledRadio>
        <StyledRadio value="2">Second</StyledRadio>
        <StyledRadio value="3">Third</StyledRadio>
      </RadioGroup>
    );
  }
}
