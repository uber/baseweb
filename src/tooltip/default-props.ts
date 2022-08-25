/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { ACCESSIBILITY_TYPE, PLACEMENT, TRIGGER_TYPE } from './constants';
import type { BaseTooltipProps } from './types';

const baseDefaultProps: Partial<BaseTooltipProps> = {
  accessibilityType: ACCESSIBILITY_TYPE.tooltip,
  focusLock: false,
  autoFocus: false,
  returnFocus: false,
  onMouseEnterDelay: 200,
  onMouseLeaveDelay: 200,
  overrides: {},
  placement: PLACEMENT.auto,
  popoverMargin: 0,
  showArrow: false,
  triggerType: TRIGGER_TYPE.hover,
  renderAll: false,
};

export default baseDefaultProps;
