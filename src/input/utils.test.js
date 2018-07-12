// @flow
import {getSharedProps, getComponent, getComponentProps} from './utils';
import {ADJOINED, SIZE} from './index';

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

test('Utils - getComponent', () => {
  const DefaultComponent = jest.fn();
  const CustomComponent = jest.fn();
  expect(getComponent(null, DefaultComponent)).toEqual(DefaultComponent);
  // $FlowFixMe
  expect(getComponent(CustomComponent, DefaultComponent)).toEqual(
    CustomComponent,
  );
  // $FlowFixMe
  expect(getComponent({component: CustomComponent}, DefaultComponent)).toEqual(
    CustomComponent,
  );
});

test('Utils - getComponentProps', () => {
  const CustomComponent = jest.fn();
  const override = {
    props: {propName: 'propsValue'},
    style: {color: 'blue'},
  };
  expect(getComponentProps(null)).toMatchSnapshot(
    'returns empty object when no overrides',
  );
  // $FlowFixMe
  expect(getComponentProps(CustomComponent)).toMatchSnapshot(
    'returns empty object when override is a component',
  );
  expect(getComponentProps(override)).toMatchSnapshot(
    'returns correct object when override has props and styles',
  );
});
