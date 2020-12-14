/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* global exports document */

exports.assertion = function(selector, msg) {
  const ancestors = selector;

  // If the selector comes from a section of a page object
  // selector will be an array of objects starting from the outermost
  // ancestor (section), and ending with the element
  // Join their selectors in order
  // Should probably look into getting this added to core
  if (typeof ancestors !== 'string') {
    selector = '';

    let oElement;

    while ((oElement = ancestors.shift())) {
      selector += ' ' + oElement.selector;
    }
  }

  this.message = msg || `Testing if element ${selector} has focus`;
  this.expected = true;

  this.pass = function(value) {
    return value === this.expected;
  };

  this.value = function(result) {
    return result.value;
  };

  this.command = function(callback) {
    this.api.execute(
      function(selector) {
        return document.activeElement === document.querySelector(selector);
      },
      [selector],
      callback,
    );
  };
};
