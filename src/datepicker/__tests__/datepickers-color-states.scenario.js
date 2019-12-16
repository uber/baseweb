/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {Label2} from '../../typography/index.js';
import {FlexGrid} from '../../flex-grid/index.js';
import {Datepicker, TimePicker, TimezonePicker} from '../index.js';

const DATE = new Date('2019-07-03T12:00:00Z');
export const name = 'datepickers-color-states';
export const component = () => (
  <FlexGrid flexDirection="row" height="300px">
    <FlexGrid
      marginRight="scale700"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Label2>Datepicker</Label2>
      <Datepicker value={DATE} />
      <Datepicker value={DATE} disabled />
      <Datepicker value={DATE} positive />
      <Datepicker value={DATE} error />
    </FlexGrid>
    <FlexGrid
      width="120px"
      marginRight="scale700"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Label2>TimePicker</Label2>
      <TimePicker value={DATE} />
      <TimePicker value={DATE} disabled />
      <TimePicker value={DATE} positive />
      <TimePicker value={DATE} error />
    </FlexGrid>
    <FlexGrid
      width="340px"
      marginRight="scale700"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Label2>TimezonePicker</Label2>
      <TimezonePicker />
      <TimezonePicker disabled />
      <TimezonePicker positive />
      <TimezonePicker error />
    </FlexGrid>
  </FlexGrid>
);
