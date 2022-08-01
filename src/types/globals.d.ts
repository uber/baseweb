/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type TimeoutID = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare type AnimationFrameID = any;
declare var __NODE__: boolean;
declare var __BROWSER__: boolean;
declare var __DEV__: boolean;

declare module '*.png' {
  const url: string;
  export default url;
}
