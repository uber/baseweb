/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import React from 'react';
import {Notification, KIND} from './';
import examples from './examples-list';

export default {
  [examples.DEFAULT]: function Story1() {
    return <Notification>This is a primary notification</Notification>;
  },
  [examples.SUCCESS]: function Story2() {
    return (
      <Notification kind={KIND.success}>
        This is a success notification
      </Notification>
    );
  },
  [examples.WARNING]: function Story3() {
    return (
      <Notification kind={KIND.warning}>
        This is a warning notification
      </Notification>
    );
  },
  [examples.ERROR]: function Story4() {
    return (
      <Notification kind={KIND.error}>
        This is an error notification
      </Notification>
    );
  },
  [examples.OVERRIDES]: function Story5() {
    return (
      <Notification
        overrides={{
          Root: {
            style: {backgroundColor: 'pink', color: 'black'},
          },
        }}
      >
        This is a custom notification
      </Notification>
    );
  },
};
