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
