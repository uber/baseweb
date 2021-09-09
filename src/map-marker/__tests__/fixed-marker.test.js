/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */

import * as React from 'react';
import {render} from '@testing-library/react';
import {FixedMarker} from '../index.js';
import Pinhead from '../pin-head.js';
import Needle from '../needle.js';
import {PINHEAD_SIZES, NEEDLE_SIZES} from '../constants.js';

describe('Fixed Marker', () => {
  it('renders a marker with size and needle', () => {
    const label = 'Test';
    const size = PINHEAD_SIZES.small;
    const needle = NEEDLE_SIZES.short;

    const {container} = render(
      <FixedMarker size={size} needle={needle} label={label} />,
    );
    const pinhead = container.querySelector("[aria-label='Test map pin head']");
    expect(pinhead).not.toBeNull();
  });
});
