/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

// At some point baseui published with errors in unit-tests that caused problems for users.
// The assertions below will fail unit-tests if any errors or warnings are logs so that we
// can have greater certainty that fewer bugs are published.
// https://github.com/facebook/jest/issues/6121

function applyErrorDetails(message) {
  return `Failing unit test due to unexpected console.error. Please resolve this in the relevant test.\n\n${
    message instanceof Error ? '${message}' : 'Error: '
  }${message}`;
}

let error = console.error;
// $FlowFixMe
console.error = function (message) {
  error.apply(console, arguments);
  throw new Error(applyErrorDetails(message));
};

function applyWarningDetails(message) {
  return `Failing unit test due to unexpected console.warn. Please mock and assert this in the relevant test.\n\nWarning: ${message}`;
}

let warn = console.warn;
// $FlowFixMe
console.warn = function (message) {
  warn.apply(console, arguments);
  throw new Error(applyWarningDetails(message));
};
