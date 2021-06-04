/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

export type {
  PopoverPropsT as PropsT,
  StatefulPopoverPropsT as StatefulPropsT,
} from '../popover/index.js';

export type HelperStepsPropsT = {|
  index: number,
  length: number,
  onFinish: () => mixed,
  onPrev: () => mixed,
  onNext: () => mixed,
|};
