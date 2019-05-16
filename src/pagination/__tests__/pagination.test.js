/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-env browser */
import * as React from 'react';
import {mount} from 'enzyme';
import * as StyledComponents from '../styled-components.js';
import {Button} from '../../button/index.js';
import Pagination from '../pagination.js';

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
        $ref,
        $disabled,
        $isLoading,
        $isSelected,
        initialState,
        onItemSelect,
        ...restProps
      }) => <div {...restProps}>{children}</div>;
      const props = {
        ...getSharedProps(),
        overrides: {
          [componentName]: {
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

  test('dropdown button click', () => {
    const component = mount(<Pagination {...getSharedProps()} />);
    component.find(StyledComponents.DropdownButton).simulate('click');
    expect(component.state('isMenuOpen')).toEqual(true);
    expect(document.addEventListener.mock.calls[0][0]).toEqual('click');
    expect(document.removeEventListener.mock.calls.length).toBe(0);

    component.find(StyledComponents.DropdownButton).simulate('click');
    expect(component.state('isMenuOpen')).toEqual(false);
    expect(document.removeEventListener.mock.calls[0][0]).toEqual('click');
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
    component.instance().onDropdownButtonClick = jest.fn();
    component.instance().onMenuItemSelect({item: {label: 3}});
    expect(props.onPageChange.mock.calls[0]).toEqual([
      {
        nextPage: 3,
        prevPage: 2,
      },
    ]);
  });
});
