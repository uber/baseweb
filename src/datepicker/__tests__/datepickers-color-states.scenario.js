/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Block} from '../../block/index.js';
import {Label2} from '../../typography/index.js';
import {Datepicker, TimePicker, TimezonePicker} from '../index.js';

const DATE = new Date('2019-07-03T12:00:00Z');
export const name = 'datepickers-color-states';
export const component = () => (
  <Block display="flex" height="300px">
    <Block
      marginRight="scale700"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Label2>Datepicker</Label2>
      <Datepicker value={DATE} />
      <Datepicker value={DATE} disabled />
      <Datepicker value={DATE} positive />
      <Datepicker value={DATE} error />
    </Block>
    <Block
      width="120px"
      marginRight="scale700"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Label2>TimePicker</Label2>
      <TimePicker value={DATE} />
      <TimePicker value={DATE} disabled />
      <TimePicker value={DATE} positive />
      <TimePicker value={DATE} error />
    </Block>
    <Block
      width="340px"
      marginRight="scale700"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Label2>TimezonePicker</Label2>
      <TimezonePicker />
      <TimezonePicker disabled />
      <TimezonePicker positive />
      <TimezonePicker error />
    </Block>
  </Block>
);
