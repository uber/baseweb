/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable import/prefer-default-export */
import smoothscroll from 'smoothscroll-polyfill';
import {STYLETRON_PROP_MAPPER} from './constants';

if (__BROWSER__) {
  smoothscroll.polyfill();
}

/**
 * Given a props object and a mapper dictionary of prop keys, we will prepend
 * all of the existing prop keys inside mapper with $ to present styletron
 * from passing through those props to the underlying React component.
 */
export function mapStyletronProps(
  props: {},
  mapper: {} = STYLETRON_PROP_MAPPER,
): {} {
  return Object.keys(props).reduce((newProps, propName) => {
    const newName = mapper[propName] ? `$${propName}` : propName;
    newProps[newName] = props[propName];
    return newProps;
  }, {});
}

/**
 * Helps scroll a list item into view when cycling through list via
 * keybindings and highlighted item is not in view.
 */
export function scrollItemIntoView({
  node,
  parentNode,
  isFirst,
  isLast,
}: {
  node: React$ElementRef<*>,
  parentNode: React$ElementRef<*>,
  isFirst?: boolean,
  isLast?: boolean,
}) {
  const nodeDOM = node.current;
  const parentNodeDOM = parentNode.current;
  const nodeRect = nodeDOM.getBoundingClientRect();
  const parentNodeRect = parentNodeDOM.getBoundingClientRect();
  // while scrolling down, if element is below view
  if (nodeRect.bottom > parentNodeRect.bottom) {
    if (isLast) {
      parentNodeDOM.scrollTop =
        parentNodeDOM.scrollHeight - parentNodeRect.height;
    } else {
      nodeDOM.scrollIntoView(false);
    }
    // while scrolling up, if element is above view
  } else if (nodeRect.top < parentNodeRect.top) {
    if (isFirst) {
      parentNodeDOM.scrollTop = 0;
    } else {
      nodeDOM.scrollIntoView();
    }
  }
}
