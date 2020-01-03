/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable import/prefer-default-export */

// Helps scroll a list item into view when cycling through list via
// keybindings and highlighted item is not in view.

// Previously, this util had been using `scrollIntoView`. The issue with that method is that
// it will not only scroll the parent scroll but also the window scroll bar - causing a jump.
// problem description https://lists.w3.org/Archives/Public/www-style/2014Jul/0386.html

// CHASE: I've noticed some performance issues when testing this with many items in the list.
// I imagine the browser can debounce the `node.scrollIntoView` calls. Callers of this function
// will likely want to debounce themselves.
export function scrollItemIntoView(
  child: ?HTMLElement,
  parent: HTMLElement,
  isFirst?: boolean,
  isLast?: boolean,
  scrollAllignInView?: 'auto' | 'center' = 'auto',
) {
  if (!child) return;

  const childRect = child.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  // while scrolling down, if element is below view
  if (childRect.bottom > parentRect.bottom) {
    if (isLast) {
      parent.scrollTop = parent.scrollHeight - parentRect.height;
    } else {
      const targetBottom = child.offsetTop + childRect.height;
      parent.scrollTop =
        targetBottom -
        (scrollAllignInView === 'center'
          ? Math.round((parentRect.height + childRect.height) / 2)
          : parentRect.height);
    }

    // while scrolling up, if element is above view
  } else if (childRect.top < parentRect.top) {
    if (isFirst) {
      parent.scrollTop = 0;
    } else {
      parent.scrollTop =
        child.offsetTop -
        (scrollAllignInView === 'center'
          ? Math.round((parentRect.height - childRect.height) / 2)
          : 0);
    }
  }
}
