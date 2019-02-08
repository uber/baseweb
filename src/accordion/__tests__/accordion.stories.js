/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* global module */
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {storiesOf} from '@storybook/react';

import {styled} from '../../styles/index.js';
import {Accordion, Panel} from '../index.js';

const Centered = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'start',
  height: '90vh',
  lineHeight: 1.5,
  width: '500px',
  margin: '0 auto',
});

const content =
  'Praesent condimentum ante ac ipsum aliquam, ac scelerisque velit sagittis. Ut sit amet libero scelerisque, accumsan ante vitae, hendrerit tellus. Nullam metus est, vehicula a aliquet id, lobortis in mauris.';

storiesOf('Accordion', module).add('Accordion', () => (
  <Centered>
    <Accordion>
      <Panel title="Accordion panel 1">{content}</Panel>
      <Panel title="Accordion panel 2">{content}</Panel>
      <Panel title="Accordion panel 3">{content}</Panel>
    </Accordion>
  </Centered>
));
