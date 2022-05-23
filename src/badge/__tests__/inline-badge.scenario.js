/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { HIERARCHY, SHAPE } from '../constants.js';

import { InlineBadge, COLOR } from '../index.js';

const layout = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '50px',
};

export function Scenario() {
  return (
    <div>
      <div style={layout}>
        <InlineBadge>Rect</InlineBadge>
        <InlineBadge color={COLOR.primary}>Rect</InlineBadge>
        <InlineBadge color={COLOR.positive}>Rect</InlineBadge>
        <InlineBadge color={COLOR.negative}>Rect</InlineBadge>
        <InlineBadge color={COLOR.warning}>Rect</InlineBadge>
      </div>

      <div style={layout}>
        <InlineBadge hierarchy={HIERARCHY.secondary}>Rect</InlineBadge>
        <InlineBadge hierarchy={HIERARCHY.secondary} color={COLOR.primary}>
          Rect
        </InlineBadge>
        <InlineBadge hierarchy={HIERARCHY.secondary} color={COLOR.positive}>
          Rect
        </InlineBadge>
        <InlineBadge hierarchy={HIERARCHY.secondary} color={COLOR.negative}>
          Rect
        </InlineBadge>
        <InlineBadge hierarchy={HIERARCHY.secondary} color={COLOR.warning}>
          Rect
        </InlineBadge>
      </div>

      <div style={layout}>
        <InlineBadge shape={SHAPE.pill}>Pill</InlineBadge>
        <InlineBadge shape={SHAPE.pill} color={COLOR.primary}>
          Pill
        </InlineBadge>
        <InlineBadge shape={SHAPE.pill} color={COLOR.positive}>
          Pill
        </InlineBadge>
        <InlineBadge shape={SHAPE.pill} color={COLOR.negative}>
          Pill
        </InlineBadge>
        <InlineBadge shape={SHAPE.pill} color={COLOR.warning}>
          Pill
        </InlineBadge>
      </div>
    </div>
  );
}
