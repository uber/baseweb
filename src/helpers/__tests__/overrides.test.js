// @flow
import {getComponent, getOverrideProps} from '../overrides';

test('Helpers - Overrides - getComponent', () => {
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

test('Helpers - Overrides - getOverrideProps', () => {
  const CustomComponent = jest.fn();
  const override = {
    props: {propName: 'propsValue'},
    style: {color: 'blue'},
  };
  expect(getOverrideProps(null)).toMatchSnapshot(
    'returns empty object when no overrides',
  );
  // $FlowFixMe
  expect(getOverrideProps(CustomComponent)).toMatchSnapshot(
    'returns empty object when override is a component',
  );
  expect(getOverrideProps(override)).toMatchSnapshot(
    'returns correct object when override has props and styles',
  );
});
