import * as React from 'react';
import {StatefulPopover} from '../index.js';

// addresses https://github.com/uber/baseweb/issues/2685
// infinite loop between focusing the content and the anchor element
// on anchor hover, content focuses if it contains a tabbable element this is why the scenario includes tabIndex prop
// on anchor click, the popover closes because of onClickOutside rules
// anchor click focuses it, thus opening the popover and focusing popover content
// content focus causes the anchor to blur, which causes the popover to close
// because of how the focus lock was configured it refocused the anchor which restarts the loop
export default () => {
  return (
    <StatefulPopover
      triggerType="hover"
      content={() => (
        <div data-e2e="content" tabIndex={1}>
          hello
        </div>
      )}
    >
      <button>click</button>
    </StatefulPopover>
  );
};
