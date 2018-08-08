/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
import {ReactWrapper} from 'enzyme';

const getStyles = received => {
  if (received && received instanceof ReactWrapper) {
    if (received.length < 1) {
      throw new Error(
        `Value passed to expect() was an empty enzyme ReactWrapper, expected a single styled component`,
      );
    }
    const type = received.type();
    if (type.displayName !== 'MockStyledComponent') {
      throw new Error(
        `toHaveStyleRule can only be called on styled components, instead found ${type}`,
      );
    }

    const instance = received.instance();
    const state = instance.state || {};
    return state.styles || {};
  }
  throw new Error(
    `toHaveStyleRule can only be called on styled components, instead found ${typeof received}`,
  );
};

const toHaveStyleRule: JestMatcher = function _toHaveStyleRule(
  actual: mixed,
  ...args
) {
  const [property, value] = args;

  let styles: {};
  try {
    styles = getStyles(actual) || {};
  } catch (err) {
    return {
      pass: false,
      message: () => err.message,
    };
  }

  const actualValue = styles[property];

  const pass =
    value instanceof RegExp ? value.test(actualValue) : value === actualValue;

  const message = () =>
    `Expected '${property}' to match:\n` +
    `  ${this.utils.printExpected(value)}\n` +
    'Received:\n' +
    `  ${this.utils.printReceived(actualValue)}`;

  return {
    pass,
    message,
  };
};

export default toHaveStyleRule;
