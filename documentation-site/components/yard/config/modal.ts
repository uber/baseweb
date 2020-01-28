import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from 'baseui/modal';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const modalProps = require('!!extract-react-types-loader!../../../../src/modal/modal.js');

const ModalConfig: TConfig = {
  imports: {
    'baseui/modal': {
      named: [
        'Modal',
        'ModalHeader',
        'ModalBody',
        'ModalFooter',
        'ModalButton',
      ],
    },
  },
  scope: {Modal, ModalHeader, ModalBody, ModalFooter, ModalButton, SIZE, ROLE},
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
  <ModalButton>Cancel</ModalButton>
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
      description:
        'Sets whether the Modal should be displayed by easing in and out.',
      hidden: true,
    },
    autoFocus: {
      value: true,
      type: PropTypes.Boolean,
      description:
        'If true, focus will shift to the first interactive element within the modal.',
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
    unstable_ModalBackdropScroll: {
      value: false,
      type: PropTypes.Boolean,
      description: `Makes modal scrollable while cursor is over the modal's backdrop.
        Will be removed and implemented as the default behavior in the next major version.`,
      hidden: true,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'Backdrop', 'Dialog', 'DialogContainer', 'Close'],
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
  mapTokensToProps: {
    Modal: modalProps,
  },
};

export default ModalConfig;
