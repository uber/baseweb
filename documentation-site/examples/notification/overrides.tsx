import * as React from 'react';
import {Notification} from 'spaceweb/notification';
import {DeleteAlt} from 'spaceweb/icon';

export default () => (
  <Notification
    overrides={{
      Body: {
        style: ({$theme}) => ({
          ...$theme.borders.border600,
        }),
      },
      CloseIcon: {
        component: DeleteAlt as React.FC<any>,
        style: {float: 'right', cursor: 'pointer'},
      },
    }}
    closeable
  >
    Notification with overrides
  </Notification>
);
