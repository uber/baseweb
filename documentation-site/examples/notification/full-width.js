// @flow
import * as React from 'react';
import {Notification} from 'baseui/notification';

export default function Example() {
  return (
    <Notification
      overrides={{
        Body: {style: {width: 'auto'}},
      }}
    >
      Default info notification
    </Notification>
  );
}
