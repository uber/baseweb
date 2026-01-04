/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Button, SIZE, MIN_HIT_AREA } from '..';
import { HeadingMedium, HeadingXSmall, LabelMedium } from '../../typography';

export function Scenario() {
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <HeadingMedium marginTop="0" marginBottom="0">
        Button Min Hit Area Tests
      </HeadingMedium>

      <div>
        <HeadingXSmall marginTop="0" marginBottom="8px">
          Tap Min Hit Area (48px minimum)
        </HeadingXSmall>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button size={SIZE.mini} minHitArea={MIN_HIT_AREA.tap} data-testid="button-mini-tap">
            Mini Tap
          </Button>
          <Button
            size={SIZE.compact}
            minHitArea={MIN_HIT_AREA.tap}
            data-testid="button-compact-tap"
          >
            Compact Tap
          </Button>
          <Button
            size={SIZE.default}
            minHitArea={MIN_HIT_AREA.tap}
            data-testid="button-default-tap"
          >
            Default Tap
          </Button>
          <Button size={SIZE.large} minHitArea={MIN_HIT_AREA.tap} data-testid="button-large-tap">
            Large Tap
          </Button>
        </div>
      </div>

      <div>
        <HeadingXSmall marginTop="0" marginBottom="8px">
          Click Min Hit Area (28px minimum)
        </HeadingXSmall>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button size={SIZE.mini} minHitArea={MIN_HIT_AREA.click} data-testid="button-mini-click">
            Mini Click
          </Button>
          <Button
            size={SIZE.compact}
            minHitArea={MIN_HIT_AREA.click}
            data-testid="button-compact-click"
          >
            Compact Click
          </Button>
          <Button
            size={SIZE.default}
            minHitArea={MIN_HIT_AREA.click}
            data-testid="button-default-click"
          >
            Default Click
          </Button>
          <Button
            size={SIZE.large}
            minHitArea={MIN_HIT_AREA.click}
            data-testid="button-large-click"
          >
            Large Click
          </Button>
        </div>
      </div>

      <div>
        <HeadingXSmall marginTop="0" marginBottom="8px">
          No Min Hit Area (Default)
        </HeadingXSmall>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button size={SIZE.mini} data-testid="button-mini-default">
            Mini Default
          </Button>
          <Button size={SIZE.compact} data-testid="button-compact-default">
            Compact Default
          </Button>
          <Button size={SIZE.default} data-testid="button-default-default">
            Default Default
          </Button>
          <Button size={SIZE.large} data-testid="button-large-default">
            Large Default
          </Button>
        </div>
      </div>
    </div>
  );
}
