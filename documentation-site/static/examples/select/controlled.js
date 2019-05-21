import * as React from 'react';
import {Select} from 'baseui/select';

export default class Container extends React.Component {
  state = {value: []};
  render() {
    return (
      <Select
        options={[
          {id: 'AliceBlue', color: '#F0F8FF'},
          {id: 'AntiqueWhite', color: '#FAEBD7'},
          {id: 'Aqua', color: '#00FFFF'},
          {id: 'Aquamarine', color: '#7FFFD4'},
          {id: 'Azure', color: '#F0FFFF'},
          {id: 'Beige', color: '#F5F5DC'},
        ]}
        labelKey="id"
        valueKey="color"
        onChange={({value}) => this.setState({value})}
        value={this.state.value}
      />
    );
  }
}
