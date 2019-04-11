/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Block} from '../../block/index.js';
import {FormControl} from '../../form-control/index.js';
import {TimezonePicker} from '../index.js';

export const name = 'timezone-picker';

class Controlled extends React.Component<any, any> {
  state = {value: [{id: 'Europe/Berlin'}]};

  render() {
    return (
      <FormControl label="controlled">
        <TimezonePicker
          value={this.state.value}
          onChange={({value}) => this.setState({value})}
        />
      </FormControl>
    );
  }
}

export const component = () => (
  <Block width="400px">
    <FormControl label="daylight savings time">
      <TimezonePicker date={new Date(2019, 3, 1)} onChange={console.log} />
    </FormControl>
    <FormControl label="standard time">
      <TimezonePicker date={new Date(2019, 2, 1)} />
    </FormControl>

    <Controlled />
  </Block>
);
