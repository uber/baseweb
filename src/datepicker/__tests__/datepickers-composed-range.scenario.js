/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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

const START_DATE = new Date(2019, 3, 1, 12, 0, 0);
const END_DATE = new Date(2019, 3, 10, 16, 0, 0);

function formatDateAtIndex(dates: ?Date | ?Array<Date>, index: number) {
  if (!dates || !Array.isArray(dates)) return '';
  const date = dates[index];
  if (!date) return '';
  return formatDate(date, 'yyyy/MM/dd');
}

// eslint-disable-next-line flowtype/no-weak-types
class Controlled extends React.Component<any, any> {
  state = {date: [START_DATE, END_DATE]};

  render() {
    return (
      <>
        <Block display="flex" alignItems="center">
          <Block width="120px" marginRight="scale300">
            <FormControl label="Start Date" caption="YYYY/MM/DD">
              <Datepicker
                value={this.state.date}
                onChange={({date}) => this.setState({date})}
                formatDisplayValue={date => formatDateAtIndex(date, 0)}
                timeSelectStart
                range
              />
            </FormControl>
          </Block>

          <Block width="120px" marginRight="scale300">
            <FormControl label="Start Time" caption="HH:MM">
              <TimePicker
                value={this.state.date[0]}
                onChange={time => {
                  this.setState({date: [time, this.state.date[1]]});
                }}
              />
            </FormControl>
          </Block>

          <Block marginRight="scale300">
            <ArrowRight size={24} />
          </Block>

          <Block width="120px" marginRight="scale300">
            <FormControl label="End Date" caption="YYYY/MM/DD">
              <Datepicker
                value={this.state.date}
                onChange={({date}) => this.setState({date})}
                formatDisplayValue={date => formatDateAtIndex(date, 1)}
                overrides={{
                  TimeSelectFormControl: {props: {label: 'End time'}},
                }}
                timeSelectEnd
                range
              />
            </FormControl>
          </Block>

          <Block width="120px">
            <FormControl label="End Time" caption="HH:MM">
              <TimePicker
                value={this.state.date[1]}
                onChange={time => {
                  this.setState({date: [this.state.date[0], time]});
                }}
              />
            </FormControl>
          </Block>
        </Block>

        <button
          onClick={() =>
            this.setState({date: [null, null], startTime: null, endTime: null})
          }
        >
          set null
        </button>
        <button
          onClick={() =>
            this.setState({date: [], startTime: undefined, endTime: undefined})
          }
        >
          set undefined
        </button>
      </>
    );
  }
}

export const component = () => <Controlled />;
