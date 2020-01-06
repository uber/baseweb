/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Notification, KIND} from '../index.js';

export const name = 'notification';

export const component = () => (
  <React.Fragment>
    <Notification>Default info notification</Notification>
    <Notification>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua
    </Notification>
    <Notification kind={KIND.positive}>Positive notification</Notification>
    <Notification kind={KIND.warning}>Warning notification</Notification>
    <Notification kind={KIND.negative}>Negative notification</Notification>
  </React.Fragment>
);
