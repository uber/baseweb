/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount, shallow} from 'enzyme';
import {Select, StyledSearchIcon, StyledInput, StyledOption} from '../index';
import {STATE_CHANGE_TYPE, TYPE, ICON} from '../constants';

describe('Stateless select', function() {
  let wrapper,
    events = {};
  let allProps: any = {},
    mockFn;

  beforeEach(function() {
    mockFn = jest.fn();
    events = {
      onChange: mockFn,
      onMouseEnter: mockFn,
      onMouseLeave: mockFn,
      onFocus: mockFn,
      onBlur: mockFn,
    };
    allProps = {
      ...events,
    };
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test.each([
    [TYPE.search, false],
    [TYPE.select, false],
    [TYPE.search, true],
    [TYPE.select, true],
  ])(
    'should render component in %s mode and %s for multiple choice',
    (type, multiple) => {
      allProps.type = type;
      allProps.multiple = multiple;
      wrapper = mount(<Select {...allProps} />);
      expect(wrapper).toMatchSnapshot(
        'Component has correct render in ' +
          type +
          ' mode and mutiple choice equal ' +
          multiple,
      );
    },
  );

  test('should apply initial select options if they are missing in options array', function() {
    const initialSelectedOptions = [
      {
        id: '123',
        label: 'label for 123',
      },
    ];
    allProps.selectedOptions = initialSelectedOptions;
    allProps.type = TYPE.select;
    wrapper = shallow(<Select {...allProps} />);
    const instance = wrapper.instance();
    expect(instance.state.selectedOptions).toEqual(initialSelectedOptions);
  });

  describe('events', function() {
    let documentMock,
      instance,
      originalAddEventListener,
      originalRemoveEventListener;
    beforeEach(function() {
      /* eslint-disable-next-line cup/no-undef  */
      documentMock = document;
      originalAddEventListener = documentMock.addEventListener;
      originalRemoveEventListener = documentMock.removeEventListener;
      //$FlowFixMe
      documentMock.addEventListener = jest.fn();
      //$FlowFixMe
      documentMock.removeEventListener = jest.fn();
      wrapper = shallow(<Select {...allProps} />);
      instance = wrapper.instance();
    });
    afterEach(function() {
      //$FlowFixMe
      documentMock.addEventListener = originalAddEventListener;
      //$FlowFixMe
      documentMock.removeEventListener = originalRemoveEventListener;
    });

    test('should subscribe on document click to handle toggle of dropdown when component is rendered', function() {
      expect(documentMock.addEventListener).toHaveBeenCalledWith(
        'click',
        instance.handleClickEvent,
        {
          capture: true,
        },
      );
    });

    test('should unsubscribe from document click to handle toggle of dropdown when component is removed from DOM', function() {
      wrapper.unmount();
      expect(documentMock.removeEventListener).toHaveBeenCalledWith(
        'click',
        instance.handleClickEvent,
        {
          capture: true,
        },
      );
    });
    test('should close dropdown if clicked outside of select component', function() {
      wrapper.unmount();
      wrapper = mount(<Select {...allProps} />);
      instance = wrapper.instance();
      instance.setState({isDropDownOpen: true});
      instance.handleClickEvent({
        target: null,
      });
      expect(instance.state.isDropDownOpen).toBeFalsy();
    });

    describe('On change action', function() {
      let id = '2';
      let label = 'label for 2';
      let textValue = 'some value';
      beforeEach(function() {
        const options = [
          {
            id: '1',
            label: 'label for 1',
          },
          {
            id,
            label,
          },
          {
            id: '3',
            label: 'label for 3',
          },
          {
            id: '4',
            label: 'label for 4',
          },
        ];
        allProps.type = TYPE.search;
        allProps.options = options;
        allProps.onChange = jest.fn();
        wrapper = mount(<Select {...allProps} />);
      });

      test.each([
        [STATE_CHANGE_TYPE.select, {id, label, selectedOptions: [{id, label}]}],
        [STATE_CHANGE_TYPE.clearAll, {selectedOptions: []}],
        [STATE_CHANGE_TYPE.keyUp, {textValue}],
      ])(
        'should set update of state if change action is %s',
        (type, expectedResult) => {
          const e = {
            target: {
              value: textValue,
            },
          };
          const event = [e, type, id, label];
          wrapper.instance().onChange(...event);
          expect(allProps.onChange).toHaveBeenCalledWith(
            e,
            Object.assign({}, expectedResult, {type}),
          );
        },
      );
    });
  });

  describe('Selected Tags', function() {
    let clearIcon;
    let selectedOptions;
    let options;
    beforeEach(function() {
      selectedOptions = [
        {
          id: '2',
          label: 'label for 2',
        },
      ];
      options = [
        {
          id: '1',
          label: 'label for 1',
        },
        {
          id: '2',
          label: 'label for 2',
        },
      ];
      allProps = Object.assign({}, allProps, {
        options,
        selectedOptions,
        type: TYPE.search,
        multiple: true,
      });
      wrapper = mount(<Select {...allProps} />);
    });

    test('should remove selected tag from selected options if X button is clicked', function() {
      clearIcon = wrapper.find(StyledSearchIcon);
      clearIcon = clearIcon.filterWhere(
        comp => comp.props().$type === ICON.clearTag,
      );
      expect(wrapper.instance().state.selectedOptions).toEqual(selectedOptions);
      clearIcon.first().simulate('click');
      expect(wrapper.instance().state.selectedOptions).toEqual([]);
    });

    test('should should clear all selected tags when Clear All clicked', function() {
      wrapper.unmount();
      allProps.selectedOptions = options;
      wrapper = mount(<Select {...allProps} />);
      clearIcon = wrapper.find(StyledSearchIcon);
      clearIcon = clearIcon.filterWhere(
        comp => comp.props().$type === ICON.clearAll,
      );
      expect(wrapper.instance().state.selectedOptions).toEqual(options);
      clearIcon.first().simulate('click');
      expect(wrapper.instance().state.selectedOptions).toEqual([]);
    });
  });
  describe('Search mode', function() {
    test('should call change method when key up is hit', function() {
      allProps = Object.assign({}, allProps, {
        type: TYPE.search,
        multiple: true,
      });
      wrapper = mount(<Select {...allProps} />);
      const value = 'some input value';
      let input = wrapper
        .find(StyledInput)
        .first()
        .find('input');
      const event = {
        target: {value},
      };
      input.props().onKeyUp(event);
      expect(wrapper.instance().props.onChange).toHaveBeenCalledWith(event, {
        type: STATE_CHANGE_TYPE.keyUp,
        textValue: value,
      });
    });

    test('should support simple filtering', function() {
      allProps = Object.assign({}, allProps, {
        type: TYPE.search,
        filterable: true,
        options: [
          {
            id: 'aaa',
            label: 'AAA',
          },
          {
            id: 'aab',
            label: 'AAB',
          },
          {
            id: 'abb',
            label: 'ABB',
          },
        ],
      });
      wrapper = mount(<Select {...allProps} />);

      let input = wrapper
        .find(StyledInput)
        .first()
        .find('input');

      input.simulate('keyup', {target: {value: 'a'}});
      expect(wrapper.find(StyledOption)).toHaveLength(3);

      input.simulate('keyup', {target: {value: 'aa'}});
      expect(wrapper.find(StyledOption)).toHaveLength(2);

      input.simulate('keyup', {target: {value: 'aaa'}});
      expect(wrapper.find(StyledOption)).toHaveLength(1);

      input.simulate('keyup', {target: {value: 'aaaa'}});
      expect(wrapper.find(StyledOption)).toHaveLength(0);
    });

    test('should support custom filter option', function() {
      allProps = Object.assign({}, allProps, {
        type: TYPE.search,
        filterable: true,
        getOptionLabel: option => option.title,
        options: [
          {
            id: 'a',
            label: {
              title: 'foo',
              subtitle: 'bar',
            },
          },
          {
            id: 'b',
            label: {
              title: 'abc',
              subtitle: 'bar',
            },
          },
        ],
        filterOption: jest.fn().mockImplementation((option, query) => {
          return (
            option.label.title.indexOf(query) >= 0 ||
            option.label.subtitle.indexOf(query) >= 0
          );
        }),
      });
      wrapper = mount(<Select {...allProps} />);

      let input = wrapper
        .find(StyledInput)
        .first()
        .find('input');

      input.simulate('keyup', {target: {value: 'xyz'}});
      expect(wrapper.find(StyledOption).length).toBe(0);

      input.simulate('keyup', {target: {value: 'ar'}});
      expect(wrapper.find(StyledOption).length).toBe(2);
    });
  });
  describe('Select mode', function() {
    test('should toggle dropdown if input is clicked', function() {
      allProps = Object.assign({}, allProps, {
        type: TYPE.select,
      });
      wrapper = mount(<Select {...allProps} />);
      expect(wrapper.instance().state.isDropDownOpen).toBeFalsy();
      wrapper
        .find(StyledInput)
        .first()
        .simulate('click');
      expect(wrapper.instance().state.isDropDownOpen).toBeTruthy();
    });
  });
});
