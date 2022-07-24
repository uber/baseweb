/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { StatefulPinCodeContainerProps } from './types';

export { default as PinCode } from './pin-code';
export { default as StatefulPinCodeContainer } from './stateful-pin-code-container';
export { default as StatefulPinCode } from './stateful-pin-code';
export { SIZE } from '../input';
export * from './types';

/** @deprecated use StatefulPinCodeContainerProps instead. To be removed in future versions.*/
export type StatefulContainerProps = StatefulPinCodeContainerProps;
