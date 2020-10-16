/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {render, getByText} from '@testing-library/react';

import {Notification} from '../index.js';

describe('Toast', () => {
  it('basic inline rendering', () => {
    const content = 'content';
    const {container} = render(<Notification>{content}</Notification>);
    getByText(container, content);
  });
});
