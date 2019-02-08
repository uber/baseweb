/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/*global module */
/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import {storiesOf} from '@storybook/react';

import {StyledLink} from '../../link/index.js';
import {Breadcrumbs} from '../index.js';

storiesOf('Breadcrumbs', module).add('Breadcrumbs with Link component', () => (
  <Breadcrumbs>
    <StyledLink href="#">Parent Page</StyledLink>
    <StyledLink href="#">Sub-Parent Page</StyledLink>
    <span>Current Page</span>
  </Breadcrumbs>
));
