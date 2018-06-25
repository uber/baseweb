// @flow
import 'jest-enzyme';
import toHaveStyleRule from './expect-to-have-style-rule';

expect.extend({toHaveStyleRule});

jest.mock('../styles/styled.js');
