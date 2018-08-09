/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {StyledDropDown} from '../index';

describe('Stateless Select Dropdown', function() {
  let wrapper,
    events = {};
  let allProps: any = {},
    mockFn;
  let options = [
      {
        id: '1',
        label: 'label for 1',
      },
      {
        id: '2',
        label: 'label for 2',
      },
      {
        id: '3',
        label: 'label for 3',
      },
      {
        id: '4',
        label: 'label for 4',
      },
    ],
    getOptionLabel = jest.fn(() => <div>test label</div>),
    isDropDownOpen = true,
    selectedOptions,
    onChange,
    type,
    rows;

  beforeEach(function() {
    mockFn = jest.fn();
    events = {
      onChange: mockFn,
    };
    allProps = {
      ...events,
      options,
      getOptionLabel,
      isDropDownOpen,
      selectedOptions,
      onChange,
      type,
      rows,
    };
  });

  afterEach(function() {
    jest.restoreAllMocks();
    wrapper && wrapper.unmount();
  });

  test.each([[options, true], [[], true], [options, false]])(
    'should render component with options %s and drondown open is %s',
    (options, isDropDownOpen) => {
      allProps = Object.assign({}, allProps, {options, isDropDownOpen});
      wrapper = shallow(<StyledDropDown {...allProps} />);
      expect(wrapper).toMatchSnapshot(
        'Component has correct render with options length ' +
          options.length +
          ' and dropdown open is %s ' +
          isDropDownOpen,
      );
    },
  );
});
