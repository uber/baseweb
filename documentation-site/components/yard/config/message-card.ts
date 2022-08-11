/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { MessageCard, BACKGROUND_COLOR_TYPE, IMAGE_LAYOUT, BUTTON_KIND } from 'baseui/message-card';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

const MessageCardConfig: TConfig = {
  componentName: 'MessageCard',
  imports: {
    'baseui/message-card': {
      named: ['MessageCard'],
    },
  },
  scope: {
    MessageCard,
    BACKGROUND_COLOR_TYPE,
    IMAGE_LAYOUT,
    BUTTON_KIND,
  },
  theme: [],
  props: {
    heading: {
      value: 'Heading',
      type: PropTypes.ReactNode,
      description: 'Heading to be displayed in MessageCard. Optional.',
    },
    buttonLabel: {
      value: '"Call to Action"',
      type: PropTypes.ReactNode,
      description: 'Button label. Optional (if omitted, the entire Button will be omitted).',
    },
    onClick: {
      value: '() => alert("click")',
      type: PropTypes.Function,
      description: `Function called when message card is clicked.`,
    },
    buttonKind: {
      value: undefined,
      defaultValue: undefined,
      options: BUTTON_KIND,
      enumName: 'BUTTON_KIND',
      type: PropTypes.Enum,
      description: 'Defines the kind of a button.',
      imports: {
        'baseui/message-card': {
          named: ['BUTTON_KIND'],
        },
      },
    },
    paragraph: {
      value:
        '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"',
      type: PropTypes.ReactNode,
      description: 'Paragraph to be displayed in MessageCard. Optional',
    },
    image: {
      value:
        '{src: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80"}',
      defaultValue: undefined,
      type: PropTypes.Object,
      description:
        'Provide the `src`, `layout` and `backgroundPosition` of the image. Optional (if `src` is omitted, image image will be omitted).',
    },
    backgroundColor: {
      value: undefined,
      type: PropTypes.String,
      description: 'Background color of MessageCard. Use any Base Web primitive color token.',
    },
    backgroundColorType: {
      value: undefined,
      defaultValue: undefined,
      options: BACKGROUND_COLOR_TYPE,
      enumName: 'BACKGROUND_COLOR_TYPE',
      hidden: true,
      type: PropTypes.Enum,
      description:
        "If you provide an unexpected `backgroundColor` (one which is not among Base Web's primitive color tokens), use `backgroundColorType` to indicate whether the provided `backgroundColor` is light or dark.",
      imports: {
        'baseui/message-card': {
          named: ['BACKGROUND_COLOR_TYPE'],
        },
      },
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Root',
          'ContentContainer',
          'HeadingContainer',
          'ParagraphContainer',
          'Button',
          'Image',
        ],
        sharedProps: {},
      },
    },
  },
};

export default MessageCardConfig;
