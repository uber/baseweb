/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {H4} from 'baseui/typography';
import {useStyletron} from 'baseui/styles';

import SvgButton from '../components/thumbs/button.js';
import SvgButtonGroup from '../components/thumbs/button-group.js';
import SvgCheckbox from '../components/thumbs/checkbox.js';
import SvgFormControl from '../components/thumbs/form-control.js';
import SvgInput from '../components/thumbs/input.js';
import SvgPaymentCard from '../components/thumbs/payment-card.js';
import SvgPhoneInput from '../components/thumbs/phone-input.js';
import SvgPinCode from '../components/thumbs/pin-code.js';
import SvgRadio from '../components/thumbs/radio.js';
import SvgSlider from '../components/thumbs/slider.js';
import SvgTextarea from '../components/thumbs/textarea.js';

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
};

function Thumbnail({children, label, href, scale = 1}) {
  const [css, theme] = useStyletron();
  return (
    <a
      href={href}
      className={css({
        display: 'flex',
        flexDirection: 'column',
        border: 'solid 2px transparent',
        textDecoration: 'none',
        ':hover': {
          border: 'solid 2px #000',
        },
      })}
    >
      <div
        className={css({
          fontFamily: 'Menlo',
          fontSize: '12px',
          color: `${theme.colors.foregroundAlt}`,
          paddingTop: '8px',
          paddingLeft: '12px',
          paddingRight: '12px',
          paddingBottom: '8px',
          background: '#f6f6f6',
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
