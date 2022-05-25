/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { HIERARCHY, SHAPE } from '../constants.js';

import { Badge, NotificationCircle, COLOR } from '../index.js';
import Check from '../../icon/check.js';

const layout = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '50px',
};

export function Scenario() {
  return (
    <div>
      <div style={layout}>
        <Badge content="Rect" />
        <Badge content="Rect" color={COLOR.primary} />
        <Badge content="Rect" color={COLOR.positive} />
        <Badge content="Rect" color={COLOR.negative} />
        <Badge content="Rect" color={COLOR.warning} />
      </div>

      <div style={layout}>
        <Badge content="Rect" hierarchy={HIERARCHY.secondary} />
        <Badge content="Rect" hierarchy={HIERARCHY.secondary} color={COLOR.primary} />
        <Badge content="Rect" hierarchy={HIERARCHY.secondary} color={COLOR.positive} />
        <Badge content="Rect" hierarchy={HIERARCHY.secondary} color={COLOR.negative} />
        <Badge content="Rect" hierarchy={HIERARCHY.secondary} color={COLOR.warning} />
      </div>

      <div style={layout}>
        <Badge content="Pill" shape={SHAPE.pill} />
        <Badge content="Pill" shape={SHAPE.pill} color={COLOR.primary} />
        <Badge content="Pill" shape={SHAPE.pill} color={COLOR.positive} />
        <Badge content="Pill" shape={SHAPE.pill} color={COLOR.negative} />
        <Badge content="Pill" shape={SHAPE.pill} color={COLOR.warning} />
      </div>

      <div style={layout}>
        <NotificationCircle content={5} />
        <NotificationCircle content={8} color={COLOR.primary} />
        <NotificationCircle content={24} color={COLOR.positive} />
        <NotificationCircle content={5} color={COLOR.negative} />
        <NotificationCircle content={34} color={COLOR.warning} />
      </div>

      <div style={layout}>
        <NotificationCircle content={<Check />} />
        <NotificationCircle content={<Check />} color={COLOR.primary} />
        <NotificationCircle content={<Check />} color={COLOR.positive} />
        <NotificationCircle content={<Check />} color={COLOR.negative} />
        <NotificationCircle content={<Check />} color={COLOR.warning} />
      </div>
    </div>
  );
}
