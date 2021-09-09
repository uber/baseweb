/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */

import * as React from 'react';
import {render} from '@testing-library/react';
import {FloatingMarker} from '../index.js';
import {PINHEAD_SIZES} from '../constants.js';

describe('Floating Marker', () => {
  it('renders a marker with size', () => {
    const label = 'Test';
    const size = PINHEAD_SIZES.small;

    const {container} = render(<FloatingMarker label={label} size={size} />);
    const pinhead = container.querySelector("[aria-label='Test map pin head']");
    expect(pinhead.getAttribute('size')).toBe(size);
  });
});
