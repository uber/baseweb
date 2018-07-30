// @flow

import * as React from 'react';

import {
  getComponent,
  getOverrideProps,
  toObjectOverride,
  mergeOverrides,
} from '../overrides';

const getMockComponent = (): React.ComponentType<*> => {
  const mock: React.ComponentType<*> = () => null;
  return mock;
};

test('Helpers - Overrides - getComponent', () => {
  const DefaultComponent = getMockComponent();
  const CustomComponent: React.ComponentType<*> = getMockComponent();
  expect(getComponent(null, DefaultComponent)).toEqual(DefaultComponent);
  expect(getComponent(CustomComponent, DefaultComponent)).toEqual(
    CustomComponent,
  );
  expect(getComponent({component: CustomComponent}, DefaultComponent)).toEqual(
    CustomComponent,
  );
});

test('Helpers - Overrides - getOverrideProps', () => {
  const CustomComponent = getMockComponent();
  const override = {
    props: {propName: 'propsValue'},
    style: {color: 'blue'},
  };
  expect(getOverrideProps(null)).toMatchSnapshot(
    'returns empty object when no overrides',
  );
  expect(getOverrideProps(CustomComponent)).toMatchSnapshot(
    'returns empty object when override is a component',
  );
  expect(getOverrideProps(override)).toMatchSnapshot(
    'returns correct object when override has props and styles',
  );
});

test('Helpers - Overrides - toObjectOverride', () => {
  const CustomComponent = getMockComponent();
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
  const CustomRoot = getMockComponent();
  const CustomFoo = getMockComponent();
  const CustomBar = getMockComponent();

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
