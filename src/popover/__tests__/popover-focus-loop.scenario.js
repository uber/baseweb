/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {StatefulPopover} from '../index.js';

// addresses https://github.com/uber/baseweb/issues/2685
// infinite loop between focusing the content and the anchor element
// on anchor hover, content focuses if it contains a tabbable element this is why the scenario includes tabIndex prop
// on anchor click, the popover closes because of onClickOutside rules
// anchor click focuses it, thus opening the popover and focusing popover content
// content focus causes the anchor to blur, which causes the popover to close
// because of how the focus lock was configured it refocused the anchor which restarts the loop

// 11/01/21 - To address https://github.com/uber/baseweb/issues/4557, the anchor is updated to not allow a blur
// event (popover to close) if focusLock or autoFocus are true since they immediately take focus away from the
// anchor element.
export function Scenario() {
  return (
    <StatefulPopover
      focusLock
      triggerType="hover"
      content={() => (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        <div data-e2e="content" tabIndex={0}>
          hello
        </div>
      )}
    >
      <button>hover</button>
    </StatefulPopover>
  );
}
