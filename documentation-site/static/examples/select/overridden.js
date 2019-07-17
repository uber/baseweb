// @flow
import * as React from 'react';
import {Select} from 'baseui/select';
import type {ValueT} from 'baseui/select';

export default class Container extends React.Component<
  {},
  {value: ValueT},
> {
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
        overrides={{
          StatefulMenu: {
            props: {
              stateReducer: (type, next, prev) => {
                // eslint-disable-next-line no-console
                console.log(type, prev, next);
                return next;
              },
            },
          },
        }}
      />
    );
  }
}
