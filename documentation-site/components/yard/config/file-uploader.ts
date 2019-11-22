import {FileUploader} from 'baseui/file-uploader';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const fileUploaderProps = require('!!extract-react-types-loader!../../../../src/file-uploader/file-uploader.js');

const changeHandlers = [
  'onClick',
  'onFocus',
  'onBlur',
  'onKeyDown',
  'onDragStart',
  'onDragEnter',
  'onDragOver',
  'onDragLeave',
  'onDrop',
  'onDropAccepted',
  'onDropRejected',
  'onFileDialogCancel',
  'onCancel',
  'onRetry',
];

const FileUploaderConfig: TConfig = {
  imports: {
    'baseui/file-uploader': {named: ['FileUploader']},
  },
  scope: {
    FileUploader,
  },
  theme: [],
  props: {
    accept: {
      value: '',
      type: PropTypes.String,
      description:
        'Set accepted file types. See https://github.com/okonet/attr-accept for more information',
    },
    maxSize: {
      value: undefined,
      type: PropTypes.Number,
      description: 'Maximum file size (in bytes).',
    },
    minSize: {
      value: undefined,
      type: PropTypes.Number,
      description: 'Minimum file size (in bytes).',
    },
    multiple: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        'Allow drag n drop (or selection from the file dialog) of multiple files',
    },
    disableClick: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        'Disallow clicking on the dropzone container to open file dialog.',
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Renders component in disabled state.',
    },
    errorMessage: {
      value: '',
      type: PropTypes.String,
      description: 'Error message to be displayed.',
      stateful: true,
    },
    ...changeHandlers.reduce((acc, current) => {
      //@ts-ignore
      acc[current] = {
        value: undefined,
        type: PropTypes.Function,
        description: `Called when the ${current} even is triggered.`,
        hidden: true,
      };
      return acc;
    }, {}),
    name: {
      value: undefined,
      type: PropTypes.String,
      description: 'Name attribute.',
      hidden: true,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Root',
          'ContentMessage',
          'ErrorMessage',
          'FileDragAndDrop',
          'HiddenInput',
        ],
        sharedProps: {},
      },
    },
  },
  mapTokensToProps: {
    FileUploader: fileUploaderProps,
  },
};

export default FileUploaderConfig;
