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
