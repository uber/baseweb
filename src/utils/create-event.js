/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global window document */

/** A safe way to create event objects down to IE11 */
export default function createEvent(eventName: string) {
  let event;
  if (typeof window.Event === 'function') {
    event = new window.Event(eventName, {bubbles: true, cancelable: true});
  } else {
    event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
  }
  return event;
}
