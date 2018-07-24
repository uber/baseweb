// @flow
import {getSharedProps} from '../utils';
import {ADJOINED, SIZE} from '../index';

test('Utils - getSharedProps', () => {
  const props = {
    id: 'id',
    inputRef: {current: {focus: () => {}}},
    adjoined: ADJOINED.none,
    size: SIZE.default,
    required: false,
    disabled: false,
    error: false,
    value: 'value',
    placeholder: 'placeholder',
    onChange: jest.fn(),
    autoFocus: false,
    isFocused: false,
  };
  const state = {
    isFocused: true,
  };
  // $FlowFixMe
  expect(getSharedProps(props, state)).toMatchSnapshot(
    'getSharedProps returns correct object',
  );
});
