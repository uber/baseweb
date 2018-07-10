// @flow
import 'jest-enzyme';
import toHaveStyleRule from './expect-to-have-style-rule';

expect.extend({toHaveStyleRule});

// TODO: fix tests with this uncommented
//jest.mock('../styles/styled.js');
