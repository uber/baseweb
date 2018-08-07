// @flow
import {ACCESSIBILITY_TYPE, PLACEMENT, TRIGGER_TYPE} from './constants';
import type {BaseTooltipPropsT} from './types';

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
