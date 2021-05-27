/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

/**
 * Given a event, returns its target: object from which the event was dispatched.
 * This implementation also works for events dispatched from shadow DOM with mode === 'open'.
 */
export default function getEventTarget(event: Event): EventTarget {
  // $FlowFixMe
  if (event.composedPath) {
    return event.composedPath()[0];
  }
  return event.target;
}
