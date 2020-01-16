/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */
import * as React from 'react';
import {mount} from 'enzyme';
import * as StyledComponents from '../styled-components.js';
import {Button} from '../../button/index.js';
import {Select} from '../../select/index.js';
import Pagination from '../pagination.js';

jest.useFakeTimers();

// Mock Layer and TetherBehavior
let mockCount = 0;
jest.mock('../../layer/index.js', () => {
  return {
    Layer: jest.fn().mockImplementation(props => {
      if (props.onMount && !mockCount) {
        ++mockCount;
        props.onMount();
      }
      return props.children;
    }),
    TetherBehavior: jest.fn().mockImplementation(props => {
      return props.children;
    }),
    TETHER_PLACEMENT: {
      bottom: 'bottom',
    },
  };
});

const originalAddEventListener = document.addEventListener;
const originalRemoveEventListener = document.removeEventListener;

function getSharedProps() {
  return {
    numPages: 3,
    currentPage: 2,
  };
}

describe('Pagination Stateless', () => {
  beforeAll(() => {
    // $FlowFixMe
    document.addEventListener = jest.fn();
    // $FlowFixMe
    document.removeEventListener = jest.fn();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    // $FlowFixMe
    document.addEventListener = originalAddEventListener;
    // $FlowFixMe
    document.removeEventListener = originalRemoveEventListener;
  });
  Object.keys(StyledComponents).forEach(componentName => {
    test(`support component override - ${componentName}`, () => {
      /* eslint-disable react/prop-types */
      const MockComponent = ({
        children,
        $kind,
        $size,
        $shape,
        $disabled,
        $isLoading,
        $isSelected,
        initialState,
        onItemSelect,
        ...restProps
      }) => <div {...restProps}>{children}</div>;
      const overrideName = componentName.replace(/^Styled/, '');
      const props = {
        ...getSharedProps(),
        overrides: {
          [overrideName]: {
            component: MockComponent,
            props: {
              id: 'prop',
            },
          },
        },
      };
      const component = mount(<Pagination {...props} />);
      component.setState({isMenuOpen: true});
      expect(component.find(StyledComponents[componentName])).not.toExist();
      expect(component.find(MockComponent)).toExist();
      expect(component.find(MockComponent).prop('id')).toEqual('prop');
    });
  });

  test('dropdown is rendered', () => {
    const props = getSharedProps();
    const component = mount(<Pagination {...props} />);
    const select = component.find(Select);
    expect(select).toExist();
    expect(select.props().value).toEqual([{label: props.currentPage}]);
    expect(select.props().onChange).toEqual(
      component.instance().onMenuItemSelect,
    );
  });

  test('prev button click', () => {
    const props = {
      ...getSharedProps(),
      onPageChange: jest.fn(),
      onPrevClick: jest.fn(),
    };
    const component = mount(<Pagination {...props} />);
    component
      .find(Button)
      .first()
      .simulate('click');
    expect(props.onPageChange.mock.calls[0]).toEqual([
      {
        nextPage: props.currentPage - 1,
        prevPage: props.currentPage,
      },
    ]);
    expect(props.onPrevClick.mock.calls.length).toBe(1);
  });

  test('next button click', () => {
    const props = {
      ...getSharedProps(),
      onPageChange: jest.fn(),
      onNextClick: jest.fn(),
    };
    const component = mount(<Pagination {...props} />);
    component
      .find(Button)
      .last()
      .simulate('click');
    expect(props.onPageChange.mock.calls[0]).toEqual([
      {
        nextPage: props.currentPage + 1,
        prevPage: props.currentPage,
      },
    ]);
    expect(props.onNextClick.mock.calls.length).toBe(1);
  });

  test('getMenuOptions', () => {
    const props = getSharedProps();
    const component = mount(<Pagination {...props} />);
    expect(component.instance().getMenuOptions(props.numPages)).toEqual([
      {label: 1},
      {label: 2},
      {label: 3},
    ]);
  });

  test('select item', () => {
    const props = {
      ...getSharedProps(),
      onPageChange: jest.fn(),
    };
    const component = mount(<Pagination {...props} />);
    // $FlowFixMe
    component.instance().onDropdownButtonClick = jest.fn();
    component.instance().onMenuItemSelect({value: [{label: 3}]});
    expect(props.onPageChange.mock.calls[0]).toEqual([
      {
        nextPage: 3,
        prevPage: 2,
      },
    ]);
  });
});
