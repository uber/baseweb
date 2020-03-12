/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {shallow} from 'enzyme';
import {EmoticonRating} from '../index.js';

describe('EmoticonRating', () => {
  let example, onChangeSpy;

  beforeEach(() => {
    onChangeSpy = jest.fn();
    example = shallow(<EmoticonRating value={2} onChange={onChangeSpy} />);
  });

  describe('Root', () => {
    it('applies correct accessibility attributes to the Root element', () => {
      expect(example).toHaveProp('role', 'radiogroup');
    });

    it('removes previewIndex if mouse leaves', () => {
      example.simulate('mouseLeave');
      expect(example).toHaveState('previewIndex', undefined);
    });
  });

  describe('RatingItem', () => {
    it('applies correct props if item is active', () => {
      expect(example.childAt(0)).toMatchSnapshot();
    });

    it('calls onChange if item is clicked', () => {
      example.childAt(1).simulate('click');

      expect(onChangeSpy).toHaveBeenCalledWith({value: 2});
    });

    it('calls onChange if item is keyed with arrow right', () => {
      example.childAt(1).simulate('keyDown', {keyCode: 39});
      expect(onChangeSpy).toHaveBeenCalledWith({value: 3});
    });

    it('calls onChange if item is keyed with arrow left', () => {
      example.childAt(1).simulate('keyDown', {keyCode: 37});
      expect(onChangeSpy).toHaveBeenCalledWith({value: 1});
    });

    it('updates previewIndex if item is moused over', () => {
      example.childAt(3).simulate('mouseOver');
      expect(example).toHaveState('previewIndex', 4);
    });

    it('removes previewIndex if item is blurred', () => {
      example.childAt(3).simulate('blur');
      expect(example).toHaveState('previewIndex', undefined);
    });
  });
});
