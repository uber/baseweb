/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {H4} from 'baseui/typography';
import {useStyletron} from 'baseui/styles';

import {Button} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';
import {Checkbox} from 'baseui/checkbox';
import {RadioGroup, Radio} from 'baseui/radio';
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {PaymentCard} from 'baseui/payment-card';
import {PinCode} from 'baseui/pin-code';
import {PhoneInput} from 'baseui/phone-input';
import {Slider} from 'baseui/slider';
import {Textarea} from 'baseui/textarea';

const COMPONENTS = {
  Inputs: [
    {
      label: 'Button',
      href: '/components/button',
      Component: () => <Button>Hello</Button>,
    },
    {
      label: 'Button Group',
      href: '/components/button-group',
      Component: () => (
        <ButtonGroup>
          <Button>Hello</Button>
          <Button>Uber</Button>
        </ButtonGroup>
      ),
    },
    {
      label: 'Input',
      href: '/components/input',
      Component: () => <Input value="Hello Uber" />,
    },
    {
      label: 'Checkbox',
      href: '/components/checkbox',
      Component: () => (
        <React.Fragment>
          <Checkbox>Hello</Checkbox>
          <Checkbox checked>Uber</Checkbox>
        </React.Fragment>
      ),
    },
    {
      label: 'Radio',
      href: '/components/radio',
      Component: () => (
        <React.Fragment>
          <RadioGroup value="2">
            <Radio value="1" overrides={{Root: {style: {marginBottom: '0'}}}}>
              Hello
            </Radio>
            <Radio value="2" overrides={{Root: {style: {marginTop: '0'}}}}>
              Uber
            </Radio>
          </RadioGroup>
        </React.Fragment>
      ),
    },
    {
      label: 'Textarea',
      href: '/components/textarea',
      Component: () => <Textarea value="Hello Uber" />,
    },
    {
      label: 'Form Control',
      href: '/components/form-control',
      Component: () => (
        <FormControl label="Hello Uber" caption="Hello Uber">
          <Input value="" />
        </FormControl>
      ),
    },
    {
      label: 'Payment Card',
      href: '/components/payment-card',
      Component: () => <PaymentCard value="4242424242424242" />,
    },
    {
      label: 'Pin Code',
      href: '/components/pin-code',
      Component: () => <PinCode value={['1', '2', '3', '4']} />,
    },
    {
      label: 'Phone Input',
      href: '/components/phone-input',
      Component: () => <PhoneInput />,
    },
    {
      label: 'Slider',
      href: '/components/slider',
      Component: () => <Slider value={[50]} />,
    },
  ],
};

function Thumbnail({children, label, href, scale = 1}) {
  const [css, theme] = useStyletron();
  return (
    <a
      href={href}
      className={css({
        color: 'unset',
        textDecoration: 'unset',
        position: 'relative',
        border: `solid 1px ${theme.colors.border}`,
        height: '200px',
        width: 'calc(33.33% - 20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box',
        marginBottom: '30px',
        transition: 'all .25s ease-in-out',
        filter: 'grayscale(100%)',
        cursor: 'pointer',
        ':hover': {
          border: `solid 1px ${theme.colors.borderFocus}`,
        },
      })}
    >
      <div
        className={css({
          transform: scale !== 1 ? `scale(${scale})` : null,
          pointerEvents: 'none',
          width: '75%',
        })}
      >
        {children}
      </div>
      <div
        className={css({
          position: 'absolute',
          bottom: '0px',
          right: '0px',
          width: '100%',
          padding: '5px',
          textAlign: 'right',
          fontSize: '12px',
          fontFamily: 'Menlo',
          backgroundColor: theme.colors.backgroundAlt,
          lineHeight: 1,
        })}
      >
        {'baseui/' + href.split('/')[2]}
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
          justifyContent: 'space-between',
        })}
      >
        {COMPONENTS[nature].map(({Component, ...props}) => {
          return (
            <Thumbnail key={props.label} {...props}>
              <Component />
            </Thumbnail>
          );
        })}
        {/* Flexbox hack for aligning last item when using space-between */}
        <div className={css({width: 'calc(33.33% - 20px)'})}></div>
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
