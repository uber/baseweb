/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

/**
 * For aria and other attributes like htmlFor, we often need
 * to attach identifiers to elements. Making `id` a required
 * prop in our components shifts this burden to our customers
 * but it's nice to try to automatically provide these unique
 * ids when possible.
 *
 * Generating unique IDs that match across server/client renders
 * is a hard problem that doesn't have any perfect solutions
 * currently [1] [2]. UUIDs/Math.random will never match, whereas
 * auto-incrementing IDs may work if server and client render
 * exactly the same DOM, so that's what we'll use here. If this
 * is insufficient for users they can apply ids manually.
 *
 * One other technique that we can use internally is to do a
 * setState in componentDidMount or something similar, so that
 * these ids are only used client-side, but this could of course
 * have perf implications.
 *
 * [1] https://github.com/facebook/react/issues/5867
 * [2] https://github.com/reactjs/rfcs/pull/32/files
 */
let id = 0;

export default function getBuiId() {
  return `bui-${++id}`;
}
