import pick from 'just-pick';
import {Notification, KIND} from 'baseui/notification';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';
import {changeHandlers} from './common';

const notificationProps = require('!!extract-react-types-loader!../../../../src/notification/notification.js');

const NotificationConfig: TConfig = {
  imports: {
    'baseui/notification': {
      named: ['Notification'],
    },
  },
  scope: {
    Notification,
    KIND,
  },
  theme: [
    'notificationInfoBackground',
    'notificationPositiveBackground',
    'notificationWarningBackground',
    'notificationNegativeBackground',
    'notificationInfoText',
    'notificationPositiveText',
    'notificationWarningText',
    'notificationNegativeText',
  ],
  props: {
    kind: {
      value: 'KIND.info',
      defaultValue: 'KIND.info',
      options: KIND,
      type: PropTypes.Enum,
      description: 'Defines the type of notification.',
      imports: {
        'baseui/notification': {
          named: ['KIND'],
        },
      },
    },
    closeable: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        'When set to true a close button is displayed and the notification can be dismissed by a user.',
    },
    children: {
      value: '{() => "This is a notification."}',
      type: PropTypes.Function,
      description: `Toast notification content. The children-as-function
        receives a dismiss method that can be called to
        dismiss the notification and can be used as a
        handler for an action inside the toast content.
        React.ChildrenArray type is also accepted.`,
      placeholder: '({dismiss}) => {}',
    },
    ...pick(changeHandlers, ['onBlur', 'onFocus']),
    onClose: {
      value: undefined,
      type: PropTypes.Function,
      description: `A callback function called when a notification is dismissed.`,
      placeholder: '() => {}',
    },
    autoHideDuration: {
      value: undefined,
      type: PropTypes.Number,
      description: `The number of milliseconds to wait before automatically dismissing a
        notification. This behavior is disabled when the value is set to 0.`,
      placeholder: '10000',
    },
    ...pick(changeHandlers, ['onMouseEnter', 'onMouseLeave']),
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Body', 'CloseIcon', 'InnerContainer'],
        sharedProps: {
          $kind: 'kind',
          $closeable: 'closeable',
        },
      },
    },
  },
  mapTokensToProps: {
    Notification: notificationProps,
  },
};

export default NotificationConfig;
