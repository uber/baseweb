/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-env node */

const routes = [
  {
    title: 'Getting started',
    subNav: [
      {
        title: 'Home',
        itemId: '/',
        isGitHubEditDisabled: true,
      },
      {
        title: 'Setup',
        itemId: '/getting-started/setup',
      },
      {
        title: 'Learn Base Web',
        itemId: '/getting-started/learn',
      },
    ],
  },
  {
    title: 'Guides',
    subNav: [
      {
        title: 'Internationalization',
        itemId: '/guides/internationalization',
      },
      {
        title: 'Bidirectionality',
        itemId: '/guides/bidirectionality',
      },
      {
        title: 'Theming',
        itemId: '/guides/theming',
      },
      {
        title: 'Styling',
        itemId: '/guides/styling',
      },
      {
        title: 'Overrides',
        itemId: '/guides/understanding-overrides',
      },
      {
        title: 'Colors',
        itemId: '/guides/colors',
      },
      {
        title: 'API Cheat Sheet',
        itemId: '/cheat-sheet',
      },
    ],
  },
  {
    components: true,
    title: 'Components',
    itemId: '/components',
    subNav: [
      {
        title: 'Inputs',
        subNav: [
          {
            title: 'Button',
            itemId: '/components/button',
          },
          {
            title: 'Button Dock',
            itemId: '/components/button-dock',
          },
          {
            title: 'Button Group',
            itemId: '/components/button-group',
          },
          {
            title: 'Button Timed',
            itemId: '/components/button-timed',
          },
          {
            title: 'Checkbox',
            itemId: '/components/checkbox',
          },
          {
            title: 'Combobox',
            itemId: '/components/combobox',
          },
          {
            title: 'Form Control',
            itemId: '/components/form-control',
          },
          {
            title: 'Input',
            itemId: '/components/input',
          },
          {
            title: 'Payment Card',
            itemId: '/components/payment-card',
          },
          {
            title: 'Phone Input',
            itemId: '/components/phone-input',
          },
          {
            title: 'Pin Code',
            itemId: '/components/pin-code',
          },
          {
            title: 'Segmented Control',
            itemId: '/components/segmented-control',
          },
          {
            title: 'Radio',
            itemId: '/components/radio',
          },
          {
            title: 'Slider',
            itemId: '/components/slider',
          },
          {
            title: 'Stepper',
            itemId: '/components/stepper',
          },
          {
            title: 'Textarea',
            itemId: '/components/textarea',
          },
        ],
      },
      {
        title: 'Pickers',
        subNav: [
          {
            title: 'File Uploader',
            itemId: '/components/file-uploader',
          },
          {
            title: 'File Uploader Basic',
            itemId: '/components/file-uploader-basic',
          },
          {
            title: 'Menu',
            itemId: '/components/menu',
          },
          {
            title: 'Rating',
            itemId: '/components/rating',
          },
          {
            title: 'Select',
            itemId: '/components/select',
          },
        ],
      },
      {
        title: 'Date & Time',
        subNav: [
          {
            title: 'Datepicker',
            itemId: '/components/datepicker',
          },
          {
            title: 'Time Picker',
            itemId: '/components/time-picker',
          },
          {
            title: 'Timezone Picker',
            itemId: '/components/timezone-picker',
          },
        ],
      },
      {
        title: 'Navigation',
        subNav: [
          {
            title: 'Bottom Navigation',
            itemId: '/components/bottom-navigation',
          },
          {
            title: 'Breadcrumbs',
            itemId: '/components/breadcrumbs',
          },
          {
            title: 'Navigation Bar',
            itemId: '/components/app-nav-bar',
          },
          {
            title: 'Header Navigation',
            itemId: '/components/header-navigation',
          },
          {
            title: 'Link',
            itemId: '/components/link',
          },
          {
            title: 'Mobile Header',
            itemId: '/components/mobile-header',
          },
          {
            title: 'Page Control',
            itemId: '/components/page-control',
          },
          {
            title: 'Pagination',
            itemId: '/components/pagination',
          },
          {
            title: 'Side Navigation',
            itemId: '/components/side-nav',
          },
          {
            title: 'Tabs',
            itemId: '/components/tabs',
          },
          {
            title: 'Tabs (Motion)',
            itemId: '/components/tabs-motion',
          },
        ],
      },
      {
        title: 'Content',
        subNav: [
          {
            title: 'Accordion',
            itemId: '/components/accordion',
          },
          {
            title: 'Avatar',
            itemId: '/components/avatar',
          },
          {
            title: 'Badge',
            itemId: '/components/badge',
          },
          {
            title: 'Badge - NotificationCircle',
            itemId: '/components/notification-circle',
          },
          {
            title: 'Badge - HintDot',
            itemId: '/components/hint-dot',
          },
          {
            title: 'Drag and Drop List',
            itemId: '/components/dnd-list',
          },
          {
            title: 'Layout Grid',
            itemId: '/components/layout-grid',
          },
          {
            title: 'Heading',
            itemId: '/components/heading',
          },
          {
            title: 'Icon',
            itemId: '/components/icon',
          },
          {
            title: 'List',
            itemId: '/components/list',
          },
          {
            title: 'Message Card',
            itemId: '/components/message-card',
          },
          {
            title: 'Tag',
            itemId: '/components/tag',
          },
          {
            title: 'Tile',
            itemId: '/components/tile',
          },
          {
            title: 'Tree View',
            itemId: '/components/tree-view',
          },
          {
            title: 'Typography',
            itemId: '/components/typography',
          },
        ],
      },
      {
        title: 'Tables',
        subNav: [
          {
            title: 'Table',
            itemId: '/components/table-semantic',
          },
          {
            title: 'Data Table',
            itemId: '/components/data-table',
          },
          {
            title: 'Grid Table',
            itemId: '/components/table-grid',
          },
          {
            title: 'Flex Table',
            itemId: '/components/table',
          },
        ],
      },
      {
        title: 'Progress & Validation',
        subNav: [
          {
            title: 'Banner',
            itemId: '/components/banner',
          },
          {
            title: 'System Banner',
            itemId: '/components/system-banner',
          },
          {
            title: 'Empty State',
            itemId: '/components/empty-state',
          },
          {
            title: 'Notification',
            itemId: '/components/notification',
          },
          {
            title: 'Progress Bar',
            itemId: '/components/progress-bar',
          },
          {
            title: 'Progress Steps',
            itemId: '/components/progress-steps',
          },
          {
            title: 'Skeleton',
            itemId: '/components/skeleton',
          },
          {
            title: 'Snackbar',
            itemId: '/components/snackbar',
          },
          {
            title: 'Spinner',
            itemId: '/components/spinner',
          },
          {
            title: 'Toast',
            itemId: '/components/toast',
          },
        ],
      },
      {
        title: 'Surfaces',
        subNav: [
          {
            title: 'Card',
            itemId: '/components/card',
          },
          {
            title: 'Dialog',
            itemId: '/components/dialog',
          },
          {
            title: 'Drawer',
            itemId: '/components/drawer',
          },
          {
            title: 'Modal',
            itemId: '/components/modal',
          },
          {
            title: 'Popover',
            itemId: '/components/popover',
          },
          {
            title: 'Tooltip',
            itemId: '/components/tooltip',
          },
        ],
      },
      {
        title: 'Map marker',
        subNav: [
          {
            title: 'Fixed Marker',
            itemId: '/components/fixed-marker',
          },
          {
            title: 'Floating Marker',
            itemId: '/components/floating-marker',
          },
          {
            title: 'Floating Route Marker',
            itemId: '/components/floating-route-marker',
          },
          {
            title: 'Location Puck',
            itemId: '/components/location-puck',
          },
        ],
      },
      {
        title: 'Utility',
        subNav: [
          {
            title: 'AspectRatioBox',
            itemId: '/components/aspect-ratio-box',
          },
          {
            title: 'BaseProvider',
            itemId: '/components/base-provider',
          },
          {
            title: 'Block',
            itemId: '/components/block',
          },
          {
            title: 'Divider',
            itemId: '/components/divider',
          },
          {
            title: 'FlexGrid',
            itemId: '/components/flex-grid',
          },
          {
            title: 'Layer',
            itemId: '/components/layer',
          },
          {
            title: 'UseStyletron',
            itemId: '/components/use-styletron',
          },
          {
            title: 'Styled',
            itemId: '/components/styled',
          },
          {
            title: 'Tokens',
            itemId: '/components/tokens',
          },
          {
            title: 'A11y Validator',
            itemId: '/components/unstable-a11y',
          },
        ],
      },
    ],
  },
  {
    title: 'Discover more',
    subNav: [
      {
        title: 'Versioning policy',
        itemId: '/discover-more/versioning-policy',
      },
      {
        title: 'Supported platforms',
        itemId: '/discover-more/supported-platforms',
      },
      {
        title: 'Comparison',
        itemId: '/discover-more/comparison',
      },
      {
        title: 'SEO',
        itemId: '/guides/seo',
      },
    ],
  },
  {
    title: 'Blog',
    itemId: '/blog',
    isGitHubEditDisabled: true,
  },
];

export default routes;
