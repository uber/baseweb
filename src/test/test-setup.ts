/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// At some point baseui published with errors in unit-tests that caused problems for users.
// The assertions below will fail unit-tests if any errors or warnings are logs so that we
// can have greater certainty that fewer bugs are published.
// https://github.com/facebook/jest/issues/6121

// @ts-ignore
function applyErrorDetails(message) {
  return `Failing unit test due to unexpected console.error. Please resolve this in the relevant test.\n\n${
    message instanceof Error ? '${message}' : 'Error: '
  }${message}`;
}

let error = console.error;
console.error = function (message) {
  // @ts-ignore
  error.apply(console, arguments);
  throw new Error(applyErrorDetails(message));
};

// @ts-ignore
function applyWarningDetails(message) {
  return `Failing unit test due to unexpected console.warn. Please mock and assert this in the relevant test.\n\nWarning: ${message}`;
}

let warn = console.warn;
console.warn = function (message) {
  // @ts-ignore
  warn.apply(console, arguments);
  throw new Error(applyWarningDetails(message));
};

// All files must be modules when the '--isolatedModules' flag is provided.
export {};
