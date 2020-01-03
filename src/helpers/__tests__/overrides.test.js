/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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
  mergeConfigurationOverrides,
  getOverrides,
} from '../overrides.js';

function getMockComponent(): React.ComponentType<*> {
  const mock: React.ComponentType<*> = () => null;
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
    const propsAsFunction = override => {
      const props: {propName: string, className?: string} = {
        propName: 'propValue',
      };
      if (override.style) {
        props.className = 'someCSSClass';
      }
      return props;
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
    expect(getOverrideProps({props: propsAsFunction})).toMatchSnapshot(
      'returns correct object when props is a function and styles in override is not present',
    );
    expect(
      getOverrideProps({
        props: propsAsFunction,
        style: {color: 'red'},
      }),
    ).toMatchSnapshot(
      'returns correct object when props is a function and styles in override is present',
    );
    expect(
      getOverrideProps({
        props: () => null,
      }),
    ).toMatchSnapshot(
      'returns correct object when props is a function which return null',
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

  test('mergeOverride can compose props functions', () => {
    const override1 = {
      props: () => ({prop1: 'val1', prop2: 'val2'}),
    };
    const override2 = {props: () => ({prop1: 'newValue'})};
    const result = mergeOverride(override1, override2);
    expect(typeof result.props).toBe('function');
    // $FlowFixMe props should be a function here
    expect(result.props()).toEqual({
      prop1: 'newValue',
      prop2: 'val2',
    });
  });

  test('mergeConfigurationOverrides', () => {
    const overrideObject1 = {key1: 'value1', key2: 'value2'};
    const overrideObject2 = {key1: 'overrideValue'};
    const overrideFunction1 = () => overrideObject1;
    const overrideFunction2 = () => overrideObject2;
    const expectedResult = {
      key1: 'overrideValue',
      key2: 'value2',
    };

    const result1 = mergeConfigurationOverrides(
      overrideObject1,
      overrideObject2,
    );
    const result2 = mergeConfigurationOverrides(
      overrideObject1,
      overrideFunction2,
    );
    const result3 = mergeConfigurationOverrides(
      overrideFunction1,
      overrideObject2,
    );
    const result4 = mergeConfigurationOverrides(
      overrideFunction1,
      overrideFunction2,
    );

    expect(typeof result1).toBe('object');
    expect(result1).toEqual(expectedResult);

    expect(typeof result2).toBe('function');
    // $FlowFixMe result should be a function here
    expect(result2()).toEqual(expectedResult);

    expect(typeof result3).toBe('function');
    // $FlowFixMe result should be a function here
    expect(result3()).toEqual(expectedResult);

    expect(typeof result4).toBe('function');
    // $FlowFixMe result should be a function here
    expect(result4()).toEqual(expectedResult);
  });

  test('getOverrides', () => {
    const DefaultComponent = getMockComponent();
    const OverrideComponent = getMockComponent();
    const propsAsFunction = props => ({key1: 'value1', key2: 'value2'});

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

    expect(
      getOverrides(
        {
          component: OverrideComponent,
          props: propsAsFunction,
          style: {
            cursor: 'pointer',
          },
        },
        DefaultComponent,
      ),
    ).toEqual([
      OverrideComponent,
      {
        key1: 'value1',
        key2: 'value2',
        $style: {
          cursor: 'pointer',
        },
      },
    ]);
  });
});
