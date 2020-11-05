import * as React from 'react';
import {StyletronComponent} from 'styletron-react';

import {
  ACCESSIBILITY_TYPE,
  PLACEMENT,
  TRIGGER_TYPE,
  PopoverProps,
  StatefulPopoverProps,
} from '../popover';

export type PropsT = PopoverProps;
export type StatefulPropsT = StatefulPopoverProps;

export type HelperStepsPropsT = {
  index: number;
  length: number;
  onFinish: () => any;
  onPrev: () => any;
  onNext: () => any;
};

export {ACCESSIBILITY_TYPE, PLACEMENT, TRIGGER_TYPE};

export const StyledArrow: StyletronComponent<any>;
export const StyledBody: StyletronComponent<any>;

export const Unstable_Helper: React.FC<PropsT>;
export const Unstable_StatefulHelper: React.FC<StatefulPropsT>;
export const Unstable_HelperSteps: React.FC<HelperStepsPropsT>;
