import * as React from 'react';
import {Button, SIZE} from 'spaceweb/button';
import {Notification} from 'spaceweb/notification';

export default () => (
  <Notification>
    {({dismiss}) => (
      <Button onClick={dismiss} size={SIZE.compact}>
        Dismiss
      </Button>
    )}
  </Notification>
);
