/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Block} from '../../block/index.js';
import {FormControl} from '../../form-control/index.js';
import {StatefulDatepicker, TimePicker, TimezonePicker} from '../index.js';

export const name = 'datepickers-composed-single';

const DATE = new Date(2019, 3, 1);
const TIME = new Date(DATE);
TIME.setHours(12, 0, 0);

// eslint-disable-next-line flowtype/no-weak-types
class Controlled extends React.Component<any, any> {
  state = {
    date: DATE,
    time: TIME,
    zone: null,
  };

  render() {
    return (
      <>
        <Block display="flex">
          <Block width="120px" marginRight="scale300">
            <FormControl label="Date" caption="YYYY/MM/DD">
              <StatefulDatepicker
                initialState={{value: this.state.date, time: this.state.time}}
                onChange={({date}) => this.setState({date})}
                onTimeChange={({time}) => this.setState({time})}
                timeSelect
              />
            </FormControl>
          </Block>

          <Block width="120px" marginRight="scale300">
            <FormControl label="Time" caption="HH:MM">
              <TimePicker
                value={this.state.time}
                onChange={time => this.setState({time})}
              />
            </FormControl>
          </Block>

          <Block width="340px">
            <FormControl label="Timezone">
              <TimezonePicker
                date={this.state.date}
                value={this.state.zone && this.state.zone.id}
                onChange={zone => this.setState({zone})}
              />
            </FormControl>
          </Block>
        </Block>
      </>
    );
  }
}

export const component = () => <Controlled />;
