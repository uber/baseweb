/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {ACCESSIBILITY_TYPE, PLACEMENT, TRIGGER_TYPE} from './constants.js';
import type {BaseTooltipPropsT} from './types.js';

const baseDefaultProps: $Shape<BaseTooltipPropsT> = {
  accessibilityType: ACCESSIBILITY_TYPE.tooltip,
  onMouseEnterDelay: 200,
  onMouseLeaveDelay: 200,
  overrides: {},
  placement: PLACEMENT.auto,
  showArrow: false,
  triggerType: TRIGGER_TYPE.hover,
};

export default baseDefaultProps;
