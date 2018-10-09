/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount, shallow} from 'enzyme';
import {
  Select,
  StyledSelectComponentIcon,
  StyledInput,
  StyledOption,
} from '../index';
import {StyledListItem} from '../../menu';
import {STATE_CHANGE_TYPE, TYPE, ICON} from '../constants';
import {StyledAction} from '../../tag';
import {KEY_STRINGS} from '../../menu/constants';

function sleep(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

describe('Stateless select', function() {
  let wrapper,
    events = {};
  let allProps: any = {},
    mockFn;

  beforeEach(function() {
    mockFn = jest.fn();
    events = {
      onChange: jest.fn(),
      onTextInputChange: jest.fn(),
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

    test('should call onTextInputChange when input value changes', function() {
      let textValue = 'test';
      allProps.type = TYPE.search;
      allProps.onTextInputChange = jest.fn();
      wrapper = mount(<Select {...allProps} />);
      const e = {
        target: {
          value: textValue,
        },
      };
      wrapper.instance().onTextInputChange(e);
      expect(allProps.onTextInputChange).toHaveBeenCalledWith(e);
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
      clearIcon = wrapper.find(StyledAction);
      clearIcon.first().simulate('click');
      expect(allProps.onChange.mock.calls[0][1]).toEqual({
        type: STATE_CHANGE_TYPE.unselect,
        option: allProps.selectedOptions[0],
        selectedOptions: [],
      });
    });

    test('should should clear all selected tags when Clear All clicked', function() {
      wrapper.unmount();
      allProps.selectedOptions = options;
      wrapper = mount(<Select {...allProps} />);
      clearIcon = wrapper.find(StyledSelectComponentIcon);
      clearIcon = clearIcon.filterWhere(
        comp => comp.props().$type === ICON.clearAll,
      );
      clearIcon.first().simulate('click');

      expect(allProps.onChange.mock.calls[0][1]).toEqual({
        type: STATE_CHANGE_TYPE.unselect,
        selectedOptions: [],
      });
    });
  });

  describe('Search mode', function() {
    test('should call text input change method when change of input happened', function() {
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
      input.props().onChange(event);
      expect(wrapper.instance().props.onTextInputChange).toHaveBeenCalledWith(
        event,
      );
    });

    test('should support simple filtering', async function() {
      allProps = Object.assign({}, allProps, {
        type: TYPE.search,
        filterable: true,
        options: jest.fn(),
      });
      let onTextInputChangePromise = Promise.resolve([
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
      ]);
      allProps.options.mockReturnValue(onTextInputChangePromise);
      wrapper = mount(<Select {...allProps} />);

      let input = wrapper
        .find(StyledInput)
        .first()
        .find('input');

      input.simulate('change', {target: {value: 'a'}});
      await sleep(1);
      wrapper.update();
      expect(wrapper.find(StyledOption)).toHaveLength(3);

      input.simulate('change', {target: {value: 'aa'}});
      await sleep(1);
      wrapper.update();
      expect(wrapper.find(StyledOption)).toHaveLength(2);

      input.simulate('change', {target: {value: 'aaa'}});
      await sleep(1);
      wrapper.update();
      expect(wrapper.find(StyledOption)).toHaveLength(1);

      input.simulate('change', {target: {value: 'aaaa'}});
      await sleep(1);
      wrapper.update();
      expect(wrapper.find(StyledOption)).toHaveLength(0);
    });

    test('should support select and deselect', async () => {
      allProps = Object.assign({}, allProps, {
        type: TYPE.search,
        multiple: true,
        options: [
          {id: 'red', label: 'Red'},
          {id: 'green', label: 'Green'},
          {id: 'blue', label: 'Blue'},
        ],
      });
      wrapper = mount(<Select {...allProps} />);
      let input = wrapper
        .find(StyledInput)
        .first()
        .find('input');

      // Type some characters to get items to show
      input.props().onChange({target: {value: 'e'}});
      await sleep(1);
      wrapper.update();

      let renderOptions = wrapper.find(StyledListItem);
      let selected = [];

      // Test a sequence of select/deselects
      [
        {index: 0, type: STATE_CHANGE_TYPE.select},
        {index: 2, type: STATE_CHANGE_TYPE.select},
        {index: 0, type: STATE_CHANGE_TYPE.unselect},
      ].forEach(event => {
        // Click the specific option
        renderOptions.at(event.index).simulate('click');

        const toggledOption = allProps.options[event.index];
        if (event.type === STATE_CHANGE_TYPE.select) {
          selected.push(toggledOption);
        } else {
          selected = selected.filter(o => o.id !== toggledOption.id);
        }

        expect(allProps.onChange).toHaveBeenLastCalledWith(expect.anything(), {
          type: event.type,
          option: toggledOption,
          selectedOptions: selected,
        });

        wrapper.setProps({selectedOptions: selected});
      });
    });

    test('should support custom filter option', async function() {
      allProps = Object.assign({}, allProps, {
        type: TYPE.search,
        filterable: true,
        getOptionLabel: option => option.label.title,
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
      let onTextInputChangePromise = Promise.resolve();
      allProps.onTextInputChange.mockReturnValue(onTextInputChangePromise);
      wrapper = mount(<Select {...allProps} />);

      let input = wrapper
        .find(StyledInput)
        .first()
        .find('input');

      input.simulate('change', {target: {value: 'xyz'}});
      await sleep(1);
      wrapper.update();
      expect(wrapper.find(StyledOption).length).toBe(0);

      input.simulate('change', {target: {value: 'ar'}});
      await sleep(1);
      wrapper.update();
      expect(wrapper.find(StyledOption).length).toBe(2);
    });

    test('backspace should delete last selected option in multiple mode', () => {
      const options = [
        {id: 'red', label: 'Red'},
        {id: 'green', label: 'Green'},
        {id: 'blue', label: 'Blue'},
      ];
      allProps = {
        ...allProps,
        onChange: jest.fn(),
        type: TYPE.search,
        multiple: true,
        options,
        selectedOptions: options.slice(0, 2),
      };
      wrapper = mount(<Select {...allProps} />);

      expect(wrapper.find(StyledAction).length).toBe(2);

      wrapper.find('input').simulate('keydown', {key: KEY_STRINGS.Backspace});

      expect(allProps.onChange).toHaveBeenCalledTimes(1);
      expect(allProps.onChange.mock.calls[0][1]).toEqual({
        type: STATE_CHANGE_TYPE.unselect,
        option: options[1],
        selectedOptions: [options[0]],
      });
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

    test('should support single select', () => {
      allProps.options = [{id: 'red', label: 'Red'}];
      wrapper = mount(<Select {...allProps} />);
      wrapper
        .find(StyledInput)
        .first()
        .simulate('click');

      wrapper
        .find(StyledListItem)
        .at(0)
        .simulate('click');

      expect(allProps.onChange).toHaveBeenLastCalledWith(expect.anything(), {
        type: STATE_CHANGE_TYPE.select,
        option: allProps.options[0],
        selectedOptions: [allProps.options[0]],
      });
    });
  });

  //$FlowFixMe
  describe.each([[TYPE.search], [TYPE.select]])(
    'hot keys in %s mode of component',
    mode => {
      test.each([
        [KEY_STRINGS.ArrowDown, 'open dropdown', {isDropDownOpen: true}],
        [
          KEY_STRINGS.Space,
          'open dropdown',
          {isDropDownOpen: mode === TYPE.select},
        ],
        [KEY_STRINGS.Escape, 'close dropdown', {isDropDownOpen: false}],
      ])('when pressed key "%s" should %s', (hotKey, result, newState) => {
        allProps.selectedOptions = [
          {
            id: '123',
            label: 'label for 123',
          },
        ];
        allProps = Object.assign({}, allProps, {
          type: mode,
          multiple: true,
          options: [
            {
              id: '1',
              label: 'foo1',
            },
          ],
        });
        wrapper = mount(<Select {...allProps} />);
        const input = wrapper
          .find(StyledInput)
          .first()
          .find('input');
        input.simulate('keydown', {key: hotKey});
        expect(wrapper.instance().state).toMatchObject(newState);
      });
    },
  );
});
