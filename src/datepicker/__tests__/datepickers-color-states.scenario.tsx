/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Block } from '../../block/index';
import { LabelMedium } from '../../typography/index';
import { Datepicker, TimePicker, TimezonePicker } from '../index';

const DATE = new Date('2019-07-03T12:00:00Z');

export function Scenario() {
  return (
    <Block display="flex" height="300px">
      <Block
        marginRight="scale700"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <LabelMedium>Datepicker</LabelMedium>
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
        <LabelMedium>TimePicker</LabelMedium>
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
        <LabelMedium>TimezonePicker</LabelMedium>
        <TimezonePicker />
        <TimezonePicker disabled />
        <TimezonePicker positive />
        <TimezonePicker error />
      </Block>
    </Block>
  );
}
