// @flow
import {ACCESSIBILITY_TYPE, PLACEMENT, TRIGGER_TYPE} from './constants';
import type {BasePopoverPropsT} from './types';

const baseDefaultProps: $Shape<BasePopoverPropsT> = {
  accessibilityType: ACCESSIBILITY_TYPE.menu,
  components: {},
  onMouseEnterDelay: 200,
  onMouseLeaveDelay: 200,
  placement: PLACEMENT.auto,
  showArrow: false,
  triggerType: TRIGGER_TYPE.click,
};

export default baseDefaultProps;
