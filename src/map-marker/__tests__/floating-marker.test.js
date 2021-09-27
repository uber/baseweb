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
import {FLOATING_MARKER_SIZES} from '../constants.js';

describe('Floating Marker', () => {
  const label = 'test';
  Object.values(FLOATING_MARKER_SIZES).forEach(
    //$FlowFixMe
    (size: FloatingMarkerSizeT) => {
      test(`renders floating marker with size ${size}`, () => {
        const {container} = render(
          <FloatingMarker label={label} size={size} />,
        );
        const marker = container.querySelector('[data-baseweb="map-marker"]');
        expect(marker).not.toBeNull();
      });
    },
  );
});
