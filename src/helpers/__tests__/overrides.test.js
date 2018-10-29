/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  getOverride,
  getOverrideProps,
  toObjectOverride,
  mergeOverrides,
  mergeOverride,
  getOverrides,
} from '../overrides';

function getMockComponent<T>(): React.ComponentType<T> {
  const mock: React.ComponentType<T> = () => null;
  return mock;
}

describe('Helpers - Overrides', () => {
  test('getOverride', () => {
    const CustomComponent = getMockComponent();
    expect(getOverride(null)).toEqual(null);
    expect(getOverride(CustomComponent)).toEqual(CustomComponent);
    expect(getOverride({component: CustomComponent})).toEqual(CustomComponent);
  });

  test('getOverrideProps', () => {
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

  test('toObjectOverride', () => {
    const CustomComponent = getMockComponent();
    // $FlowFixMe - Calling toObjectOverride with no args
    expect(toObjectOverride()).toEqual({});
    // $FlowFixMe - Calling toObjectOverride with null
    expect(toObjectOverride(null)).toEqual({});
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

  test('mergeOverrides', () => {
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

  test('mergeOverride can merge props and style objects', () => {
    expect(
      mergeOverride(
        {
          props: {foo: true, bar: false},
          style: {color: 'red', textTransform: 'uppercase'},
        },
        {
          props: {foo: false},
          style: {color: 'blue'},
        },
      ),
    ).toEqual({
      props: {foo: false, bar: false},
      style: {color: 'blue', textTransform: 'uppercase'},
    });
  });

  test('mergeOverride doesnt unnecessarily create new objects', () => {
    const override1 = {props: {foo: true}};
    const override2 = {style: {color: 'red'}};
    const result = mergeOverride(override1, override2);
    expect(result.props).toBe(override1.props);
    expect(result.style).toBe(override2.style);
  });

  test('mergeOverride can compose style functions', () => {
    const override1 = {
      style: () => ({color: 'red', textTransform: 'uppercase'}),
    };
    const override2 = {style: () => ({color: 'blue'})};
    const result = mergeOverride(override1, override2);
    expect(typeof result.style).toBe('function');
    // $FlowFixMe style should be a function here
    expect(result.style()).toEqual({
      color: 'blue',
      textTransform: 'uppercase',
    });
  });

  test('getOverrides', () => {
    const DefaultComponent = getMockComponent();
    const OverrideComponent = getMockComponent();

    expect(getOverrides(null, DefaultComponent)).toEqual([
      DefaultComponent,
      {},
    ]);

    expect(getOverrides(OverrideComponent, DefaultComponent)).toEqual([
      OverrideComponent,
      {},
    ]);

    expect(
      getOverrides(
        {
          component: OverrideComponent,
          props: {
            custom: 'prop',
          },
          style: {
            cursor: 'pointer',
          },
        },
        DefaultComponent,
      ),
    ).toEqual([
      OverrideComponent,
      {
        custom: 'prop',
        $style: {
          cursor: 'pointer',
        },
      },
    ]);
  });
});
