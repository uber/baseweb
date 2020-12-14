import * as React from 'react';
import {Button, SIZE} from 'baseui/button';
import {Notification} from 'baseui/notification';

export default function Example() {
  return (
    <Notification>
      {({dismiss}) => (
        <Button onClick={dismiss} size={SIZE.compact}>
          Dismiss
        </Button>
      )}
    </Notification>
  );
}
