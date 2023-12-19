/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

declare module "just-clone" {
  function clone<T>(input: T): T;
  export default clone;
}
