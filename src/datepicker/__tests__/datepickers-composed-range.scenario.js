/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Block} from '../../block/index.js';
import {FormControl} from '../../form-control/index.js';
import ArrowRight from '../../icon/arrow-right.js';
import {Datepicker, TimePicker, formatDate} from '../index.js';

export const name = 'datepickers-composed-range';

const START_DATE = new Date(2019, 3, 1);
const END_DATE = new Date(2019, 3, 10);
const START_TIME = new Date(START_DATE);
START_TIME.setHours(12, 0, 0);
const END_TIME = new Date(START_DATE);
END_TIME.setHours(16, 0, 0);

function formatDateAtIndex(dates: ?Date | ?Array<Date>, index: number) {
  if (!dates || !Array.isArray(dates)) return '';
  const date = dates[index];
  if (!date) return '';
  return formatDate(date, 'YYYY/MM/dd');
}

// eslint-disable-next-line flowtype/no-weak-types
class Controlled extends React.Component<any, any> {
  state = {
    date: [START_DATE, END_DATE],
    startTime: START_TIME,
    endTime: END_TIME,
  };

  render() {
    return (
      <>
        <Block display="flex" alignItems="center">
          <Block width="120px" marginRight="scale300">
            <FormControl label="Start Date" caption="YYYY/MM/DD">
              <Datepicker
                value={this.state.date}
                time={this.state.startTime}
                onChange={({date}) => this.setState({date})}
                onTimeChange={({time}) => this.setState({startTime: time})}
                formatDisplayValue={date => formatDateAtIndex(date, 0)}
                timeSelect
                range
              />
            </FormControl>
          </Block>

          <Block width="120px" marginRight="scale300">
            <FormControl label="Start Time" caption="HH:MM">
              <TimePicker
                value={this.state.startTime}
                onChange={startTime => this.setState({startTime})}
              />
            </FormControl>
          </Block>

          <Block marginRight="scale300">
            <ArrowRight />
          </Block>

          <Block width="120px" marginRight="scale300">
            <FormControl label="End Date" caption="YYYY/MM/DD">
              <Datepicker
                value={this.state.date}
                time={this.state.endTime}
                onChange={({date}) => this.setState({date})}
                onTimeChange={({time}) => this.setState({endTime: time})}
                overrides={{
                  TimeSelectFormControl: {props: {label: 'End time'}},
                }}
                formatDisplayValue={date => formatDateAtIndex(date, 1)}
                timeSelect
                range
              />
            </FormControl>
          </Block>

          <Block width="120px">
            <FormControl label="End Time" caption="HH:MM">
              <TimePicker
                value={this.state.endTime}
                onChange={endTime => this.setState({endTime})}
              />
            </FormControl>
          </Block>
        </Block>

        <button
          onClick={() =>
            this.setState({date: [null, null], time: [null, null]})
          }
        >
          set null
        </button>
        <button onClick={() => this.setState({date: []})}>set undefined</button>
      </>
    );
  }
}

export const component = () => <Controlled />;
