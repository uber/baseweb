import React from 'react';
import {Block} from 'baseui/block';
import {Button} from 'baseui/button';
import {StatefulPopover} from 'baseui/popover';

export default () => (
  <StatefulPopover
    dismissOnEsc={false}
    dismissOnClickOutside={false}
    accessibilityType={'tooltip'}
    content={({close}) => (
      <Block padding="scale500" maxWidth="300px">
        <Block paddingBottom="scale400">
          content render prop is passed a <code>close()</code> callback so it
          you can manually trigger popover close from within
        </Block>
        <Button onClick={close}>Dismiss</Button>
      </Block>
    )}
  >
    <Button>Click Me</Button>
  </StatefulPopover>
);
