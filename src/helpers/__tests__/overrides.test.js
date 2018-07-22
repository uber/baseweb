// @flow
import {
  getComponent,
  getOverrideProps,
  toObjectOverride,
  mergeOverrides,
} from '../overrides';

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

test('Helpers - Overrides - toObjectOverride', () => {
  const CustomComponent = jest.fn();
  expect(toObjectOverride()).toBeUndefined();
  expect(toObjectOverride(null)).toBe(null);
  expect(toObjectOverride(CustomComponent)).toEqual({
    component: CustomComponent,
  });
  expect(
    toObjectOverride({
      component: (CustomComponent: React.ComponentType<*>),
      style: {width: '300px'},
    }),
  ).toEqual({
    component: CustomComponent,
    style: {width: '300px'},
  });
});

test('Helpers - Overrides - mergeOverrides', () => {
  const CustomRoot = jest.fn();
  const CustomFoo = jest.fn();
  const CustomBar = jest.fn();

  const overrides1 = {
    Root: CustomRoot,
  };

  const overrides2 = {
    Root: {
      component: (CustomFoo: React.ComponentType<*>),
    },
    Bar: CustomBar,
  };

  expect(mergeOverrides(overrides1)).toEqual({
    Root: {
      component: CustomRoot,
    },
  });

  expect(mergeOverrides(overrides1, overrides2)).toEqual({
    Root: {
      component: CustomFoo,
    },
    Bar: {
      component: CustomBar,
    },
  });
});
