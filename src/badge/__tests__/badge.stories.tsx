/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as BadgeBadge } from './badge.scenario';
import { Scenario as BadgeNotificationCircle } from './notification-circle.scenario';
import { Scenario as BadgeHintDot } from './hint-dot.scenario';
import { Scenario as BadgeInlineBadge } from './inline-badge.scenario';

export const Badge = () => <BadgeBadge />;
export const NotificationCircle = () => <BadgeNotificationCircle />;
export const HintDot = () => <BadgeHintDot />;
export const InlineBadge = () => <BadgeInlineBadge />;
