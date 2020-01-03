/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button, KIND as BUTTON_KIND, SIZE} from '../../button/index.js';
import {Toast, KIND} from '../index.js';

export const name = 'toast';

export const component = () => (
  <React.Fragment>
    <Toast>Default info notification</Toast>
    <Toast>
      {({dismiss}) => {
        return (
          <div>
            Info notification with no close button and children as a function.
            <div>
              <Button
                onClick={dismiss}
                kind={BUTTON_KIND.secondary}
                size={SIZE.compact}
              >
                Click to dismiss
              </Button>
            </div>
          </div>
        );
      }}
    </Toast>
    <Toast kind={KIND.positive}>Positive notification</Toast>
    <Toast kind={KIND.warning}>Warning notification</Toast>
    <Toast kind={KIND.negative}>Negative notification</Toast>
  </React.Fragment>
);
