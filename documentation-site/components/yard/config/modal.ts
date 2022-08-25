/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton, SIZE, ROLE } from 'baseui/modal';
import { KIND as ButtonKind } from 'baseui/button';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

const ModalConfig: TConfig = {
  componentName: 'Modal',
  imports: {
    'baseui/modal': {
      named: ['Modal', 'ModalHeader', 'ModalBody', 'ModalFooter', 'ModalButton'],
    },
    'baseui/button': {
      named: ['KIND as ButtonKind'],
    },
  },
  scope: {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalButton,
    SIZE,
    ROLE,
    ButtonKind,
  },
  theme: [],
  props: {
    children: {
      value: `<ModalHeader>Hello world</ModalHeader>
<ModalBody>
  Proin ut dui sed metus pharetra hend rerit vel non mi.
  Nulla ornare faucibus ex, non facilisis nisl. Maecenas
  aliquet mauris ut tempus.
</ModalBody>
<ModalFooter>
  <ModalButton kind={ButtonKind.tertiary}>Cancel</ModalButton>
  <ModalButton>Okay</ModalButton>
</ModalFooter>
`,
      type: PropTypes.ReactNode,
      description: 'Modal content.',
    },
    onClose: {
      value: '() => setIsOpen(false);',
      type: PropTypes.Function,
      description: 'A callback that is invoked when the modal will close.',
      propHook: {
        what: 'false',
        into: 'isOpen',
      },
    },
    closeable: {
      value: true,
      type: PropTypes.Boolean,
      description: 'Whether the modal should be closeable by the user.',
    },
    isOpen: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Toggles the modal visibility.',
      stateful: true,
    },
    animate: {
      value: true,
      type: PropTypes.Boolean,
      description: 'Sets whether the Modal should be displayed by easing in and out.',
      hidden: true,
    },
    autoFocus: {
      value: true,
      type: PropTypes.Boolean,
      description: 'If true, focus will shift to the first interactive element within the modal.',
      hidden: true,
    },
    focusLock: {
      defaultValue: true,
      value: true,
      type: PropTypes.Boolean,
      description: 'If true, focus will be locked to the modal contents.',
      hidden: true,
    },
    returnFocus: {
      defaultValue: true,
      value: true,
      type: PropTypes.Boolean,
      description:
        'If true, focus will be returned to the previous position while unmounting. Can also provide focus options as value to this prop.',
      hidden: true,
    },
    size: {
      value: 'SIZE.default',
      options: SIZE,
      type: PropTypes.Enum,
      description: 'Defines the modal size.',
      imports: {
        'baseui/modal': {
          named: ['SIZE'],
        },
      },
    },
    role: {
      value: 'ROLE.dialog',
      options: ROLE,
      type: PropTypes.Enum,
      description: 'Defines the modal role.',
      imports: {
        'baseui/modal': {
          named: ['ROLE'],
        },
      },
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'Dialog', 'DialogContainer', 'Close'],
        sharedProps: {
          $animate: 'animate',
          $isVisible: {
            type: PropTypes.Boolean,
            description: 'True if the modal is visible.',
          },
          $isOpen: {
            type: PropTypes.Boolean,
            description: 'True if the modal is open.',
          },
          $size: 'size',
          $role: 'role',
          $closeable: 'closeable',
        },
      },
    },
  },
};

export default ModalConfig;
