/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  Unstable_Calendar as Datepicker,
  Unstable_StatefulCalendar as StatefulDatepicker,
} from './index.js';
import {StatefulPopover} from '../popover/index.js';
// import {Input} from '../input/index.js';
import {Button} from '../button/index.js';
import tests from './examples-list.js';

export const suite = 'Component Test Suite';

export default {
  [tests.SIMPLE_EXAMPLE]: function Story1() {
    return <Datepicker />;
  },
  [tests.STATEFUL_EXAMPLE]: function Story2() {
    return <StatefulDatepicker />;
  },
  [tests.STATEFUL_IN_POPOVER]: function Story2() {
    return (
      <StatefulPopover triggerType={'click'} content={<StatefulDatepicker />}>
        <Button>Click Me</Button>
      </StatefulPopover>
    );
  },
};
