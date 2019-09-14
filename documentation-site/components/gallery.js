/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {H4} from 'baseui/typography';
import {useStyletron} from 'baseui/styles';

// Inputs
import SvgButton from '../components/thumbs/components/Button.js';
import SvgButtonGroup from '../components/thumbs/components/ButtonGroup.js';
import SvgCheckbox from '../components/thumbs/components/Checkbox.js';
import SvgFormControl from '../components/thumbs/components/FormControl.js';
import SvgInput from '../components/thumbs/components/Input.js';
import SvgPaymentCard from '../components/thumbs/components/PaymentCard.js';
import SvgPhoneInput from '../components/thumbs/components/PhoneInput.js';
import SvgPinCode from '../components/thumbs/components/PinCode.js';
import SvgRadio from '../components/thumbs/components/Radio.js';
import SvgSlider from '../components/thumbs/components/Slider.js';
import SvgTextarea from '../components/thumbs/components/Textarea.js';

// Pickers
import SvgDatepicker from '../components/thumbs/components/Datepicker.js';
import SvgFileUploader from '../components/thumbs/components/FileUploader.js';
import SvgMenu from '../components/thumbs/components/Menu.js';
import SvgRating from '../components/thumbs/components/Rating.js';
import SvgSelect from '../components/thumbs/components/Select.js';

// Navigation
import SvgBreadcrumbs from '../components/thumbs/components/Breadcrumbs.js';
import SvgHeaderNavigation from '../components/thumbs/components/HeaderNavigation.js';
import SvgLink from '../components/thumbs/components/Link.js';
import SvgPagination from '../components/thumbs/components/Pagination.js';
import SvgSideNavigation from '../components/thumbs/components/SideNavigation.js';
import SvgTabs from '../components/thumbs/components/Tabs.js';

// Content
import SvgAccordian from '../components/thumbs/components/Accordian.js';
import SvgAvatar from '../components/thumbs/components/Avatar.js';
import SvgDndList from '../components/thumbs/components/DndList.js';
import SvgHeading from '../components/thumbs/components/Heading.js';
import SvgIcon from '../components/thumbs/components/Icon.js';
import SvgTable from '../components/thumbs/components/Table.js';
import SvgTableGrid from '../components/thumbs/components/TableGrid.js';
import SvgDataTable from '../components/thumbs/components/DataTable.js';
import SvgTag from '../components/thumbs/components/Tag.js';
import SvgTypography from '../components/thumbs/components/Typography.js';

// Feedback
import SvgNotification from '../components/thumbs/components/Notification.js';
import SvgProgressBar from '../components/thumbs/components/ProgressBar.js';
import SvgSpinner from '../components/thumbs/components/Spinner.js';
import SvgToast from '../components/thumbs/components/Toast.js';

// Surfaces
import SvgCard from '../components/thumbs/components/Card.js';
import SvgDrawer from '../components/thumbs/components/Drawer.js';
import SvgModal from '../components/thumbs/components/Modal.js';
import SvgPopover from '../components/thumbs/components/Popover.js';
import SvgTooltip from '../components/thumbs/components/Tooltip.js';

// Utility
import SvgAspectRatioBox from '../components/thumbs/components/AspectRatioBox.js';
import SvgFlexGrid from '../components/thumbs/components/FlexGrid.js';
import SvgLayer from '../components/thumbs/components/Layer.js';
import SvgUnstableA11y from '../components/thumbs/components/UnstableA11y.js';
import SvgTokens from '../components/thumbs/components/Tokens.js';
import SvgBlock from '../components/thumbs/components/Block.js';

const COMPONENTS = {
  Inputs: [
    {
      label: 'Button',
      href: '/components/button',
      Component: SvgButton,
    },
    {
      label: 'Button Group',
      href: '/components/button-group',
      Component: SvgButtonGroup,
    },
    {
      label: 'Input',
      href: '/components/input',
      Component: SvgInput,
    },
    {
      label: 'Checkbox',
      href: '/components/checkbox',
      Component: SvgCheckbox,
    },
    {
      label: 'Radio',
      href: '/components/radio',
      Component: SvgRadio,
    },
    {
      label: 'Textarea',
      href: '/components/textarea',
      Component: SvgTextarea,
    },
    {
      label: 'Form Control',
      href: '/components/form-control',
      Component: SvgFormControl,
    },
    {
      label: 'Payment Card',
      href: '/components/payment-card',
      Component: SvgPaymentCard,
    },
    {
      label: 'Pin Code',
      href: '/components/pin-code',
      Component: SvgPinCode,
    },
    {
      label: 'Phone Input',
      href: '/components/phone-input',
      Component: SvgPhoneInput,
    },
    {
      label: 'Slider',
      href: '/components/slider',
      Component: SvgSlider,
    },
  ],
  Pickers: [
    {
      label: 'Datepicker',
      href: '/components/datepicker',
      Component: SvgDatepicker,
    },
    {
      label: 'File Uploader',
      href: '/components/file-uploader',
      Component: SvgFileUploader,
    },
    {
      label: 'Menu',
      href: '/components/menu',
      Component: SvgMenu,
    },
    {
      label: 'Rating',
      href: '/components/rating',
      Component: SvgRating,
    },
    {
      label: 'Select',
      href: '/components/select',
      Component: SvgSelect,
    },
  ],
  Navigation: [
    {
      label: 'Breadcrumbs',
      href: '/components/breadcrumbs',
      Component: SvgBreadcrumbs,
    },
    {
      label: 'Header Navigation',
      href: '/components/header-navigation',
      Component: SvgHeaderNavigation,
    },
    {
      label: 'Link',
      href: '/components/link',
      Component: SvgLink,
    },
    {
      label: 'Pagination',
      href: '/components/pagination',
      Component: SvgPagination,
    },
    {
      label: 'Side Navigation',
      href: '/components/side-navigation',
      Component: SvgSideNavigation,
    },
    {
      label: 'Tabs',
      href: '/components/tabs',
      Component: SvgTabs,
    },
  ],
  Content: [
    {
      label: 'Accordian',
      href: '/components/accordian',
      Component: SvgAccordian,
    },
    {
      label: 'Avatar',
      href: '/components/avatar',
      Component: SvgAvatar,
    },
    {
      label: 'Drag and Drop List',
      href: '/components/dnd-list',
      Component: SvgDndList,
    },
    {
      label: 'Heading',
      href: '/components/heading',
      Component: SvgHeading,
    },
    {
      label: 'Icon',
      href: '/components/icon',
      Component: SvgIcon,
    },
    {
      label: 'Table',
      href: '/components/table',
      Component: SvgTable,
    },
    {
      label: 'Table Grid',
      href: '/components/table-grid',
      Component: SvgTableGrid,
    },
    {
      label: 'Data Table',
      href: '/components/data-table',
      Component: SvgDataTable,
    },
    {
      label: 'Tag',
      href: '/components/tag',
      Component: SvgTag,
    },
    {
      label: 'Typography',
      href: '/components/typography',
      Component: SvgTypography,
    },
  ],
  Feedback: [
    {
      label: 'Notification',
      href: '/components/notification',
      Component: SvgNotification,
    },
    {
      label: 'Progress Bar',
      href: '/components/progress-bar',
      Component: SvgProgressBar,
    },
    {
      label: 'Spinner',
      href: '/components/spinner',
      Component: SvgSpinner,
    },
    {
      label: 'Toast',
      href: '/components/toast',
      Component: SvgToast,
    },
  ],
  Surfaces: [
    {
      label: 'card',
      href: '/components/card',
      Component: SvgCard,
    },
    {
      label: 'Drawer',
      href: '/components/drawer',
      Component: SvgDrawer,
    },
    {
      label: 'Modal',
      href: '/components/modal',
      Component: SvgModal,
    },
    {
      label: 'Pop-Over',
      href: '/components/popover',
      Component: SvgPopover,
    },
    {
      label: 'Tool-Tip',
      href: '/components/tooltip',
      Component: SvgTooltip,
    },
  ],
  Utility: [
    {
      label: 'Aspect Ratio Box',
      href: '/components/aspect-ratio-box',
      Component: SvgAspectRatioBox,
    },
    {
      label: 'Flex Grid',
      href: '/components/flex-grid',
      Component: SvgFlexGrid,
    },
    {
      label: 'Layer',
      href: '/components/layer',
      Component: SvgLayer,
    },
    {
      label: 'A11y Validator',
      href: '/components/unstable-a11y',
      Component: SvgUnstableA11y,
    },
    {
      label: 'Tokens',
      href: '/components/tokens',
      Component: SvgTokens,
    },
    {
      label: 'Block',
      href: '/components/block',
      Component: SvgBlock,
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
  const [css] = useStyletron();
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
              <Component />
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
