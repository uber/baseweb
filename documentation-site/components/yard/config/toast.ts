import pick from 'just-pick';
import {Toast, KIND, PLACEMENT} from 'baseui/toast';
import {PropTypes} from '../const';
import {changeHandlers} from './common';
import {TConfig} from '../types';

const toastConfig: TConfig = {
  imports: {
    'baseui/dnd-list': {
      named: ['Toast'],
    },
  },
  scope: {Toast, KIND, PLACEMENT},
  theme: [],
  props: {
    closeable: {
      value: true,
      defaultValue: true,
      type: PropTypes.Boolean,
      description: `When set to true a close button is displayed 
        and the notification can be dismissed by a user.`,
    },
    children: {
      value: '{({dismiss}) => "This is a toast notification."}',
      type: PropTypes.Function,
      description: `Toast notification content. The children-as-function
        receives a dismiss method that can be called to
        dismiss the notification and can be used as a
        handler for an action inside the toast content.`,
    },
    autoHideDuration: {
      value: '0',
      defaultValue: '0',
      type: PropTypes.Number,
      description: `The number of milliseconds to wait before automatically dismissing a
        notification. This behavior is disabled when the value is set to 0.`,
    },
    ...pick(changeHandlers, ['onBlur', 'onFocus']),
    kind: {
      value: 'KIND.info',
      defaultValue: 'KIND.info',
      options: KIND,
      type: PropTypes.Enum,
      description: 'Defines the type of notification.',
      imports: {
        'baseui/toast': {
          named: ['KIND'],
        },
      },
    },
    onClose: {
      value: undefined,
      placeholder: '() => {}',
      type: PropTypes.Function,
      description:
        'A callback function called when a notification is dismissed.',
    },
    ...pick(changeHandlers, ['onMouseEnter', 'onMouseLeave']),
    overrides: {
      value: undefined,
      type: PropTypes.Overrides,
      description: 'Lets you customize all aspects of the component.',
      names: ['Root', 'Body', 'CloseIconSvg'],
      sharedProps: {
        $kind: 'kind',
        $closeable: 'closeable',
      },
    },
  },
};

export default toastConfig;
