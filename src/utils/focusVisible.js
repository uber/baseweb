/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env browser */

// @flow
// based on:
// - https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/utils/focusVisible.js
// - https://github.com/WICG/focus-visible/blob/v4.1.5/src/focus-visible.js

// CodeSandbox is strangely reloading this file somehow
// this ensures a single instance of these flags
const initializedKey = Symbol.for('baseweb.focusVisible.initialized');
const hadKeyboardEventKey = Symbol.for('baseweb.focusVisible.hadKeyboardEvent');
const hadFocusVisibleRecentlyKey = Symbol.for(
  'baseweb.focusVisible.hadFocusVisibleRecently',
);
const hadFocusVisibleRecentlyTimeoutKey = Symbol.for(
  'baseweb.focusVisible.hadFocusVisibleRecentlyTimeout',
);

const inputTypesWhitelist = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  'datetime-local': true,
};

/**
 * Computes whether the given element should automatically trigger the
 * `focus-visible` class being added, i.e. whether it should always match
 * `:focus-visible` when focused.
 * @param {Element} node
 * @return {boolean}
 */
function focusTriggersKeyboardModality(node) {
  if (!node) return false;
  const {type, tagName} = node;

  if (tagName === 'INPUT' && inputTypesWhitelist[type] && !node.readOnly) {
    return true;
  }

  if (tagName === 'TEXTAREA' && !node.readOnly) {
    return true;
  }

  if (node.isContentEditable) {
    return true;
  }

  return false;
}

/**
 * Keep track of our keyboard modality state with `hadKeyboardEvent`.
 * If the most recent user interaction was via the keyboard;
 * and the key press did not include a meta, alt/option, or control key;
 * then the modality is keyboard. Otherwise, the modality is not keyboard.
 * @param {KeyboardEvent} event
 */
function handleKeyDown(event) {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }
  window[hadKeyboardEventKey] = true;
}

/**
 * If at any point a user clicks with a pointing device, ensure that we change
 * the modality away from keyboard.
 * This avoids the situation where a user presses a key on an already focused
 * element, and then clicks on a different element, focusing it with a
 * pointing device, while we still think we're in keyboard modality.
 */
function handlePointerDown() {
  window[hadKeyboardEventKey] = false;
}

function handleVisibilityChange() {
  if (this.visibilityState === 'hidden') {
    // If the tab becomes active again, the browser will handle calling focus
    // on the element (Safari actually calls it twice).
    // If this tab change caused a blur on an element with focus-visible,
    // re-apply the class when the user switches back to the tab.
    if (window[hadFocusVisibleRecentlyKey]) {
      window[hadKeyboardEventKey] = true;
    }
  }
}

function prepare(doc) {
  doc.addEventListener('keydown', handleKeyDown, true);
  doc.addEventListener('mousedown', handlePointerDown, true);
  doc.addEventListener('pointerdown', handlePointerDown, true);
  doc.addEventListener('touchstart', handlePointerDown, true);
  doc.addEventListener('visibilitychange', handleVisibilityChange, true);
}

//$FlowFixMe
export function teardown(doc) {
  doc.removeEventListener('keydown', handleKeyDown, true);
  doc.removeEventListener('mousedown', handlePointerDown, true);
  doc.removeEventListener('pointerdown', handlePointerDown, true);
  doc.removeEventListener('touchstart', handlePointerDown, true);
  doc.removeEventListener('visibilitychange', handleVisibilityChange, true);
}

//$FlowFixMe
export function isFocusVisible(event) {
  const {target} = event;
  try {
    return target.matches(':focus-visible');
  } catch (error) {
    // browsers not implementing :focus-visible will throw a SyntaxError
    // we use our own heuristic for those browsers
    // rethrow might be better if it's not the expected error but do we really
    // want to crash if focus-visible malfunctioned?
  }

  // no need for validFocusTarget check. the user does that by attaching it to
  // focusable events only
  return window[hadKeyboardEventKey] || focusTriggersKeyboardModality(target);
}

/**
 * Should be called if a blur event is fired on a focus-visible element
 */
export function handleBlurVisible() {
  // To detect a tab/window switch, we look for a blur event followed
  // rapidly by a visibility change.
  // If we don't see a visibility change within 100ms, it's probably a
  // regular focus change.
  window[hadFocusVisibleRecentlyKey] = true;
  if (__BROWSER__) {
    window.clearTimeout(window[hadFocusVisibleRecentlyTimeoutKey]);
    window[hadFocusVisibleRecentlyTimeoutKey] = window.setTimeout(() => {
      window[hadFocusVisibleRecentlyKey] = false;
    }, 100);
  }
}

//$FlowFixMe
export function initFocusVisible(node) {
  if (!window[initializedKey] && node != null) {
    window[initializedKey] = true;
    window[hadKeyboardEventKey] = true;
    window[hadFocusVisibleRecentlyKey] = false;
    window[hadFocusVisibleRecentlyTimeoutKey] = null;
    prepare(node.ownerDocument);
  }
}

export const forkFocus = (
  // eslint-disable-next-line flowtype/no-weak-types
  rootProps: any,
  handler: (e: SyntheticEvent<>) => void,
) => (e: SyntheticEvent<>) => {
  if (typeof rootProps.onFocus === 'function') {
    rootProps.onFocus(e);
  }
  handler(e);
};

export const forkBlur = (
  // eslint-disable-next-line flowtype/no-weak-types
  rootProps: any,
  handler: (e: SyntheticEvent<>) => void,
) => (e: SyntheticEvent<>) => {
  if (typeof rootProps.onBlur === 'function') {
    rootProps.onBlur(e);
  }
  handler(e);
};
