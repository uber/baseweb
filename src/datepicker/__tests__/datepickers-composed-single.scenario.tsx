/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';

import { Block } from '../../block/index';
import { FormControl } from '../../form-control/index';
import { Datepicker, TimePicker, TimezonePicker } from '../index';

const DATE = new Date(2019, 3, 1);

// flowlint-next-line unclear-type:off
export class Scenario extends React.Component<any, any> {
  state = {
    date: DATE,
    zone: null,
  };

  render() {
    return (
      <Block display="flex">
        <Block width="120px" marginRight="scale300">
          <FormControl label="Date" caption="YYYY/MM/DD">
            <Datepicker
              value={this.state.date}
              onChange={({ date }) => this.setState({ date })}
              timeSelectStart
            />
          </FormControl>
        </Block>

        <Block width="120px" marginRight="scale300">
          <FormControl label="Time" caption="HH:MM">
            <TimePicker value={this.state.date} onChange={(date) => this.setState({ date })} />
          </FormControl>
        </Block>

        <Block width="340px">
          <FormControl label="Timezone">
            <TimezonePicker
              date={this.state.date}
              value={this.state.zone && this.state.zone.id}
              onChange={(zone) => this.setState({ zone })}
            />
          </FormControl>
        </Block>
      </Block>
    );
  }
}
