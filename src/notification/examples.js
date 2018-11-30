/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {styled} from '../styles';
import {Notification, KIND} from './index';

import examples from './examples-list';

export const suite = 'Notification Test Suite';

const Centered = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  lineHeight: 1.5,
});

export default {
  [examples.NOTIFICATION_EXAMPLE]: function Story1() {
    return (
      <Centered>
        <Notification>Default info notification</Notification>
        <Notification kind={KIND.positive}>Positive notification</Notification>
        <Notification kind={KIND.warning}>Warning notification</Notification>
        <Notification kind={KIND.negative}>Negative notification</Notification>
      </Centered>
    );
  },
};
