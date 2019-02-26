/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */

const routes = [
  {
    text: 'Getting started',
    children: [
      {
        text: 'Installation',
        path: '/getting-started/installation',
      },
      {
        text: 'Usage',
        path: '/getting-started/usage',
      },
      {
        text: 'Learn',
        path: '/getting-started/learn',
      },
      {
        text: 'Versioning policy',
        path: '/getting-started/versioning-policy',
      },
      {
        text: 'Supported platforms',
        path: '/getting-started/supported-platforms',
      },
      {
        text: 'Comparison with other component libraries',
        path: '/getting-started/comparison',
      },
    ],
  },
  {
    text: 'Theming',
    children: [
      {
        text: 'Intro to Theming',
        path: '/theming/custom-themes',
      },
      {
        text: 'Theming values',
        path: '/theming/theming-values',
      },
      {
        text: 'Understanding Overrides',
        path: '/theming/understanding-overrides',
      },
    ],
  },
  {
    components: true,
    text: 'Components',
    children: [
      {
        text: 'Basic Inputs',
        children: [
          {
            text: 'Button',
            path: '/components/button',
          },
          {
            text: 'ButtonGroup',
            path: '/components/button-group',
          },
          {
            text: 'Checkbox',
            path: '/components/checkbox',
          },
          {
            text: 'Input',
            path: '/components/input',
          },
          {
            text: 'Slider',
            path: '/components/slider',
          },
          {
            text: 'Radio',
            path: '/components/radio',
          },
          {
            text: 'Textarea',
            path: '/components/textarea',
          },
          {
            text: 'FormControl',
            path: '/components/form-control',
          },
        ],
      },
      {
        text: 'Navigation',
        children: [
          {
            text: 'Breadcrumbs',
            path: '/components/breadcrumbs',
          },
          {
            text: 'Header navigation',
            path: '/components/header-navigation',
          },
          {
            text: 'Link',
            path: '/components/link',
          },
          {
            text: 'Pagination',
            path: '/components/pagination',
          },
          {
            text: 'Tab',
            path: '/components/tabs',
          },
        ],
      },
      {
        text: 'Content',
        children: [
          {
            text: 'Accordion',
            path: '/components/accordion',
          },
          {
            text: 'Avatar',
            path: '/components/avatar',
          },
          {
            text: 'Drag and Drop List',
            path: '/components/dnd-list',
          },
          {
            text: 'Icon',
            path: '/components/icon',
          },
          {
            text: 'Tag',
            path: '/components/tag',
          },
          {
            text: 'Typography',
            path: '/components/typography',
          },
          {
            text: 'Table',
            path: '/components/table',
          },
        ],
      },
      {
        text: 'Pickers',
        children: [
          {
            text: 'File Uploader',
            path: '/components/file-uploader',
          },
          {
            text: 'Menu',
            path: '/components/menu',
          },
          {
            text: 'Rating',
            path: '/components/rating',
          },
          {
            text: 'Select',
            path: '/components/select',
          },
          {
            text: 'Datepicker',
            path: '/components/datepicker',
          },
        ],
      },
      {
        text: 'Progress & Validation',
        children: [
          {
            text: 'Notification',
            path: '/components/notification',
          },
          {
            text: 'ProgressBar',
            path: '/components/progress-bar',
          },
          {
            text: 'Progress steps',
            path: '/components/progress-steps',
          },
          {
            text: 'Spinner',
            path: '/components/spinner',
          },
          {
            text: 'Toast',
            path: '/components/toast',
          },
        ],
      },
      {
        text: 'Surfaces',
        children: [
          {
            text: 'Card',
            path: '/components/card',
          },
          {
            text: 'Modal',
            path: '/components/modal',
          },
          {
            text: 'Popover',
            path: '/components/popover',
          },
          {
            text: 'Tooltip',
            path: '/components/tooltip',
          },
        ],
      },
      {
        text: 'Utility',
        children: [
          {
            text: 'Block',
            path: '/components/block',
          },
          {
            text: 'Styled',
            path: '/components/styled',
          },
        ],
      },
    ],
  },
];

export default routes;
