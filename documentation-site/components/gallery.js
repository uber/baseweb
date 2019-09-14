/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {H4} from 'baseui/typography';
import {useStyletron} from 'baseui/styles';

import * as thumbnails from '../components/thumbs';

const COMPONENTS = {
  Inputs: [
    {
      label: 'Button',
      href: '/components/button',
      Component: thumbnails.SvgButton,
    },
    {
      label: 'Button Group',
      href: '/components/button-group',
      Component: thumbnails.SvgButtonGroup,
    },
    {
      label: 'Input',
      href: '/components/input',
      Component: thumbnails.SvgInput,
    },
    {
      label: 'Checkbox',
      href: '/components/checkbox',
      Component: thumbnails.SvgCheckbox,
    },
    {
      label: 'Radio',
      href: '/components/radio',
      Component: thumbnails.SvgRadio,
    },
    {
      label: 'Textarea',
      href: '/components/textarea',
      Component: thumbnails.SvgTextarea,
    },
    {
      label: 'Form Control',
      href: '/components/form-control',
      Component: thumbnails.SvgFormControl,
    },
    {
      label: 'Payment Card',
      href: '/components/payment-card',
      Component: thumbnails.SvgPaymentCard,
    },
    {
      label: 'Pin Code',
      href: '/components/pin-code',
      Component: thumbnails.SvgPinCode,
    },
    {
      label: 'Phone Input',
      href: '/components/phone-input',
      Component: thumbnails.SvgPhoneInput,
    },
    {
      label: 'Slider',
      href: '/components/slider',
      Component: thumbnails.SvgSlider,
    },
  ],
  Pickers: [
    {
      label: 'Datepicker',
      href: '/components/datepicker',
      Component: thumbnails.SvgDatepicker,
    },
    {
      label: 'File Uploader',
      href: '/components/file-uploader',
      Component: thumbnails.SvgFileUploader,
    },
    {
      label: 'Menu',
      href: '/components/menu',
      Component: thumbnails.SvgMenu,
    },
    {
      label: 'Rating',
      href: '/components/rating',
      Component: thumbnails.SvgRating,
    },
    {
      label: 'Select',
      href: '/components/select',
      Component: thumbnails.SvgSelect,
    },
  ],
  Navigation: [
    {
      label: 'Breadcrumbs',
      href: '/components/breadcrumbs',
      Component: thumbnails.SvgBreadcrumbs,
    },
    {
      label: 'Header Navigation',
      href: '/components/header-navigation',
      Component: thumbnails.SvgHeaderNavigation,
    },
    {
      label: 'Link',
      href: '/components/link',
      Component: thumbnails.SvgLink,
    },
    {
      label: 'Pagination',
      href: '/components/pagination',
      Component: thumbnails.SvgPagination,
    },
    {
      label: 'Side Navigation',
      href: '/components/side-navigation',
      Component: thumbnails.SvgSideNavigation,
    },
    {
      label: 'Tabs',
      href: '/components/tabs',
      Component: thumbnails.SvgTabs,
    },
  ],
  Content: [
    {
      label: 'Accordian',
      href: '/components/accordian',
      Component: thumbnails.SvgAccordian,
    },
    {
      label: 'Avatar',
      href: '/components/avatar',
      Component: thumbnails.SvgAvatar,
    },
    {
      label: 'Drag and Drop List',
      href: '/components/dnd-list',
      Component: thumbnails.SvgDndList,
    },
    {
      label: 'Heading',
      href: '/components/heading',
      Component: thumbnails.SvgHeading,
    },
    {
      label: 'Icon',
      href: '/components/icon',
      Component: thumbnails.SvgIcon,
    },
    {
      label: 'Table',
      href: '/components/table',
      Component: thumbnails.SvgTable,
    },
    {
      label: 'Table Grid',
      href: '/components/table-grid',
      Component: thumbnails.SvgTableGrid,
    },
    {
      label: 'Data Table',
      href: '/components/data-table',
      Component: thumbnails.SvgDataTable,
    },
    {
      label: 'Tag',
      href: '/components/tag',
      Component: thumbnails.SvgTag,
    },
    {
      label: 'Typography',
      href: '/components/typography',
      Component: thumbnails.SvgTypography,
    },
  ],
  Feedback: [
    {
      label: 'Notification',
      href: '/components/notification',
      Component: thumbnails.SvgNotification,
    },
    {
      label: 'Progress Bar',
      href: '/components/progress-bar',
      Component: thumbnails.SvgProgressBar,
    },
    {
      label: 'Spinner',
      href: '/components/spinner',
      Component: thumbnails.SvgSpinner,
    },
    {
      label: 'Toast',
      href: '/components/toast',
      Component: thumbnails.SvgToast,
    },
  ],
  Surfaces: [
    {
      label: 'card',
      href: '/components/card',
      Component: thumbnails.SvgCard,
    },
    {
      label: 'Drawer',
      href: '/components/drawer',
      Component: thumbnails.SvgDrawer,
    },
    {
      label: 'Modal',
      href: '/components/modal',
      Component: thumbnails.SvgModal,
    },
    {
      label: 'Pop-Over',
      href: '/components/popover',
      Component: thumbnails.SvgPopover,
    },
    {
      label: 'Tool-Tip',
      href: '/components/tooltip',
      Component: thumbnails.SvgTooltip,
    },
  ],
  Utility: [
    {
      label: 'Aspect Ratio Box',
      href: '/components/aspect-ratio-box',
      Component: thumbnails.SvgAspectRatioBox,
    },
    {
      label: 'Flex Grid',
      href: '/components/flex-grid',
      Component: thumbnails.SvgFlexGrid,
    },
    {
      label: 'Layer',
      href: '/components/layer',
      Component: thumbnails.SvgLayer,
    },
    {
      label: 'A11y Validator',
      href: '/components/unstable-a11y',
      Component: thumbnails.SvgUnstableA11y,
    },
    {
      label: 'Tokens',
      href: '/components/tokens',
      Component: thumbnails.SvgTokens,
    },
    {
      label: 'Block',
      href: '/components/block',
      Component: thumbnails.SvgBlock,
    },
  ],
};

function Thumbnail({children, label, href, scale = 1}) {
  const [css, theme] = useStyletron();
  return (
    <a
      href={href}
      className={css({
        display: 'flex',
        flexDirection: 'column',
        border: `solid 1px ${theme.colors.borderAlt}`,
        marginRight: theme.sizing.scale800,
        marginBottom: theme.sizing.scale800,
        textDecoration: 'none',
        transitionProperty: 'all',
        transitionDuration: theme.animation.timing100,
        transitionTimingFunction: theme.animation.easeInOutCurve,
        ':hover': {
          border: `solid 1px ${theme.colors.borderFocus}`,
        },
      })}
    >
      <div
        className={css({
          fontFamily:
            'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
          fontSize: '12px',
          color: `${theme.colors.foregroundAlt}`,
          paddingTop: '8px',
          paddingLeft: '12px',
          paddingRight: '0',
          paddingBottom: '8px',
          borderBottom: `solid 1px ${theme.colors.borderAlt}`,
        })}
      >
        {'baseui/' + href.split('/')[2]}
      </div>
      <div
        className={css({
          paddingTop: '12px',
          paddingLeft: '12px',
          paddingRight: '12px',
          paddingBottom: '12px',
        })}
      >
        {children}
      </div>
    </a>
  );
}

function Section({nature}) {
  const [css, theme] = useStyletron();
  const colors =
    theme.name === 'light-theme'
      ? [theme.colors.mono200, theme.colors.mono400, theme.colors.mono600]
      : [theme.colors.mono700, theme.colors.mono500, theme.colors.mono300];
  return (
    <React.Fragment>
      <H4>{nature}</H4>
      <div
        className={css({
          display: 'flex',
          flexWrap: 'wrap',
        })}
      >
        {COMPONENTS[nature].map(({Component, ...props}) => {
          return (
            <Thumbnail key={props.label} {...props}>
              <Component colors={colors} />
            </Thumbnail>
          );
        })}
      </div>
    </React.Fragment>
  );
}

function Gallery() {
  return (
    <React.Fragment>
      {Object.keys(COMPONENTS).map(nature => (
        <Section key={nature} nature={nature} />
      ))}
    </React.Fragment>
  );
}

export default Gallery;
