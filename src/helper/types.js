/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import type {BasePopoverDefaultPropsT} from '../popover/types.js';
import type {PopoverPropsT} from '../popover/index.js';
export type {
  StatefulPopoverPropsT as StatefulPropsT,
} from '../popover/index.js';

export type HelperStepsPropsT = {|
  index: number,
  length: number,
  onFinish: () => mixed,
  onPrev: () => mixed,
  onNext: () => mixed,
|};

export type PropsT = {
  ...$Exact<PopoverPropsT>,
};
export type PropsDefaultT = {
  ...$Exact<BasePopoverDefaultPropsT>,
};
