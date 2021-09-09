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
import {PINHEAD_SIZES, NEEDLE_SIZES} from '../constants.js';

import type {PinHeadSizeT, NeedleSizeT} from '../types.js';

describe('Fixed Marker', () => {
  const label = 'test';
  // Test that all sizes/needles render
  Object.values(PINHEAD_SIZES).forEach(
    // $FlowFixMe
    (pinheadSize: PinHeadSizeT, i: number) => {
      Object.values(NEEDLE_SIZES).forEach(
        // $FlowFixMe
        (needleSize: NeedleSizeT, z: number) => {
          test(`renders fixed marker with needle: ${needleSize} and size: ${pinheadSize}`, () => {
            const {container} = render(
              <FixedMarker
                size={pinheadSize}
                needle={needleSize}
                label={label}
              />,
            );
            const marker = container.querySelector('[data-baseweb="icon"]');
            expect(marker).not.toBeNull();
          });
        },
      );
    },
  );
});
